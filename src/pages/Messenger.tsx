import { useCallback, useEffect, useRef, useState } from 'react';
import Profile from '../assets/profile/back6.jpeg';
import { MdAttachFile, MdSettingsVoice, MdWifiCalling3 } from 'react-icons/md';
import { FaVideo } from 'react-icons/fa';
import { useAppSelector } from '../redux/ReduxType';
import { BsSend } from 'react-icons/bs';
import MainMessageText from '../components/molecules/MainMessageText';
import OtherMessageText from '../components/molecules/OtherMessageText';
import { useMakeRequest } from '../hooks/useMakeRequest';
import { CONVERSATION_URL } from '../constant/resource';
import toast from 'react-hot-toast';
import { useSocket, useSocketEvent } from '../context/socket.context';
import { CallModal } from '../components/modal/CallTest';

interface Message {
  _id: string;
  sender: string;
  content: string;
  messageType: string;
  conversationId: string;
  createdAt: string;
  updatedAt: string;
}

type CallType = 'audio' | 'video';

interface CallState {
  type: CallType | null;  // Using null instead of empty string
  isIncoming: boolean;
  isOpen: boolean;
  isCaller: boolean;
}

const Messenger = () => {
  const isDark = useAppSelector(state => state.theme.isDark);
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessage] = useState<Message[]>([])
  const makeRequest = useMakeRequest()
  const currentConversation = useAppSelector(state=>state.currentConversation)
  const user = useAppSelector(state=>state.user)
  const { socket } = useSocket()
  const otherUser:any = currentConversation?.participants?.filter((eachParticipant)=>eachParticipant._id !== user._id)
  // --- webRTC states ---
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const [callState, setCallState] = useState<CallState>({
    type: null,
    isIncoming: false,
    isOpen: false,
    isCaller: false
  });


  useEffect(() => {
    if (socket && currentConversation._id) {
      socket.emit('conversation:join', [currentConversation._id]);
    }
  }, [currentConversation._id, socket]);

  // fetch conversation messages
  useEffect(()=>{
    const fetchCoversationMessages = ()=>{
      makeRequest(
        CONVERSATION_URL+`/allMessages`,
        'POST',
        {conversationId: currentConversation._id},
        (data)=>{
          console.log(data.data)
          setMessage(data.data)
        },
        (error)=>{toast.error('Error')},
        console.log
      )
    }
    fetchCoversationMessages()
  }, [])


  // ----- helper functions ------------
  const handleIncoming = async (data: any) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: data?.type === 'video',
        audio: true,
      });
      setLocalStream(stream);
      
      setCallState({
        type: data.type,
        isIncoming: true,
        isOpen: true,
        isCaller: false
      });
    } catch (error) {
      console.error('Error handling incoming call:', error);
      toast.error('Failed to access media devices');
    }
  };

  const endCall = () => {
    try {
      // Stop all tracks in the local stream
      if (localStream) {
        localStream.getTracks().forEach(track => {
          track.stop();
        });
        setLocalStream(null);
      }
  
      // Stop all tracks in the remote stream
      if (remoteStream) {
        remoteStream.getTracks().forEach(track => {
          track.stop();
        });
        setRemoteStream(null);
      }
  
      // Close and cleanup the peer connection
      if (peerConnection.current) {
        peerConnection.current.close();
        peerConnection.current = null;
      }

      // Reset call state
      setCallState({
        type: null,
        isIncoming: false,
        isOpen: false,
        isCaller: false
      });
  
      socket?.emit('webrtc:end', {
        conversationId: currentConversation._id,
        callerId: user._id,
        receiverId: otherUser._id,
      });
    } catch (error) {
      console.error('Error ending call:', error);
    }
  };
  // ---- call handler effect ----------

  useSocketEvent('call:incoming', async (data:any)=>{
    await handleIncoming(data)
    setCallState({
      type: data.type,
      isIncoming: true,
      isOpen: true,
      isCaller: user._id === data.callerId
    })
  })

  useSocketEvent('call:ended', async (data:any)=>{
    endCall()
    setCallState({
      type: data.type,
      isIncoming: true,
      isOpen: true,
      isCaller: user._id === data.callerId
    })
  })


  useSocketEvent('call:rejected', async (data:any)=>{
    endCall();
    if (socket) {
      socket.emit('call:end', {
        conversationId: currentConversation._id,
        callerId: user._id,
        receiverId: otherUser[0]._id,
      });
    }

    setCallState(prev => ({
        ...prev,
        isOpen: false,
    }));
  })

  // --------- message section ---------

  const handleChange = (event:any)=>{
    setNewMessage(event.target.value)
  }


  useSocketEvent('message:new', (data:any)=>{
    setMessage(prev => [...prev, data.message]) // Add the new message to state
  })

  const handleSend = (event:any)=>{
    event.preventDefault()
    if(newMessage === '') return toast.error('type something')
    // send message to the backend
    const payload = {
      sender: user._id,
      conversationId: currentConversation._id,
      content: newMessage,
      messageType: 'text',
    }
    if(socket){
      try {
        socket.emit('message:send', payload)
      } catch (error) {
        toast.error('error sending message')
        console.log(error)
      }finally{
        setNewMessage('')
      }
    }
  }

  // ---------- call section ------------

    const createPeerConnection = useCallback(() => {
      const configuration = {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
        ],
      };
  
      const peer = new RTCPeerConnection(configuration);

      peer.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
      };

      peer.onicecandidate = (event)=>{
        if(event.candidate && socket) {
          socket.emit('webrtc:ice-candidate', {
            conversationId: currentConversation._id,
            callerId: user._id,
            recieverId: otherUser[0]._id,
            signal: event.candidate
          });
        }
      };
  
      // Add local tracks to the peer connection
      if (localStream) {
        localStream.getTracks().forEach((track) => {
          peer.addTrack(track, localStream);
        });
      }
  
      peerConnection.current = peer;
      return peer;
    }, [localStream, socket, currentConversation._id, user._id, otherUser]);
  

    const startCall = async (type: CallType) => {
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
            conversationId: currentConversation._id,
            callerId: user._id,
            receiverId: otherUser[0]._id,
            signal: offer,
          });
        }
      } catch (error) {
        console.error('Error starting call:', error);
        toast.error('Failed to start call');
      }
    };

    const handleCall = async (type: CallType) => {
      if (socket) {
        try {
          socket.emit('call:initialize', {
            conversationId: currentConversation._id,
            callerId: user._id,
            receiverId: otherUser[0]._id,
            type,
          });
          
          await startCall(type);
          setCallState({
            type,
            isIncoming: false,
            isOpen: true,
            isCaller: true
          });
        } catch (error) {
          console.error('Error initiating call:', error);
          toast.error('Failed to initiate call');
        }
      }
    };


  const handleAcceptCall = async () => {
    try {
      const peer = createPeerConnection();
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);

      if (socket) {
        socket.emit('webrtc:answer', {
          conversationId: currentConversation._id,
          callerId: otherUser[0]._id,
          receiverId: user._id,
          signal: answer,
        });
        
        socket.emit('call:accept', {
          conversationId: currentConversation._id,
          callerId: otherUser[0]._id,
          receiverId: user._id,
        });
      }
    } catch (error) {
      console.error('Error accepting call:', error);
      toast.error('Failed to accept call');
    }
  };



  const handleEndCall = () => {
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

    if (socket) {
      socket.emit('call:end', {
        conversationId: currentConversation._id,
        callerId: user._id,
        receiverId: otherUser[0]._id,
      });
    }

    setCallState({
      type: null,
      isIncoming: false,
      isOpen: false,
      isCaller: false
    });
  };

  
  const handleRejectCall = () => {
    if (socket) {
      socket.emit('call:reject', {
        conversationId: currentConversation._id,
        callerId: otherUser[0]._id,
        receiverId: user._id,
      });
    }
    
    handleEndCall();
  };

  // WebRTC Socket Events
  useSocketEvent('webrtc:offer', async (data:any) => {
    if (peerConnection.current && data.signal) {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.signal));
    }
  });

  useSocketEvent('webrtc:answer', async (data:any) => {
    if (peerConnection.current && data.signal) {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.signal));
    }
  });

  useSocketEvent('webrtc:ice-candidate', async (data:any) => {
    if (peerConnection.current && data.signal) {
      await peerConnection.current.addIceCandidate(new RTCIceCandidate(data.signal));
    }
  });

   // Call Socket Events
   useSocketEvent('call:incoming', handleIncoming);
   useSocketEvent('call:ended', handleEndCall);
   useSocketEvent('call:rejected', handleEndCall);


  

  return (
    <div className="font-Mon text-sm flex flex-col h-full pb-8">
      {/* Top section */}
      <div className={`flex items-center justify-between mt-3 gap-10 p-2 rounded-sm ${
        isDark ? 'bg-darkBg' : 'bg-white'
      }`}>
        <div className="flex items-center justify-center gap-3">
          <img className="w-8 h-8 rounded-full object-cover" src={otherUser[0]?.avatar || Profile} alt="profile dp" />
          <div>
            <p>{otherUser[0]?.fullname}</p>
            <p className="text-xs">last seen 2hr ago</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3">
          <MdWifiCalling3 className="hover:text-blue-700 cursor-pointer" onClick={()=>{handleCall('audio')}}/>
          <FaVideo className="hover:text-blue-700 cursor-pointer" onClick={()=>{handleCall('video')}}/>
        </div>
      </div>

      {/* Message area - made scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {
          messages.map((eachMessage:any)=>{
            return(
              <div>
              {
                eachMessage?.sender === user?._id ?
                <MainMessageText Status={user?.avatar || Profile} content={eachMessage?.content} time="1:50pm" />
                :
                <OtherMessageText Status={otherUser[0].avatar} content={eachMessage?.content} time={eachMessage?.createdAt?.split('T')[1]} />
              }
            </div>
          )
          })
        }
      </div>

      {/* Input section - sticky at bottom */}
      <form onSubmit={handleSend} className="p-4 border-t">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <input
            className={`flex-1 outline-none p-2 rounded-full ${
              isDark ? 'bg-darkBg text-white' : 'bg-white'
            }`}
            type="text"
            value={newMessage}
            onChange={handleChange}
            placeholder="Type a message..."
          />
          <div className="flex items-center gap-3">
            <MdAttachFile className="cursor-pointer text-md" />
            <MdSettingsVoice className="cursor-pointer text-md" />
            <button type='submit'>
              <BsSend className="cursor-pointer text-md"/>
            </button>
          </div>
        </div>
      </form>
      {callState.isOpen && callState.type && (
        <CallModal 
          callStatus={{
            isOpen: callState.isOpen,
            type: callState.type,
            isIncoming: callState.isIncoming,
            isCaller: callState.isCaller
          }}
          localStream={localStream}
          remoteStream={remoteStream}
          onAccept={handleAcceptCall}
          onReject={handleRejectCall}
          onEnd={handleEndCall}
          otherUser={otherUser}
        />
      )}
    </div>
  );
};

