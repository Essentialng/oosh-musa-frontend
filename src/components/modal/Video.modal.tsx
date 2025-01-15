import React, { useEffect, useRef, useState } from 'react';
import { FaVideo, FaVideoSlash, FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import { useSocket, useSocketEvent } from '../../context/socket.context'; 
import { IoCallOutline } from 'react-icons/io5';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  callType: 'audio' | 'video';
  remoteUser: any;
  isIncoming?: boolean;
}

const CallModal: React.FC<CallModalProps> = ({
  isOpen,
  onClose,
  callType,
  remoteUser,
  isIncoming = false,
}) => {
  const { socket } = useSocket();
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(callType === 'audio');
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  // Initialize WebRTC
  useEffect(() => {
    if (!isOpen) return;

    const initializeCall = async () => {
      try {
        // Get user media based on call type
        const stream = await navigator.mediaDevices.getUserMedia({
          video: callType === 'video',
          audio: true,
        });
        
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Initialize RTCPeerConnection
        const configuration = {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            // Add your TURN servers here if needed
          ],
        };
        
        const peerConnection = new RTCPeerConnection(configuration);
        peerConnectionRef.current = peerConnection;

        // Add local stream tracks to peer connection
        stream.getTracks().forEach(track => {
          peerConnection.addTrack(track, stream);
        });

        // Handle incoming tracks
        peerConnection.ontrack = (event) => {
          setRemoteStream(event.streams[0]);
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };

        // Handle ICE candidates
        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            socket?.emit('call:ice-candidate', {
              candidate: event.candidate,
              receiverId: remoteUser._id,
            });
          }
        };

        // Create and send offer if not incoming call
        if (!isIncoming) {
          const offer = await peerConnection.createOffer();
          await peerConnection.setLocalDescription(offer);
          socket?.emit('call:offer', {
            offer,
            receiverId: remoteUser._id,
          });
        }
      } catch (error) {
        console.error('Error initializing call:', error);
        onClose();
      }
    };

    initializeCall();

    return () => {
      // Cleanup
      localStream?.getTracks().forEach(track => track.stop());
      peerConnectionRef.current?.close();
    };
  }, [isOpen]);

  // Handle incoming WebRTC signaling
  useSocketEvent('call:offer', async (data:any) => {
    if (!peerConnectionRef.current) return;
    
    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.offer));
    const answer = await peerConnectionRef.current.createAnswer();
    await peerConnectionRef.current.setLocalDescription(answer);
    
    socket?.emit('call:answer', {
      answer,
      receiverId: remoteUser._id,
    });
  }, []);

  useSocketEvent('call:answer', async (data:any) => {
    if (!peerConnectionRef.current) return;
    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.answer));
  }, []);

  useSocketEvent('call:ice-candidate', async (data:any) => {
    if (!peerConnectionRef.current) return;
    await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
  }, []);

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream && callType === 'video') {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const handleEndCall = () => {
    socket?.emit('call:end', {
      receiverId: remoteUser._id,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 w-full max-w-4xl">
        <div className="relative">
          {/* Remote Video (Full size) */}
          {callType === 'video' && (
            <div className="w-full aspect-video bg-gray-800 rounded-lg overflow-hidden">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Local Video (Picture-in-Picture) */}
          {callType === 'video' && !isVideoOff && (
            <div className="absolute top-4 right-4 w-1/4 aspect-video bg-gray-800 rounded-lg overflow-hidden">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Audio-only UI */}
          {(callType === 'audio' || isVideoOff) && (
            <div className="w-full aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-24 h-24 rounded-full bg-gray-600 mx-auto mb-4 flex items-center justify-center">
                  <img
                    src={remoteUser.avatar}
                    alt={remoteUser.fullname}
                    className="w-20 h-20 rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold">{remoteUser.fullname}</h3>
                <p className="text-gray-300">{isIncoming ? 'Incoming call...' : 'Calling...'}</p>
              </div>
            </div>
          )}
          
          {/* Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
            <button
              onClick={toggleMute}
              className={`p-3 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gray-600'}`}
            >
              {isMuted ? <FaMicrophoneSlash className="text-white" /> : <FaMicrophone className="text-white" />}
            </button>
            
            {callType === 'video' && (
              <button
                onClick={toggleVideo}
                className={`p-3 rounded-full ${isVideoOff ? 'bg-red-500' : 'bg-gray-600'}`}
              >
                {isVideoOff ? <FaVideoSlash className="text-white" /> : <FaVideo className="text-white" />}
              </button>
            )}
            
            <button
              onClick={handleEndCall}
              className="p-3 rounded-full bg-red-500"
            >
              <IoCallOutline className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallModal;