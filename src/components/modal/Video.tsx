import React, { useEffect, useRef, useState } from 'react';
import SimplePeer, { SignalData } from 'simple-peer';
import { useSocket } from '../../context/socket.context'; 


interface ICallData {
  conversationId: string;
  callerId: string;
  receiverId: string;
  type: 'audio' | 'video';
  signal?: SignalData;
}

const VideoCall: React.FC = () => {
    const {socket} = useSocket()
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [peer, setPeer] = useState<SimplePeer.Instance | null>(null);

  const userVideo = useRef<HTMLVideoElement>(null);
  const peerVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Get user's media stream
    if(!socket || !stream) {
        alert('errors triggered')
        return
    }
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        if (userVideo.current) userVideo.current.srcObject = mediaStream;
      })
      .catch((error) => console.error('Error accessing media devices:', error));

    // Listen for incoming call signals
    socket.on('call:incoming', (data: ICallData) => {
      const newPeer = new SimplePeer({
        initiator: false,
        trickle: false,
        stream,
      });

      newPeer.signal(data.signal!);

      newPeer.on('signal', (signal) => {
        socket.emit('call:signal', { signal, ...data });
      });

      newPeer.on('stream', (remoteStream) => {
        if (peerVideo.current) peerVideo.current.srcObject = remoteStream;
      });

      setCallAccepted(true);
      setPeer(newPeer);
    });

    return () => {
      socket.off('call:incoming');
    };
  }, [stream]);

  const initiateCall = (receiverId: string) => {
    if(!stream || !socket) return
    const newPeer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream,
    });

    newPeer.on('signal', (signal) => {
      socket.emit('call:initiate', {
        receiverId,
        type: 'video',
        signal,
      });
    });

    newPeer.on('stream', (remoteStream) => {
      if (peerVideo.current) peerVideo.current.srcObject = remoteStream;
    });

    setPeer(newPeer);
  };

  const endCall = () => {
    if(!socket) return
    if (peer) {
      peer.destroy();
      setPeer(null);
    }
    setCallEnded(true);
    socket.emit('call:end');
  };

  return (
    <div>
      <h1>Video Call</h1>
      <div>
        <video ref={userVideo} autoPlay playsInline muted />
        {callAccepted && <video ref={peerVideo} autoPlay playsInline />}
      </div>
      <button onClick={() => initiateCall('receiver-id')}>Call</button>
      {callAccepted && <button onClick={endCall}>End Call</button>}
    </div>
  );
};

export default VideoCall;