export default Messenger;

// -------- version 2 -----------
// import { useCallback, useEffect, useRef, useState } from 'react';
// import Profile from '../assets/profile/back6.jpeg';
// import { MdAttachFile, MdSettingsVoice, MdWifiCalling3 } from 'react-icons/md';
// import { FaVideo } from 'react-icons/fa';
// import { useAppSelector } from '../redux/ReduxType';
// import { BsSend } from 'react-icons/bs';
// import MainMessageText from '../components/molecules/MainMessageText';
// import OtherMessageText from '../components/molecules/OtherMessageText';
// import { useMakeRequest } from '../hooks/useMakeRequest';
// import { CONVERSATION_URL } from '../constant/resource';
// import toast from 'react-hot-toast';
// import { useSocket, useSocketEvent } from '../context/socket.context';
// import { CallModal } from '../components/modal/CallTest';

// interface Message {
//   _id: string;
//   sender: string;
//   content: string;
//   messageType: string;
//   conversationId: string;
//   createdAt: string;
//   updatedAt: string;
// }

// type CallType = 'audio' | 'video';

// interface CallState {
//   type: CallType | null;
//   isIncoming: boolean;
//   isOpen: boolean;
// }

// const Messenger = () => {
//   const isDark = useAppSelector(state => state.theme.isDark);
//   const [newMessage, setNewMessage] = useState('');
//   const [messages, setMessage] = useState<Message[]>([]);
//   const makeRequest = useMakeRequest();
//   const currentConversation = useAppSelector(state => state.currentConversation);
//   const user = useAppSelector(state => state.user);
//   const { socket } = useSocket();
//   const otherUser = currentConversation?.participants?.filter((eachParticipant) => eachParticipant._id !== user._id);
  
