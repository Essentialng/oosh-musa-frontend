import React, { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../redux/ReduxType';
import { FaCommentAlt, FaPowerOff } from 'react-icons/fa';
import { MdMic, MdMicOff, MdVideocam, MdVideocamOff } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { useSocket, useSocketEvent } from '../context/socket.context';

interface IComment {
    userId: string;
    username: string;
    message: string;
    timestamp: Date;
}

interface PeerConnection {
    [key: string]: RTCPeerConnection;
}

const LiveStrem = () => {

    
    const [isLive, setIsLive] = useState(false);
    const [comments, setComments] = useState<IComment[]>([]);
    const [message, setMessage] = useState('');
    const [viewerCount, setViewerCount] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const User = useAppSelector(state=>state.user)
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    
    const isDark = useAppSelector(state => state.theme.isDark);
    const { socket } = useSocket()
    
    const [peerConnections, setPeerConnections] = useState<PeerConnection>({});
    const eventId = useLocation()?.pathname?.split('/')[2]
    const owner = useLocation()?.pathname?.split('/')[3]
    const [isHost, setIsHost] = useState(owner === User?._id);
    // alert(isHost)

    const configuration = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
        ]
    };

    const createPeerConnection = (viewerId: string) => {
        const peerConnection = new RTCPeerConnection(configuration);

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket?.emit('viewer:ice-candidate', {
                    candidate: event.candidate,
                    viewerId
                });
            }
        };

        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => {
                peerConnection.addTrack(track, streamRef.current!);
            });
        }

        return peerConnection;
    };


    const startStream = async ()=>{
        try{
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            })

            streamRef.current = stream
            if(videoRef.current){
                videoRef.current.srcObject = stream
            }

            socket?.emit('live:start', {
                userId: User._id,
                username: User.username,
                eventId
            })

            setIsLive(true)
        }catch(error:any){
            console.log('Error starting stream', error)
        }

    };


    const joinStream = async () => {
        try {
            const peerConnection = new RTCPeerConnection(configuration);

            peerConnection.ontrack = (event) => {
                alert('am triggered')
                if (videoRef.current && event.streams[0]) {
                    videoRef.current.srcObject = event.streams[0];
                }
            };

            peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    socket?.emit('viewer:ice-candidate', {
                        candidate: event.candidate,
                        hostId: eventId
                    });
                }
            };

            setPeerConnections({ [eventId]: peerConnection });

            socket?.emit('viewer:join', {
                userId: User?._id,
                username: User?.username,
                eventId
            });
        } catch (error) {
            console.error('Error joining stream:', error);
        }
    };

    // const peerConnection = new RTCPeerConnection(configuration);

    useSocketEvent('viewer:join', async ({ viewerId, username }:{viewerId:string, username:string}) => {
        if (!isHost || !streamRef.current) return;

        const peerConnection = createPeerConnection(viewerId);
        
        try {
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);

            socket?.emit('stream:offer', {
                offer,
                viewerId
            });

            setPeerConnections(prev => ({
                ...prev,
                [viewerId]: peerConnection
            }));
        } catch (error) {
            console.error('Error creating offer:', error);
        }
    });

    useSocketEvent('stream:answer', async ({ answer, viewerId }:{answer:any, viewerId:string}) => {
        const peerConnection = peerConnections[viewerId];
        if (peerConnection) {
            try {
                await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
            } catch (error) {
                console.error('Error setting remote description:', error);
            }
        }
    });

    useSocketEvent('viewer:ice-candidate', async ({ candidate, userId }:{candidate:any, userId: string}) => {
        const peerConnection = peerConnections[userId] || peerConnections[eventId];
        if (peerConnection) {
            try {
                await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
            } catch (error) {
                console.error('Error adding ICE candidate:', error);
            }
        }
    });
      
    useSocketEvent('viewer:count', (count: number) => {
        setViewerCount(count);
    });

    useSocketEvent('live:comment', (comment: IComment) => {
        setComments(prev => [...prev, comment]);
    });

      useSocketEvent('stream:offer', async ({ offer }:{offer:any}) => {
        if (isHost) return;
        
        const peerConnection = peerConnections[eventId];
        if (!peerConnection) return;

        try {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);

            socket?.emit('stream:answer', {
                answer,
                hostId: eventId
            });
        } catch (error) {
            console.error('Error handling offer:', error);
        }
    });

    

    const stopStream = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }

        Object.values(peerConnections).forEach(pc => pc.close());
        setPeerConnections({});

        socket?.emit('live:end', { userId: User._id, eventId });
        setIsLive(false);
    };

    const toggleAudio = () => {
        if (streamRef.current) {
            const audioTrack = streamRef.current.getAudioTracks()[0];
            audioTrack.enabled = !audioTrack.enabled;
            setIsMuted(!isMuted);
        }
    };

    const toggleVideo = () => {
        if (streamRef.current) {
            const videoTrack = streamRef.current.getVideoTracks()[0];
            videoTrack.enabled = !videoTrack.enabled;
            setIsVideoEnabled(!isVideoEnabled);
        }
    };

    const sendComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        const comment: IComment = {
            userId: User._id,
            username: User.username,
            message,
            timestamp: new Date()
        };

        socket?.emit('live:comment', comment);
        setMessage('');
    };

    useEffect(() => {
        return () => {
            if (isLive) {
                stopStream();
            }
            Object.values(peerConnections).forEach(pc => pc.close());
        };
    }, []);

  return (
    <div className={`w-full flex h-full p-5 ${isDark ? 'bg-darkBg text-darkText' : 'bg-lightBg text-deepBg'}`}>
        <div className="relative w-3/5">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted={isHost}
                    className="w-full h-full object-cover"
                />
                
                {/* Stream Controls */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black bg-opacity-50 p-3 rounded-lg">
                {isHost ? (<>
                    <button
                        onClick={toggleAudio}
                        className="p-2 rounded-full hover:bg-gray-700"
                    >
                        {isMuted ? <MdMicOff className="text-red-500" /> : <MdMic className="text-white" />}
                    </button>
                    <button
                        onClick={toggleVideo}
                        className="p-2 rounded-full hover:bg-gray-700"
                    >
                        {isVideoEnabled ? 
                            <MdVideocam className="text-white" /> : 
                            <MdVideocamOff className="text-red-500" />
                        }
                    </button>
                    {!isLive ? (
                        <button
                            onClick={startStream}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                            Go Live
                        </button>
                    ) : (
                        <button
                            onClick={stopStream}
                            className="p-2 rounded-full hover:bg-gray-700"
                        >
                            <FaPowerOff className="text-red-500" />
                        </button>
                    )}
                    </>) : (
                        <button onClick={joinStream}
                         className='px-4 py-2 bg-deepBg text-white rounded-lg hover:bg-darkBg'
                        >
                            Join
                        </button>
                    )
                    }
                </div>

                {/* Viewer Count */}
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 px-3 py-1 rounded-lg text-white">
                    {viewerCount} viewers
                </div>
            </div>

            {/* Comments Section */}
            <div className="w-2/5 bg-opacity-75 overflow-y-auto min-h-[100%] relative">
                <div className="space-y-2 mb-4">
                    {comments.map((comment, index) => (
                        <div key={index} className="flex items-start gap-2">
                            <FaCommentAlt className="mt-1" />
                            <div>
                                <span className="font-bold">{comment.username}</span>
                                <p>{comment.message}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <form onSubmit={sendComment} className="flex gap-2 absolute bottom-0 w-full px-5">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-1 w-full px-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Send
                    </button>
                </form>
            </div>
    </div>
  )
}

export default LiveStrem