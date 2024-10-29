// import Video from '../assets/video/reel1.mp4';
import { sampleReel1 } from '../assets/data/reelData';
import { sampleReel2 } from '../assets/data/reelData';
import { MdMovieCreation, MdVideoCameraBack } from "react-icons/md";
import { BsCameraReels, BsGrid } from 'react-icons/bs';
import { TbBoxMultiple } from 'react-icons/tb';
import Ree11 from '../assets/home/lantern.svg'
import Ree12 from '../assets/home/dog.svg'
import Ree13 from '../assets/home/dew2.jpg'
import Ree14 from '../assets/home/read.svg'
import { useState } from 'react';
import { useAppSelector } from '../redux/ReduxType';
import VideoReel from '../components/organisms/VideoReel';



// const Video = 'hello'
const Video2 = 'hello'


interface ITimeline{
    
}

const Timeline:React.FC<ITimeline> = ()=>{



    const [currentSelection, setCurrentSelection] = useState('post')

    const handleSelection = (selection: string) => {
      setCurrentSelection(selection)
    }

    const isDark = useAppSelector((state)=>state.toggleTheme.isDark)


    return(
        <div className='w-full my-2 flex flex-col items-center justify-center gap-5 mb-10'>
       
        <div className={`rounded-lg ${isDark ? 'bg-deepBg text-white' : 'bg-white text-gray-800'} flex items-center justify-center gap-10 p-5 custom-scrollbar`}>
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
            {tab === 'post' && <MdVideoCameraBack className='w-8 h-8' />}
            {tab === 'live' && <BsCameraReels className='w-8 h-8' />}
            {tab === 'trend' && <BsGrid className='w-8 h-8' />}
          </span>
        ))}
      </div>


      {/** List of post */}
      {currentSelection === 'post' && (
        <div className='grid grid-cols-2 gap-4 w-full'>
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
        currentSelection === 'trend' && <div className='grid grid-cols-3 grid-rows-1 gap-4 w-full'>
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
                <source src={Video2} type='video/mp4' />
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
                <source src={Video2} type='video/mp4' />
              </video>
              <MdMovieCreation className='absolute z-20 top-5 left-5 text-white'/>
          </div>
        </div>
      }
    </div>
    )
}


export default Timeline