//   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
//   const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
//   const peerConnection = useRef<RTCPeerConnection | null>(null);
  
//   const [callState, setCallState] = useState<CallState>({
//     type: null,
//     isIncoming: false,
//     isOpen: false
//   });

//   // Create WebRTC peer connection
//   const createPeerConnection = useCallback(() => {
//     const configuration = {
//       iceServers: [
//         { urls: 'stun:stun.l.google.com:19302' },
//         { urls: 'stun:stun1.l.google.com:19302' }
//       ]
//     };

//     const peer = new RTCPeerConnection(configuration);

//     // Add local tracks to peer connection
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
//           conversationId: currentConversation._id,
//           callerId: user._id,
//           receiverId: otherUser[0]._id,
//           signal: event.candidate
//         });
//       }
//     };

//     peerConnection.current = peer;
//     return peer;
//   }, [localStream, socket, currentConversation._id, user._id, otherUser]);

//   // WebRTC signaling handlers
//   useEffect(() => {
//     if (!socket) return;

//     socket.on('webrtc:offer', async ({ signal }:{signal:any}) => {
//       if (!peerConnection.current) return;
//       await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal));
//     });

//     socket.on('webrtc:answer', async ({ signal }:{signal:any}) => {
//       if (!peerConnection.current) return;
//       await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal));
//     });

