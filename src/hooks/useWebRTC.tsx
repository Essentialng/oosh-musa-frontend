// import { useState, useEffect, useRef, useCallback } from 'react';
// import { useSocket } from '../context/socket.context';
// import { Socket } from 'socket.io-client';

// interface WebRTCProps {
//   socket: typeof Socket | null;
//   conversationId: string;
//   userId: string;
//   otherUserId: string;
// }

// export const useWebRTC = ({ socket, conversationId, userId, otherUserId }: WebRTCProps) => {
//   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
//   const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
//   const peerConnection = useRef<RTCPeerConnection | null>(null);

//   const createPeerConnection = useCallback(() => {
//     const configuration = {
//       iceServers: [
//         { urls: 'stun:stun.l.google.com:19302' },
//         { urls: 'stun:stun1.l.google.com:19302' },
//       ],
//     };

//     const peer = new RTCPeerConnection(configuration);

//     // Add local tracks to the peer connection
//     if (localStream) {
//       localStream.getTracks().forEach((track) => {
//         peer.addTrack(track, localStream);
//       });
//     }

//     // Handle incoming tracks
//     peer.ontrack = (event) => {
//       setRemoteStream(event.streams[0]);
//     };

//     // Handle ICE candidates
//     peer.onicecandidate = (event) => {
//       if (event.candidate && socket) {
//         socket.emit('webrtc:ice-candidate', {
//           conversationId,
//           callerId: userId,
//           receiverId: otherUserId,
//           signal: event.candidate,
//         });
//       }
//     };

//     peerConnection.current = peer;
//     return peer;
//   }, [conversationId, localStream, otherUserId, socket, userId]);

//   const startCall = async (type: 'audio' | 'video') => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: type === 'video',
//         audio: true,
//       });
//       setLocalStream(stream);

//       const peer = createPeerConnection();
//       const offer = await peer.createOffer();
//       await peer.setLocalDescription(offer);

//       if (socket) {
//         socket.emit('webrtc:offer', {
//           conversationId,
//           callerId: userId,
//           receiverId: otherUserId,
//           signal: offer,
//         });
//       }
//     } catch (error) {
//       console.error('Error starting call:', error);
//     }
//   };

//   // In useWebRTC hook, add:
// const initiateCall = (type: 'audio' | 'video') => {
//     console.log({
//         conversationId,
//         callerId: userId,
//         recieverId: otherUserId
//     })
//     if (socket) {
//         console.log('emitted ---->')
//       socket.emit('call:initialize', {
//         conversationId,
//         callerId: userId,
//         receiverId: otherUserId,
//         type
//       });
//     }
//     startCall(type); // Your existing WebRTC setup
//   };

//   const handleIncomingCall = async (type: 'audio' | 'video') => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: type === 'video',
//         audio: true,
//       });
//       setLocalStream(stream);
//       createPeerConnection();
//     } catch (error) {
//       console.error('Error handling incoming call:', error);
//     }
//   };

//   const acceptCall = async () => {
//     const peer = peerConnection.current;
//     if (!peer) return;

//     try {
//       const answer = await peer.createAnswer();
//       await peer.setLocalDescription(answer);

//       if (socket) {
//         socket.emit('webrtc:answer', {
//           conversationId,
//           callerId: otherUserId,
//           receiverId: userId,
//           signal: answer,
//         });
//       }
//     } catch (error) {
//       console.error('Error accepting call:', error);
//     }
//   };

//   const endCall = () => {
//     if (peerConnection.current) {
//       peerConnection.current.close();
//       peerConnection.current = null;
//     }

//     if (localStream) {
//       localStream.getTracks().forEach((track) => track.stop());
//       setLocalStream(null);
//     }

//     setRemoteStream(null);
//   };

//   useEffect(() => {
//     if (!socket) return;

//     socket.on('webrtc:offer', async ({ signal } : { signal: any}) => {
//       const peer = peerConnection.current;
//       if (peer) {
//         await peer.setRemoteDescription(new RTCSessionDescription(signal));
//       }
//     });

//     socket.on('webrtc:answer', async ({ signal }: {signal: any}) => {
//       const peer = peerConnection.current;
//       if (peer) {
//         await peer.setRemoteDescription(new RTCSessionDescription(signal));
//       }
//     });

//     socket.on('webrtc:ice-candidate', async ({ signal } : {signal : any}) => {
//       const peer = peerConnection.current;
//       if (peer) {
//         await peer.addIceCandidate(new RTCIceCandidate(signal));
//       }
//     });

//     return () => {
//       socket.off('webrtc:offer');
//       socket.off('webrtc:answer');
//       socket.off('webrtc:ice-candidate');
//     };
//   }, [socket]);

//   return {
//     localStream,
//     remoteStream,
//     startCall,
//     initiateCall,
//     handleIncomingCall,
//     acceptCall,
//     endCall,
//   };
// };

// ------- version 2 ------------
import { useCallback, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';

interface UseWebRTCProps {
  socket: typeof Socket | null;
  conversationId: string;
  userId: string;
  otherUserId: string;
}

export const useWebRTC = ({ socket, conversationId, userId, otherUserId }: UseWebRTCProps) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  
  const createPeerConnection = useCallback(() => {
    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
      ],
    };

    const peer = new RTCPeerConnection(configuration);

    // Add local tracks to peer connection
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        peer.addTrack(track, localStream);
      });
    }

    // Handle incoming tracks
    peer.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };

    // Handle ICE candidates
    peer.onicecandidate = (event) => {
      if (event.candidate && socket) {
        socket.emit('webrtc:ice-candidate', {
          conversationId,
          callerId: userId,
          receiverId: otherUserId,
          signal: event.candidate,
        });
      }
    };

    peerConnection.current = peer;
    return peer;
  }, [localStream, socket, conversationId, userId, otherUserId]);

  const handleIncomingCall = async (type: 'audio' | 'video') => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: type === 'video',
        audio: true,
      });
      setLocalStream(stream);
      createPeerConnection();
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const initiateCall = async (type: 'audio' | 'video') => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: type === 'video',
        audio: true,
      });
      setLocalStream(stream);

      const peer = createPeerConnection();
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);

      if (socket) {
        socket.emit('webrtc:offer', {
          conversationId,
          callerId: userId,
          receiverId: otherUserId,
          signal: offer,
        });
      }
    } catch (error) {
      console.error('Error initiating call:', error);
    }
  };

  const acceptCall = async () => {
    if (!peerConnection.current || !socket) return;

    try {
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);

      socket.emit('webrtc:answer', {
        conversationId,
        callerId: otherUserId,
        receiverId: userId,
        signal: answer,
      });
    } catch (error) {
      console.error('Error accepting call:', error);
    }
  };

  const endCall = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
      setRemoteStream(null);
    }
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.on('webrtc:offer', async ({ signal }: {signal: any}) => {
      if (!peerConnection.current) return;
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal));
    });

    socket.on('webrtc:answer', async ({ signal } : {signal: any}) => {
      if (!peerConnection.current) return;
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal));
    });

    socket.on('webrtc:ice-candidate', async ({ signal } : {signal: any}) => {
      if (!peerConnection.current) return;
      await peerConnection.current.addIceCandidate(new RTCIceCandidate(signal));
    });

    return () => {
      socket.off('webrtc:offer');
      socket.off('webrtc:answer');
      socket.off('webrtc:ice-candidate');
    };
  }, [socket]);

  return {
    localStream,
    remoteStream,
    initiateCall,
    handleIncomingCall,
    acceptCall,
    endCall,
  };
};