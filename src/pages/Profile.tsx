import React, { useRef } from 'react'
import Background from '../assets/home/dew.jpg'
import Profile from '../assets/home/dog.svg'
import { FaChevronLeft, FaChevronRight, FaHashtag } from 'react-icons/fa'
// import { MdAdd } from 'react-icons/md'

// -----status--------
import Status1 from '../assets/home/game.svg'
import Status2 from '../assets/home/dog.svg'
import Status3 from '../assets/home/lantern.svg'
import Status4 from '../assets/home/game.svg'
import Status5 from '../assets/home/lantern.svg'
import Status6 from '../assets/home/map.svg'
import Status7 from '../assets/home/tower.svg'
import Feed from '../components/organisms/Feed'
import { MdCreate, MdGpsFixed, MdImage, MdVideocam } from 'react-icons/md'
import { useAppSelector } from '../redux/ReduxType'
// -----status--------


const imgSrc:string = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"

interface IProfile{
    
}


const Proflle:React.FC<IProfile> = () => {
    
    const isDark = useAppSelector((state)=>state.toggleTheme.isDark)
    const scrollContainerRef = useRef<HTMLDivElement>(null);



    // scroll functionality logic
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };


    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };



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
                        <button className={`text-sm px-4 py-[1px] rounded-full ${isDark ? 'bg-lightBg text-deepBg' : 'bg-deepBg text-lightText'}`}>update</button>
                    </div>
                </div>
            </div>
        </section>



    {/* profile */}
    <section className={`mt-20 overflow-auto rounded-lg text-sm ${isDark ? 'bg-darkBg text-darkText' : 'bg-lightBg text-deepBg'} p-5 mt-10`}>
            <form className='flex items-center justify-center gap-3'>
                <img className='w-10 h-10 object-cover rounded-full' src={imgSrc} alt="" />
                <label className='p-3 bg-indigo-50 text-deepBg flex items-center gap-2 w-full rounded-full'>
                    <input type='text' className='grow border-none outline-none bg-inherit' placeholder="what's on your mind?"/>
                    <MdCreate className='text-indigo-400 text-lg'/>
                </label>
                <button className={`px-4 py-3 ${isDark ? 'bg-deepBg' : 'bg-deepLight'} rounded-full text-xs min-w-[100px]`}>
                    Share Post
                </button>
            </form>
            <div className='mt-4'>
            <div className={`px-5 w-full flex items-center justify-start gap-10`}>
                  <div className='flex items-center gap-2 cursor-pointer hover:bg-gray-100 hover:text-gray-600 px-2 py-[2px] rounded-full'>
                      <MdImage className='text-blue-600 w-4 h-4'/>
                      Image/Video
                  </div>
                  <div className='flex items-center gap-2 cursor-pointer hover:bg-gray-100 hover:text-gray-600 px-2 py-[2px] rounded-full'>
                      <MdVideocam className='text-red-600 w-4 h-4'/>
                      Live
                  </div>
                  <div className='flex items-center gap-2 cursor-pointer hover:bg-gray-100 hover:text-gray-600 px-2 py-[2px] rounded-full'>
                      <FaHashtag className='text-cyan-600 w-4 h-4'/>
                      Hashtag
                  </div>
                  <div className='flex items-center gap-2 cursor-pointer hover:bg-gray-100 hover:text-gray-600 px-2 py-[2px] rounded-full'>
                      <MdGpsFixed className='text-indigo-600 w-4 h-4'/>
                      Mention
                  </div>
              </div>
            </div>
        </section>



    {/* status */}
    <section ref={scrollContainerRef} className={`mt-20 relative p-4 w-full carousel bg-transparent ${isDark? 'bg-deepBg':'bg-lightBg'} rounded-box space-x-4`}>
            {/* toggle button */}
            <button onClick={scrollLeft} className="sticky top-1/3 -left-4 z-10 p-2 btn btn-circle">
                <FaChevronLeft />
            </button>


            {/* status section */}
            <div className='w-[120px] h-[160px] carousel-item'>
                <img className='w-full h-full object-cover rounded-lg' src={Status1} alt="" />
                <p className='absolute bottom-0 text-center text-xs font-semibold'>Musa</p>
            </div>
            <div className='w-[120px] h-[160px] carousel-item'>
                <img className='w-full h-full object-cover rounded-lg' src={Status2} alt="" />
                <p className='absolute bottom-0 text-center text-xs font-semibold'>Galapagous</p>
            </div>
            <div className='w-[120px] h-[160px] carousel-item'>
                <img className='w-full h-full object-cover rounded-lg' src={Status3} alt="" />
                <p className='absolute bottom-0 text-center text-xs font-semibold'>Waqas</p>
            </div>
            <div className='w-[120px] h-[160px] carousel-item'>
                <img className='w-full h-full object-cover rounded-lg' src={Status4} alt="" />
                <p className='absolute bottom-0 text-center text-xs font-semibold'>Muze</p>
            </div>
            <div className='w-[120px] h-[160px] carousel-item'>
                <img className='w-full h-full object-cover rounded-lg' src={Status5} alt="" />
                <p className='absolute bottom-0 text-center text-xs font-semibold'>Dare</p>
            </div>
            <div className='w-[120px] h-[160px] carousel-item'>
                <img className='w-full h-full object-cover rounded-lg' src={Status6} alt="" />
                <p className='absolute bottom-0 text-center text-xs font-semibold'>Folawiyo</p>
            </div>
            <div className='w-[120px] h-[160px] carousel-item'>
                <img className='w-full h-full object-cover rounded-lg' src={Status7} alt="" />
                <p className='absolute bottom-0 text-center text-xs font-semibold'>Gbosko</p>
            </div>

            {/* toggle button */}
            <button onClick={scrollRight} className="sticky right-0 top-1/3 z-10 p-2 btn btn-circle">
                <FaChevronRight />
            </button>
        </section>


        {/* posts */}
        <section className='mt-20 text-sm'>
            <div>
                <button>Photo</button>
                <button>Photo</button>
            </div>
            <Feed isDark={isDark} PostImg={Status1}/>
            <Feed isDark={isDark} PostImg={Status2}/>
            <Feed isDark={isDark} PostImg={Status3}/>
            <Feed isDark={isDark} PostImg={Status4}/>
        </section>
    </div>
  )
}

export default Proflle