//     socket.on('webrtc:ice-candidate', async ({ signal }:{signal:any}) => {
//       if (!peerConnection.current) return;
//       await peerConnection.current.addIceCandidate(new RTCIceCandidate(signal));
//     });

//     return () => {
//       socket.off('webrtc:offer');
//       socket.off('webrtc:answer');
//       socket.off('webrtc:ice-candidate');
//     };
//   }, [socket]);

//   // Join conversation room
//   useEffect(() => {
//     if (socket && currentConversation._id) {
//       socket.emit('conversation:join', [currentConversation._id]);
//     }
//   }, [currentConversation._id, socket]);

//   // Fetch messages
//   useEffect(() => {
//     const fetchConversationMessages = () => {
//       makeRequest(
//         CONVERSATION_URL + `/allMessages`,
//         'POST',
//         { conversationId: currentConversation._id },
//         (data) => {
//           setMessage(data.data);
//         },
//         (error) => { toast.error('Error fetching messages'); },
//         console.log
//       );
//     };
//     fetchConversationMessages();
//   }, [currentConversation._id]);

//   // Handle incoming calls
//   useSocketEvent('call:incoming', async (data:any) => {
//     setCallState({
//       type: data.type,
//       isIncoming: true,
//       isOpen: true
//     });
    
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: data.type === 'video',
//         audio: true
//       });
//       setLocalStream(stream);
//       createPeerConnection();
//     } catch (error) {
//       console.error('Error accessing media devices:', error);
//       toast.error('Could not access camera/microphone');
//     }
//   });

//   // Call handling functions
//   const handleCall = async (type: CallType) => {
//     if (socket) {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: type === 'video',
//           audio: true
//         });
//         setLocalStream(stream);

//         socket.emit('call:initialize', {
//           conversationId: currentConversation._id,
//           callerId: user._id,
//           receiverId: otherUser[0]._id,
//           type,
//         });
        
//         setCallState({
//           type,
//           isIncoming: false,
//           isOpen: true,
//         });

//         const peer = createPeerConnection();
//         const offer = await peer.createOffer();
//         await peer.setLocalDescription(offer);

//         socket.emit('webrtc:offer', {
//           conversationId: currentConversation._id,
//           callerId: user._id,
//           receiverId: otherUser[0]._id,
//           signal: offer,
//         });
//       } catch (error) {
//         console.error('Error starting call:', error);
//         toast.error('Failed to start call');
//       }
//     }
//   };

//   const handleAcceptCall = async () => {
//     if (!peerConnection.current || !socket) return;

//     try {
//       socket.emit('call:accept', {
//         conversationId: currentConversation._id,
//         callerId: otherUser[0]._id,
//         receiverId: user._id,
//       });

//       const answer = await peerConnection.current.createAnswer();
//       await peerConnection.current.setLocalDescription(answer);

//       socket.emit('webrtc:answer', {
//         conversationId: currentConversation._id,
//         callerId: otherUser[0]._id,
//         receiverId: user._id,
//         signal: answer,
//       });
//     } catch (error) {
//       console.error('Error accepting call:', error);
//       toast.error('Failed to accept call');
//     }
//   };

//   const handleEndCall = () => {
//     if (socket) {
//       socket.emit('call:end', {
//         conversationId: currentConversation._id,
//         callerId: user._id,
//         receiverId: otherUser[0]._id,
//       });
//     }

//     // Cleanup streams
//     if (localStream) {
//       localStream.getTracks().forEach(track => track.stop());
//       setLocalStream(null);
//     }
//     if (remoteStream) {
//       remoteStream.getTracks().forEach(track => track.stop());
//       setRemoteStream(null);
//     }

