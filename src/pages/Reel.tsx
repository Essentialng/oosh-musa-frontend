import React, { useState } from 'react'
import '../styles/custom.css'
import { MdVideoCameraBack} from 'react-icons/md'
import { TbBoxMultiple } from "react-icons/tb";
import { BsCameraReels, BsGrid } from 'react-icons/bs'
import Ree11 from '../assets/home/lantern.svg'
import Ree12 from '../assets/home/dog.svg'
import Ree13 from '../assets/home/game.svg'
import Ree14 from '../assets/home/tower.svg'
import VideoReel from '../components/organisms/VideoReel';
import { sampleReel1 } from '../assets/data/reelData';
import { sampleReel2 } from '../assets/data/reelData';
import { MdMovieCreation } from "react-icons/md";
import { useAppSelector } from '../redux/ReduxType';


const video1 = 'hello'
const video2 = 'hello'


const Reel = () => {

  const isDark = useAppSelector((state)=>state.theme.isDark)

  const [currentSelection, setCurrentSelection] = useState('post')

  const handleSelection = (selection: string) => {
    setCurrentSelection(selection)
  }

  return (
    <div className='w-full my-2 flex flex-col items-center justify-center gap-5 mb-10'>
        <div className={`flex items-end gap-3 rounded-lg ${isDark ? 'bg-deepBg text-white' : 'bg-white text-gray-800'} p-3 custom-scrollbar`}>
        {['post', 'live', 'trend'].map((tab) => (
          <span
            key={tab}
            onClick={() => handleSelection(tab)}
            className={`cursor-pointer transition-all duration-300 pb-2 ${
              currentSelection === tab
                ? `border-b-2 ${isDark ? 'border-white' : 'border-gray-800'}`
                : ''
            }`}
          >
            {tab === 'post' && <MdVideoCameraBack className='w-6 h-6' />}
            {tab === 'live' && <BsCameraReels className='w-6 h-6' />}
            {tab === 'trend' && <BsGrid className='w-6 h-6' />}
          </span>
        ))}
      </div>


      {/** List of post */}
      {currentSelection === 'post' && (
        <div className='grid grid-cols-2 gap-4'>
          <div className='relative row-span-2 cursor-pointer after:absolute after:w-full after:h-full after:bg-black after:top-0 after:left-0 after:opacity-55'>
            <img className='h-full w-full object-cover rounded-lg' src={Ree11} alt='reel one' />
            <TbBoxMultiple className='absolute z-20 top-5 left-5 text-white'/>
          </div>
          <div>
            <img className='h-full w-full object-cover rounded-lg' src={Ree12} alt='reel two' />
          </div>
          <div>
            <img className='h-full w-full object-cover rounded-lg' src={Ree13} alt='reel three' />
          </div>
          <div className='row-span-2'>
            <img className='h-full w-full object-cover rounded-lg' src={Ree14} alt='reel four' />
          </div>
        </div>
      )}


      {/** Live video */}
      {currentSelection === 'live' && (
        <div className='flex flex-col gap-20'>
        <VideoReel {...sampleReel1}/>
        <VideoReel {...sampleReel2}/>
        </div>
      )}


      {/* Trend section */}
      {
        currentSelection === 'trend' && <div className='grid grid-cols-3 grid-rows-1 gap-4'>
          <div className='relative after:absolute after:w-full after:h-full after:bg-black after:top-0 after:left-0 after:opacity-55'>
            <img src={Ree11} alt='demo 1'/>
            <TbBoxMultiple className='absolute z-20 top-5 left-5 text-white'/>
          </div>
          <div className='rounded-sm overflow-hidden'>
            <img src={Ree11} alt='demo 1'/>
          </div>
          <div className='relative after:absolute after:w-full after:h-full after:bg-black after:top-0 after:left-0 after:opacity-55'>
            <video
                controls
                className='object-cover rounded-lg shadow-lg h-[230px] w-full'
              >
                <source src={video1} type='video/mp4' />
              </video>
              <MdMovieCreation className='absolute z-20 top-5 left-5 text-white'/>
          </div>
          <div className='relative after:absolute after:w-full after:h-full after:bg-black after:top-0 after:left-0 after:opacity-55'>
            <img src={Ree13} alt='demo 1'/>
            <TbBoxMultiple className='absolute z-20 top-5 left-5 text-white'/>
          </div>
          <div className='rounded-sm overflow-hidden'>
            <img src={Ree12} alt='demo 1'/>
          </div>
          <div className='relative after:absolute after:w-full after:h-full after:bg-black after:top-0 after:left-0 after:opacity-55'>
            <video
                controls
                className='object-cover rounded-lg shadow-lg h-[230px] w-full'
              >
                <source src={video2} type='video/mp4' />
              </video>
              <MdMovieCreation className='absolute z-20 top-5 left-5 text-white'/>
          </div>
        </div>
      }
    </div>
  )
}

export default Reel