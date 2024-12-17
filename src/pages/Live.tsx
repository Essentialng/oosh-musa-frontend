import React, { useEffect } from 'react'
import Event1 from '../assets/home/dew2.jpg'
import { BsSearch } from 'react-icons/bs'
import Event2 from '../assets/news/news1.jpg'
import Event3 from '../assets/news/news2.jpg'
import profile from '../assets/news/news3.jpg'
import Event from '../components/organisms/Event'
import { useAppSelector } from '../redux/ReduxType'




interface ILive{
  
}

const Live:React.FC<ILive> = () => {

  const [counter, setCounter] = React.useState(60);
  const isDark = useAppSelector((state)=>state.theme.isDark)

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prevCounter) => (prevCounter > 0 ? prevCounter - 1 : 60));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`rounded-lg my-2 ${isDark ? 'bg-deepBg text-white' : 'bg-deepLight text-gray-800'} p-5 custom-scrollbar`}>
      <div className='w-full h-auto relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-b after:from-transparent after:to-black'>
          <img className='h-full object-cover' src={Event1} alt="politics" />
          <div className='text-white z-30 absolute bottom-10 left-10'>
            <h1 className='text-[6rem] font-semibold'>
              Events 
            </h1>
            <h2 className='text-xl'>Live event across the globe</h2>
          </div>

        </div>

          {/* list of events */}
          <div className='mt-10'>
            <div className='w-full flex items-center justify-center gap-10'>
            <label className="input input-bordered flex items-center gap-2 w-2/3">
            <BsSearch/>
            <input type="text" className={`grow ${isDark ? 'text-deepBg' : ''}`} placeholder="Search" />
          </label>
          <select className={`select w-1/3 max-w-xs ${isDark ? 'text-deepBg' : 'bg-gray-200'}`}>
          <option disabled selected>Category</option>
          <option>Live</option>
          <option>Upcoming</option>
        </select>
            </div>
          </div>



        {/* Event list */}
        <div className='mt-10'>
          <Event isLive={true} isDark={isDark} EventImg={Event1} time='Sat 4th dec 2024' authorImg={profile} authorName='Galapagous' title='How to use react native with typescript' counter={counter}/>
          <Event isLive={false} isDark={isDark} EventImg={Event2} time='Sat 4th dec 2024' authorImg={profile} authorName='Galapagous' title='How to use react native with typescript' counter={counter}/>
          <Event isLive={true} isDark={isDark} EventImg={Event3} time='Sat 4th dec 2024' authorImg={profile} authorName='Galapagous' title='How to use react native with typescript' counter={counter}/>
      </div>
    </div>
  )
}

export default Live
