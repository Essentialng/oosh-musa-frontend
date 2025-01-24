// hooks/usePeerConnection.ts
import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { Socket } from 'socket.io-client';

interface UsePeerConnectionProps {
  socket: typeof Socket;
  userId: string;
  callType: 'video' | 'audio' | null;
  isCaller: boolean;
  recipientId: string;
}

const PEER_CONFIG = {
    host: process.env.REACT_APP_PEER_HOST || 'localhost',
    port: Number(process.env.REACT_APP_PEER_PORT) || 9000,
    path: '/peerjs',
    secure: process.env.NODE_ENV === 'production'
  };

export const usePeerConnection = ({
  socket,
  userId,
  callType,
  isCaller,
  recipientId
}: UsePeerConnectionProps) => {
  const [peer, setPeer] = useState<Peer | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const currentCall = useRef<any>(null);

  // Initialize peer connection
  useEffect(() => {
    if (!userId) return;

    const newPeer = new Peer(userId, {
      host: '/', // Configure your PeerJS server
      port: 9000,
      path: '/peerjs'
    });

    newPeer.on('open', (id) => {
      console.log('My peer ID is: ' + id);
      setPeer(newPeer);
    });

    return () => {
      newPeer.destroy();
    };
  }, [userId]);

  // Handle media stream
  useEffect(() => {
    if (!callType) return;

    const initStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: callType === 'video',
          audio: true
        });
        setLocalStream(stream);

        if (isCaller && peer && recipientId) {
          // Emit call initiation via socket
          socket.emit('call:initiate', {
            from: userId,
            to: recipientId,
            callType
          });

          // Make the call using PeerJS
          const call = peer.call(recipientId, stream);
          currentCall.current = call;

          call.on('stream', (remoteStream) => {
            setRemoteStream(remoteStream);
            setIsConnected(true);
          });
        }
      } catch (err) {
        console.error('Error accessing media devices:', err);
      }
    };

    initStream();

    return () => {
      localStream?.getTracks().forEach(track => track.stop());
      currentCall.current?.close();
    };
  }, [callType, peer, isCaller, recipientId]);

  // Handle incoming calls
  useEffect(() => {
    if (!peer || !socket) return;

    peer.on('call', async (call) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: callType === 'video',
          audio: true
        });
        setLocalStream(stream);
        
        call.answer(stream);
        currentCall.current = call;

        call.on('stream', (remoteStream) => {
          setRemoteStream(remoteStream);
          setIsConnected(true);
        });
      } catch (err) {
        console.error('Error answering call:', err);
      }
    });

    return () => {
      peer.removeAllListeners('call');
    };
  }, [peer, socket, callType]);

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        return videoTrack.enabled;
      }
    }
    return false;
  };

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        return audioTrack.enabled;
      }
    }
    return false;
  };

  const endCall = () => {
    currentCall.current?.close();
    localStream?.getTracks().forEach(track => track.stop());
    setLocalStream(null);
    setRemoteStream(null);
    setIsConnected(false);
  };

  return {
    localStream,
    remoteStream,
    isConnected,
    toggleVideo,
    toggleAudio,
    endCall
  };
};