import React, { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../redux/ReduxType';
import { MdAttachFile, MdSettingsVoice, MdWifiCalling3 } from 'react-icons/md';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';
import MainMessageText from '../components/molecules/MainMessageText';
import OtherMessageText from '../components/molecules/OtherMessageText';
import Profile from '../assets/profile/back6.jpeg';
import { BsSend } from 'react-icons/bs';
import toast from 'react-hot-toast';
import { useSocket, useSocketEvent } from '../context/socket.context';
import { useMakeRequest } from '../hooks/useMakeRequest';
import { CONVERSATION_URL } from '../constant/resource';
// import SimplePeer, { SignalData } from 'simple-peer';
// import Modal from '../components/modal/Modal';
// import VideoCall from '../components/modal/Video';
import { IoCall, IoClose } from 'react-icons/io5';
import { usePeerConnection } from '../hooks/usePeerConnection';
import { Socket } from 'socket.io-client';
import Peer from 'peerjs';
import { Stream } from 'stream';


interface Message {
    _id: string;
    sender: string;
    content: string;
    messageType: string;
    conversationId: string;
    createdAt: string;
    updatedAt: string;
  }


const Messenger2 = () => {
    const [showCallModal, setShowCallModal] = useState(false)
    const [messages, setMessage] = useState<Message[]>([])
    const user = useAppSelector(state=>state.user)
    const isDark = useAppSelector(state=>state.theme.isDark)
    const currentConversation = useAppSelector(state=>state.currentConversation)
    const otherUser:any = currentConversation?.participants?.filter((eachParticipant)=>eachParticipant._id !== user._id)
    // const [localStream, setLocalStream] = useState(null)
    // const [remoteStream, setRemoteStream] = useState(null)
    const [newMessage, setNewMessage] = useState('')
    const { socket } = useSocket()
    const [callType, setCallType] = useState('')
    const [isCaller, setIscaller] = useState(false)
    const makeRequest = useMakeRequest()

    // --- video data ---
    const [isIncoming, setIsIncoming] = useState<boolean>(false)
    const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(false)
    const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(false)
    const localVideoRef = useRef<MediaStream | null>(null);
    const remoteVideoref = useRef<MediaStream | null>(null);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    
    const peerConnection = new RTCPeerConnection()
    // const peer = useRef<Peer | null>(null);
    // const [peerId, setPeerId] = useState<string>('')
    // --- video data ---

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


    //   ------- calling -----------

    useSocketEvent('call:incomming', (data:any)=>{
      console.log('incomming --->', data)
    })

    const createOffer = async(socket:any)=>{
      peerConnection.createOffer().then(data=>{
        peerConnection.setLocalDescription(data)
        console.log('offer', data)
        socket?.emit('call:offer', {
          conversationId: currentConversation._id,
          senderId: user._id,
          recipient: otherUser._id,
          callType: callType,
          sdp: data
        })
      })
    }

    const createAnswer = async()=>{

    }


    const handleCall = async(callType: string) => {
      try {
          let stream: MediaStream;
          switch (callType) {
              case 'video':
                  stream = await navigator.mediaDevices.getUserMedia({
                      audio: true,
                      video: {
                          width: { ideal: 1280 },
                          height: { ideal: 720 }
                      }
                  });
                  break;
              case 'audio':
                  stream = await navigator.mediaDevices.getUserMedia({
                      audio: true,
                      video: false
                  });
                  break;
              default:
                  return;
          }

          
          setLocalStream(stream);
          setCallType(callType);
          setIsVideoEnabled(callType === 'video');
          setIsAudioEnabled(true);
          setShowCallModal(true);

          // Immediately set the stream to the video element
          if (localVideoRef.current && stream) {
            localVideoRef.current = stream;
          }
          
          // create an SDP offer
          await createOffer(socket)


      } catch (error) {
          console.error('Error accessing media devices:', error);
          toast.error('Could not access camera/microphone');
      }
  };

    const handleAcceptCall = ()=>{

    }

    const handleEndCall = async () => {
      if (localStream) {
        try {
          // Get all tracks from the MediaStream
          const tracks = localStream.getTracks();
          
          // Stop each track individually
          tracks.forEach((track) => {
            track.stop();
          });
    
          // Clean up the stream state
          setLocalStream(null);
          
          // Reset all related states
          setIsVideoEnabled(false);
          setIsAudioEnabled(false);
          setShowCallModal(false);

        } catch (error) {
          console.error('Error ending call:', error);
          setShowCallModal(false);
        }
      } else {
        setShowCallModal(false);
      }
    };


    const handleRejectCall = ()=>{
      if (localStream) {
        try {
          // Get all tracks from the MediaStream
          const tracks = localStream.getTracks();
          
          // Stop each track individually
          tracks.forEach((track) => {
            track.stop();
          });
    
          // Clean up the stream state
          setLocalStream(null);
          
          // Reset all related states
          setIsVideoEnabled(false);
          setIsAudioEnabled(false);
          setShowCallModal(false);

        } catch (error) {
          console.error('Error ending call:', error);
          setShowCallModal(false);
        }
      } else {
        setShowCallModal(false);
      }
    }

    const handleToggleAudio = ()=>{

    }

    const handleToggleVideo = ()=>{

    }
    //   ------- calling -----------


    // -------- texting ---------

    useSocketEvent('message:new', (data:any)=>{
        setMessage(prev => [...prev, data.message]) 
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

      const handleChange = (event:any)=>{
        setNewMessage(event.target.value)
      }


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

          {/*  ---- call section ---- */}
            {showCallModal ? <div className='fixed inset-0 bg-black/95 flex flex-col items-center justify-center mx-auto z-50'>
                <div className="">
                    <div className="absolute top-6 flex flex-col items-center gap-4">
                            <div className="flex flex-col items-center">
                              <img 
                                src={otherUser?.[0]?.avatar} 
                                alt="caller"
                                className="w-20 h-20 object-cover rounded-full"
                              />
                              <h3 className="font-bold text-lg text-white mt-2">
                                {otherUser?.[0]?.fullname}
                              </h3>
                              <p className="text-gray-300">
                                {!isIncoming ? 'calling...' : 'Incoming Call...'}
                              </p>
                            </div>
                          </div>
                    
                          {/* Video Display Area */}
                          {callType === 'video' && (
                            <div className="relative w-full h-full">
                              {/* Remote Video (Full Screen) */}
                              {remoteStream && (
                                <video
                                  autoPlay
                                  playsInline
                                  ref={(videoElement) => {
                                    if (videoElement) {
                                      videoElement.srcObject = remoteStream;
                                    }
                                  }}
                                  className="w-full h-full object-cover"
                                />
                              )}
                              
                              {/* Local Video (Picture-in-Picture) */}
                              <div className="absolute bottom-24 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                              {localStream && (
                                <video
                                  autoPlay
                                  playsInline
                                  muted
                                  ref={(videoElement) => {
                                    if (videoElement) {
                                      videoElement.srcObject = localStream;
                                    }
                                  }}
                                  className="w-full h-full object-cover"
                                />
                              )}
                              </div>
                            </div>
                          )}
                    
                          {/* Audio-only call display */}
                          {callType === 'audio' && (
                            <div className="text-white text-center">
                              <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center">
                                <img 
                                  src={otherUser?.[0]?.avatar} 
                                  alt="caller"
                                  className="w-full h-full rounded-full object-cover"
                                />
                              </div>
                            </div>
                          )}
                    
                          {/* Control Buttons */}
                          <div className="absolute bottom-8 flex items-center gap-6">
                            {callType === 'video' ? (
                              <button
                                onClick={handleToggleVideo}
                                className={`p-4 rounded-full ${
                                  isVideoEnabled ? 'bg-gray-600' : 'bg-red-500'
                                }`}
                              >
                                {isVideoEnabled ? (
                                  <FaVideo className="text-white text-xl" />
                                ) : (
                                  <FaVideoSlash className="text-white text-xl" />
                                )}
                              </button>
                            ) : null}
                    
                            <button
                              onClick={handleToggleAudio}
                              className={`p-4 rounded-full ${
                                isAudioEnabled ? 'bg-gray-600' : 'bg-red-500'
                              }`}
                            >
                              {isAudioEnabled ? (
                                <FaMicrophone className="text-white text-xl" />
                              ) : (
                                <FaMicrophoneSlash className="text-white text-xl" />
                              )}
                            </button>
                    
                            <button 
                              onClick={handleEndCall}
                              className="p-4 bg-red-500 rounded-full hover:bg-red-600"
                            >
                              <IoClose className="text-white text-xl" />
                            </button>
                    
                            {isIncoming && (
                              <button 
                                onClick={handleAcceptCall}
                                className="p-4 bg-green-500 rounded-full hover:bg-green-600"
                              >
                                <IoCall className="text-white text-xl" />
                              </button>
                            )}
                          </div>
                </div>
            </div> : null}
        </div>
      );
}

export default Messenger2