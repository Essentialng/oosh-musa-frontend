import React, { useRef, useState } from 'react';
import { BsChatDotsFill, BsHeart } from 'react-icons/bs';
import { FaPlay, FaShare } from 'react-icons/fa';
import { IoPauseCircle } from "react-icons/io5";

interface IVideoReel {
  videoSrc: string;
  profile: string;
  userName: string;
  time: string;
}

const VideoReel: React.FC<IVideoReel> = ({ videoSrc, profile, userName, time }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlay, setIsPlay] = useState(false)

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlay(true)
    }
  };
  
  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlay(false)
    }
  };

  return (
    <div className='relative w-full max-w-2xl mx-auto'>
      <video
        ref={videoRef}
        controls={false}
        className='w-full h-[500px] object-cover rounded-lg shadow-lg'
      >
        <source src={videoSrc} type='video/mp4' />
      </video>
      <div className='absolute top-4 left-4 flex items-center space-x-2 bg-black bg-opacity-50 rounded-full p-2 object-contain'>
        <img className='w-8 h-8 rounded-full' src={profile} alt='user avatar' />
        <div className='text-white'>
          <p className='font-semibold'>{userName}</p>
          <p className='text-xs'>{time}</p>
        </div>
      </div>
      <div className='flex items-center justify-center absolute top-1/3 left-1/2'>
        <button onClick={handlePlay} className={`bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 ${isPlay ? 'hidden' : ''} p-2 rounded-full`}>
          <FaPlay className='w-6 h-6 text-white' />
        </button>
        <button onClick={handlePause} className={`bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 ${isPlay ? '' : 'hidden'} p-2 rounded-full`}>
          <IoPauseCircle className='w-6 h-6 text-white' />
        </button>
      </div>
      <div className='absolute right-4 bottom-12 flex flex-col items-center space-y-4'>
        <button className='bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 p-2 rounded-full'>
          <BsHeart className='w-6 h-6 text-white' />
        </button>
        <button className='bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 p-2 rounded-full'>
          <BsChatDotsFill className='w-6 h-6 text-white' />
        </button>
        <button className='bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 p-2 rounded-full'>
          <FaShare className='w-6 h-6 text-white' />
        </button>
      </div>
    </div>
  );
};

export default VideoReel;
