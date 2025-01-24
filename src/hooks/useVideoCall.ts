// First, install peerjs: npm install peerjs

import Peer, { MediaConnection } from 'peerjs';
import { useState } from 'react';

interface CallState {
  peer: Peer | null;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  currentCall: MediaConnection | null;
}

const useVideoCall = () => {
  const [callState, setCallState] = useState<CallState>({
    peer: null,
    localStream: null,
    remoteStream: null,
    currentCall: null,
  });

  const initializePeer = (userId: string) => {
    const peer = new Peer(userId);
    
    peer.on('open', (id) => {
      console.log('My peer ID is: ' + id);
      setCallState(prev => ({ ...prev, peer }));
    });

    peer.on('call', async (call) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        
        setCallState(prev => ({ ...prev, localStream: stream }));
        call.answer(stream);
        
        call.on('stream', (remoteStream) => {
          setCallState(prev => ({ 
            ...prev, 
            remoteStream,
            currentCall: call 
          }));
        });
      } catch (err) {
        console.error('Failed to get local stream', err);
      }
    });
  };

  const makeCall = async (recipientId: string, isVideo: boolean = true) => {
    try {
      if (!callState.peer) throw new Error('Peer not initialized');
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: isVideo, 
        audio: true 
      });
      
      const call = callState.peer.call(recipientId, stream);
      
      call.on('stream', (remoteStream) => {
        setCallState(prev => ({ 
          ...prev, 
          localStream: stream,
          remoteStream,
          currentCall: call 
        }));
      });
    } catch (err) {
      console.error('Failed to make call', err);
    }
  };

  const endCall = () => {
    callState.localStream?.getTracks().forEach(track => track.stop());
    callState.currentCall?.close();
    setCallState(prev => ({
      ...prev,
      localStream: null,
      remoteStream: null,
      currentCall: null
    }));
  };

  const toggleAudio = () => {
    if (callState.localStream) {
      const audioTrack = callState.localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        return audioTrack.enabled;
      }
    }
    return false;
  };

  const toggleVideo = () => {
    if (callState.localStream) {
      const videoTrack = callState.localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        return videoTrack.enabled;
      }
    }
    return false;
  };

  return {
    initializePeer,
    makeCall,
    endCall,
    toggleAudio,
    toggleVideo,
    localStream: callState.localStream,
    remoteStream: callState.remoteStream,
    isInCall: !!callState.currentCall
  };
};

export default useVideoCall;