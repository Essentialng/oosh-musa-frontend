import React, { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import io from 'socket.io-client'; 
import { BsCameraVideo, BsTelephone, BsThreeDots } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';
import { FiPhoneOff } from 'react-icons/fi';

interface Message {
  _id: string;
  sender: string;
  content: string;
  messageType: 'text';
  createdAt: string;
}

interface User {
  userId: string;
  lastSeen: Date;
}

const ChatInterface = ({ userId, conversationId }: { userId: string; conversationId: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [incomingCall, setIncomingCall] = useState<any>(null);
  const [currentCall, setCurrentCall] = useState<any>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const socketRef = useRef<typeof Socket>();
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socketRef.current = io('http://your-backend-url');
    const socket = socketRef.current;

    socket.emit('user:join', userId);
    socket.emit('conversation:join', conversationId);

    socket.on('message:receive', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    socket.on('user:online', (users: User[]) => {
      setOnlineUsers(users);
    });

    socket.on('typing:update', (data: { userId: string; isTyping: boolean }) => {
      setIsTyping(data.isTyping);
    });

    // Call handling
    socket.on('call:incoming', (data:any) => {
      setIncomingCall(data);
    });

    socket.on('webrtc:offer', async (data:any) => {
      if (!peerConnectionRef.current) {
        setupPeerConnection();
      }
      await peerConnectionRef.current?.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await peerConnectionRef.current?.createAnswer();
      await peerConnectionRef.current?.setLocalDescription(answer);
      socket.emit('webrtc:answer', {
        answer,
        callerId: data.callerId,
        receiverId: userId
      });
    });

    socket.on('webrtc:answer', async (data:any) => {
      await peerConnectionRef.current?.setRemoteDescription(new RTCSessionDescription(data.answer));
    });

    socket.on('webrtc:ice-candidate', async (data:any) => {
      await peerConnectionRef.current?.addIceCandidate(new RTCIceCandidate(data.candidate));
    });

    return () => {
      localStream?.getTracks().forEach(track => track.stop());
      peerConnectionRef.current?.close();
      socket.disconnect();
    };
  }, [userId, conversationId]);

  const setupPeerConnection = () => {
    peerConnectionRef.current = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    peerConnectionRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current?.emit('webrtc:ice-candidate', {
          candidate: event.candidate,
          receiverId: currentCall?.receiverId || currentCall?.callerId
        });
      }
    };

    peerConnectionRef.current.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };
  };

  const initiateCall = async (type: 'audio' | 'video') => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: type === 'video',
      audio: true
    });
    setLocalStream(stream);

    setupPeerConnection();
    stream.getTracks().forEach(track => {
      peerConnectionRef.current?.addTrack(track, stream);
    });

    const offer = await peerConnectionRef.current?.createOffer();
    await peerConnectionRef.current?.setLocalDescription(offer);

    socketRef.current?.emit('call:initiate', {
      conversationId,
      callerId: userId,
      receiverId: 'other-user-id', // You'll need to pass this
      type
    });

    socketRef.current?.emit('webrtc:offer', {
      offer,
      receiverId: 'other-user-id' // You'll need to pass this
    });
  };

  const handleAcceptCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: incomingCall.type === 'video',
      audio: true
    });
    setLocalStream(stream);

    socketRef.current?.emit('call:accept', {
      conversationId,
      callerId: incomingCall.callerId,
      receiverId: userId
    });

    setIncomingCall(null);
    setCurrentCall(incomingCall);
  };

  const handleRejectCall = () => {
    socketRef.current?.emit('call:reject', {
      conversationId,
      callerId: incomingCall.callerId
    });
    setIncomingCall(null);
  };

  const endCall = () => {
    socketRef.current?.emit('call:end', {
      conversationId,
      participantId: userId
    });
    localStream?.getTracks().forEach(track => track.stop());
    peerConnectionRef.current?.close();
    setLocalStream(null);
    setRemoteStream(null);
    setCurrentCall(null);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    socketRef.current?.emit('message:new', {
      conversationId,
      sender: userId,
      content: newMessage,
      messageType: 'text',
      conversation: {
        participants: ['other-user-id'] // You'll need to pass this
      }
    });

    setNewMessage('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white p-4 shadow flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="avatar online">
            <div className="w-12 rounded-full">
              <img src="/api/placeholder/48/48" alt="User avatar" />
            </div>
          </div>
          <div>
            <h2 className="font-bold">Chat Room</h2>
            <p className="text-sm text-gray-500">
              {isTyping ? 'Typing...' : 'Online'}
            </p>
          </div>
        </div>
        <div className="flex space-x-4">
          <button 
            className="btn btn-circle btn-ghost"
            onClick={() => initiateCall('audio')}
          >
            <BsTelephone className="text-xl" />
          </button>
          <button 
            className="btn btn-circle btn-ghost"
            onClick={() => initiateCall('video')}
          >
            <BsCameraVideo className="text-xl" />
          </button>
          <button className="btn btn-circle btn-ghost">
            <BsThreeDots className="text-xl" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.sender === userId ? 'chat-end' : 'chat-start'}`}
          >
            <div className={`chat-bubble ${
              message.sender === userId ? 'chat-bubble-primary' : 'chat-bubble-secondary'
            }`}>
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white p-4 shadow-lg">
        <div className="flex space-x-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="input input-bordered flex-1"
          />
          <button 
            className="btn btn-primary"
            onClick={sendMessage}
          >
            <IoMdSend className="text-xl" />
          </button>
        </div>
      </div>

      {/* Incoming Call Modal */}
      {incomingCall && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Incoming {incomingCall.type} call
            </h3>
            <div className="modal-action">
              <button 
                className="btn btn-error"
                onClick={handleRejectCall}
              >
                Reject
              </button>
              <button 
                className="btn btn-success"
                onClick={handleAcceptCall}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Call */}
      {currentCall && (
        <div className="fixed inset-0 bg-black flex items-center justify-center">
          {remoteStream && (
            <video
              ref={video => {
                if (video) video.srcObject = remoteStream;
              }}
              autoPlay
              className="w-full h-full object-cover"
            />
          )}
          {localStream && (
            <video
              ref={video => {
                if (video) video.srcObject = localStream;
              }}
              autoPlay
              muted
              className="absolute bottom-4 right-4 w-48 h-36 object-cover rounded-lg"
            />
          )}
          <button 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 btn btn-error btn-circle btn-lg"
            onClick={endCall}
          >
            <FiPhoneOff className="text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;