import React, { useRef, useState } from 'react'
import { useAppSelector } from '../redux/ReduxType'
import { useLocation } from 'react-router-dom'
import { MdMic, MdMicOff, MdVideocam, MdVideocamOff } from 'react-icons/md'
import { FaCommentAlt, FaPowerOff } from 'react-icons/fa';

interface IComment {
    userId: string;
    username: string;
    message: string;
    timestamp: Date;
}

const LiveEvent2 = () => {
  
    const User = useAppSelector(state=>state.user)
    const isDark = useAppSelector(state=>state.theme.isDark)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isLive, setIsLive] = useState(false);
    const [comments, setComments] = useState<IComment[]>([]);
    const [message, setMessage] = useState('');
    const [viewerCount, setViewerCount] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const eventId = useLocation()?.pathname?.split('/')[2]
    const owner = useLocation()?.pathname?.split('/')[3]
    const [isHost, setIsHost] = useState(owner === User?._id);


    // ----- controls -----
    const toggleAudio = ()=>{

    }

    const toggleVideo = ()=>{

    }

    // ------- stream controls --------
    const startStream = ()=>{
        
    }

    const stopStream = ()=>{

    }

    const joinStream = ()=>{

    }

    const sendComment = ()=>{
        
    }

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

export default LiveEvent2