import React, { useState } from 'react'
import Background from '../assets/home/dew.jpg'
import Profile from '../assets/home/dog.svg'
// import { MdAdd } from 'react-icons/md'

// -----status--------
import Status1 from '../assets/home/game.svg'
import Status2 from '../assets/home/dog.svg'
import Status3 from '../assets/home/whale.svg'
import Status4 from '../assets/home/game.svg'
import Status5 from '../assets/home/lantern.svg'
import Status6 from '../assets/home/map.svg'
import Status7 from '../assets/home/tower.svg'
// import Video1 from '../assets/video/reel4.mp4'
// import Video2 from '../assets/video/reel2.mp4'
import Feed from '../components/organisms/Feed'
import { TbBoxMultiple } from 'react-icons/tb'
import { MdMovieCreation } from 'react-icons/md'
import { useAppSelector } from '../redux/ReduxType'
// -----status--------



interface IProfile{
    
}


const Video1 = 'placeholder1'
const Video2 = 'placeholder2'


const UserProflle:React.FC<IProfile> = () => {
  const [activeSelection, setActiveSelection] = useState('post')
  const isDark = useAppSelector((state)=>state.toggleTheme.isDark)


    // selection functionality 
    const handleSelection = (selection:string)=>{
        setActiveSelection(selection)
    }



  return (
    <div className={`rounded-lg ${isDark ? 'text-darkText' : ' text-deepBg'} p-2 overflow-auto custom-scrollbar`}>
        {/* profile */}
        <section className='w-full h-[300px] relative'>
            <img className='object-cover h-full w-full' src={Background} alt='background'/>
            <div className='absolute -bottom-8 left-0 flex items-start justify-start gap-5'>
                <img className='w-14 h-14 rounded-full object-cover shadow-md' src={Profile} alt="profile" />
                <div>
                    <h2 className={`text-2xl font-bold ${!isDark && 'text-lightText'} mb-2`}>Musa Muhammed</h2>
                    <div className={`flex items-start flex-col shadow-md p-5 justify-start gap-2 font-semibold rounded-md ${isDark ? 'bg-deepBg text-lightText' : 'bg-deepLight text-deepBg'}`}>
                          <p className='text-sm'>Software Engineer</p>
                          <p className='text-xs'>@galapagous</p>
                          <p className='text-xs'>Los Angeles, CA</p>
                          <p className='text-xs'>New York, NY</p>
                          <p className='text-xs'>100 <span className='text-blue-400'>followers</span></p>
                          <button onClick={()=>{alert('follow')}} className={`text-sm px-4 py-[1px] rounded-full ${isDark ? 'bg-lightBg text-deepBg' : 'bg-deepBg text-lightText'}`}>Follow</button>
                    </div>
                </div>
            </div>
        </section>

        {/* selections */}
        <div className='w-full mt-20 border-b-2 sm:mb-10 mb-5 flex items-center justify-center gap-5'>
                <button onClick={()=>{handleSelection('post')}} className={`mb-5 ${activeSelection === 'post' ? 'border-b-2 border-b-indigo-500' : ""}`}>Posts</button>
                <button onClick={()=>{handleSelection('media')}} className={`mb-5 ${activeSelection === 'media' ? 'border-b-2 border-b-indigo-500' : ""}`}>Media</button>
        </div>
        {/* posts */}
        {activeSelection === 'post' && <section className='text-sm'>
            <Feed isDark={isDark} PostImg={Status1}/>
            <Feed isDark={isDark} PostImg={Status2}/>
            <Feed isDark={isDark} PostImg={Status3}/>
            <Feed isDark={isDark} PostImg={Status4}/>
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