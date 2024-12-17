import React, { useState } from 'react'

// -----status--------
import Status1 from '../assets/home/game.svg'
import Status2 from '../assets/home/dog.svg'
import Status3 from '../assets/home/whale.svg'
import Status4 from '../assets/home/game.svg'
import Status5 from '../assets/home/lantern.svg'
import Status6 from '../assets/home/map.svg'
import Status7 from '../assets/home/tower.svg'
import Feed from '../components/organisms/Feed'
import { TbBoxMultiple } from 'react-icons/tb'
import { MdMovieCreation } from 'react-icons/md'
import { useAppSelector } from '../redux/ReduxType'
import ProfileData from '../components/profile/ProfileData'
// -----status--------



interface IProfile{
    
}


const Video1 = 'placeholder1'
const Video2 = 'placeholder2'


const UserProflle:React.FC<IProfile> = () => {
  const [activeSelection, setActiveSelection] = useState('post')
  const isDark = useAppSelector((state)=>state.theme.isDark)

    // selection functionality 
    const handleSelection = (selection:string)=>{
        setActiveSelection(selection)
    }



  return (
    <div className={`rounded-lg ${isDark ? 'text-darkText' : ' text-deepBg'} p-2 overflow-auto custom-scrollbar`}>
        {/* profile */}
        < ProfileData/>


        {/* selections */}
        <div className='w-full mt-20 border-b-2 sm:mb-10 mb-5 flex items-center justify-center gap-5'>
                <button onClick={()=>{handleSelection('post')}} className={`mb-5 ${activeSelection === 'post' ? 'border-b-2 border-b-indigo-500' : ""}`}>Posts</button>
                <button onClick={()=>{handleSelection('media')}} className={`mb-5 ${activeSelection === 'media' ? 'border-b-2 border-b-indigo-500' : ""}`}>Media</button>
        </div>


        {/* posts */}
        {activeSelection === 'post' && <section className='text-sm'>
            {/* <Feed isDark={isDark} PostImg={Status1}/>
            <Feed isDark={isDark} PostImg={Status2}/>
            <Feed isDark={isDark} PostImg={Status3}/>
            <Feed isDark={isDark} PostImg={Status4}/> */}
        </section>}


        {/* media */}
        {
        activeSelection === 'media' && <div className='grid grid-cols-3 grid-rows-1 gap-4'>
          <div className='relative after:absolute after:w-full after:h-full after:bg-black after:top-0 after:left-0 after:opacity-55'>
            <img src={Status5} alt='demo 1'/>
            <TbBoxMultiple className='absolute z-20 top-5 left-5 text-white'/>
          </div>
          <div className='rounded-sm overflow-hidden'>
            <img src={Status6} alt='demo 1'/>
          </div>
          <div className='relative after:absolute after:w-full after:h-full after:bg-black after:top-0 after:left-0 after:opacity-55'>
            <video
                controls
                className='object-cover rounded-lg shadow-lg h-[230px] w-full'
              >
                <source src={Video1} type='video/mp4' />
              </video>
              <MdMovieCreation className='absolute z-20 top-5 left-5 text-white'/>
          </div>
          <div className='relative after:absolute after:w-full after:h-full after:bg-black after:top-0 after:left-0 after:opacity-55'>
            <img src={Status7} alt='demo 1'/>
            <TbBoxMultiple className='absolute z-20 top-5 left-5 text-white'/>
          </div>
          <div className='rounded-sm overflow-hidden'>
            <img src={Status3} alt='demo 1'/>
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

export default UserProflle