//     // Close peer connection
//     if (peerConnection.current) {
//       peerConnection.current.close();
//       peerConnection.current = null;
//     }

//     setCallState(prev => ({
//       ...prev,
//       isOpen: false,
//     }));
//   };

//   const handleRejectCall = () => {
//     if (socket) {
//       socket.emit('call:reject', {
//         conversationId: currentConversation._id,
//         callerId: otherUser[0]._id,
//         receiverId: user._id,
//       });
//     }

//     // Cleanup resources
//     if (localStream) {
//       localStream.getTracks().forEach(track => track.stop());
//       setLocalStream(null);
//     }
//     if (peerConnection.current) {
//       peerConnection.current.close();
//       peerConnection.current = null;
//     }

//     setCallState(prev => ({
//       ...prev,
//       isOpen: false,
//     }));
//   };

//   // Message handling
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setNewMessage(event.target.value);
//   };

//   useSocketEvent('message:new', (data:any) => {
//     setMessage(prev => [...prev, data.message]);
//   });

//   const handleSend = (event: React.FormEvent) => {
//     event.preventDefault();
//     if (newMessage.trim() === '') return toast.error('Please type a message');
    
//     const payload = {
//       sender: user._id,
//       conversationId: currentConversation._id,
//       content: newMessage,
//       messageType: 'text',
//     };

//     if (socket) {
//       try {
//         socket.emit('message:send', payload);
//       } catch (error) {
//         toast.error('Error sending message');
//         console.error(error);
//       } finally {
//         setNewMessage('');
//       }
//     }
//   };

//   return (
//     <div className="font-Mon text-sm flex flex-col h-full pb-8">
//       {/* Top section */}
//       <div className={`flex items-center justify-between mt-3 gap-10 p-2 rounded-sm ${
//         isDark ? 'bg-darkBg' : 'bg-white'
//       }`}>
//         <div className="flex items-center justify-center gap-3">
//           <img className="w-8 h-8 rounded-full" src={otherUser[0]?.avatar || Profile} alt="profile dp" />
//           <div>
//             <p>{otherUser[0]?.fullname}</p>
//             <p className="text-xs">last seen 2hr ago</p>
//           </div>
//         </div>
//         <div className="flex items-center justify-center gap-3">
//           <MdWifiCalling3 
//             className="hover:text-blue-700 cursor-pointer" 
//             onClick={() => handleCall('audio')}
//           />
//           <FaVideo 
//             className="hover:text-blue-700 cursor-pointer" 
//             onClick={() => handleCall('video')}
//           />
//         </div>
//       </div>

//       {/* Message area */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((eachMessage) => (
//           <div key={eachMessage._id}>
//             {eachMessage?.sender === user?._id ? (
//               <MainMessageText 
//                 Status={user?.avatar || Profile} 
//                 content={eachMessage?.content} 
//                 time={new Date(eachMessage.createdAt).toLocaleTimeString()} 
//               />
//             ) : (
//               <OtherMessageText 
//                 Status={otherUser[0].avatar} 
//                 content={eachMessage?.content} 
//                 time={new Date(eachMessage.createdAt).toLocaleTimeString()} 
//               />
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Input section */}
//       <form onSubmit={handleSend} className="p-4 border-t">
//         <div className="flex items-center gap-3 max-w-4xl mx-auto">
//           <input
//             className={`flex-1 outline-none p-2 rounded-full ${
//               isDark ? 'bg-darkBg text-white' : 'bg-white'
//             }`}
//             type="text"
//             value={newMessage}
//             onChange={handleChange}
//             placeholder="Type a message..."
//           />
//           <div className="flex items-center gap-3">
//             <MdAttachFile className="cursor-pointer text-md" />
//             <MdSettingsVoice className="cursor-pointer text-md" />
//             <button type="submit">
//               <BsSend className="cursor-pointer text-md"/>
//             </button>
//           </div>
//         </div>
//       </form>

//       {/* Call Modal */}
//       {callState.isOpen && callState.type && (
//         <CallModal 
//           callStatus={{
//             isOpen: callState.isOpen,
//             type: callState.type,
//             isIncoming: callState.isIncoming
//           }}
//           localStream={localStream}
//           remoteStream={remoteStream}
//           onAccept={handleAcceptCall}
//           onReject={handleRejectCall}
//           onEnd={handleEndCall}
//           otherUser={otherUser}
//         />
//       )}
//     </div>
//   );
// };

// export default Messenger;