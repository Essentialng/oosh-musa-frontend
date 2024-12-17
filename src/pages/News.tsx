import React from 'react'
import Politics from '../assets/home/dew2.jpg'
import SampleNews from '../assets/news/news1.jpg'
import SampleNews2 from '../assets/news/news2.jpg'
import SampleNews3 from '../assets/news/news3.jpg'
import SampleNews4 from '../assets/news/news1.jpg'
import SampleNews5 from '../assets/news/news2.jpg'
import NewsCol from '../components/organisms/news/NewsCol'
import { FaGreaterThan, FaLessThan } from 'react-icons/fa'
import NewsDeep from '../components/organisms/news/NewsDeep'
import NewsLatest from '../components/organisms/news/NewsLatest'
import { useAppSelector } from '../redux/ReduxType'



interface INews{
   
}

const News:React.FC<INews> = () => {



  let handleSelection:any;
  const isDark = useAppSelector((state)=>state.theme.isDark)


  return (
    <div className={`rounded-lg my-2 ${isDark ? 'text-darkText' : ' text-deepBg'} custom-scrollbar`}>
      <div className='sm:flex sm:items-start sm:justify-center gap-5'>
        <div className='sm:w-2/3 w-full h-[400px] relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-b after:from-transparent after:to-black'>
          <img className='h-full object-cover' src={Politics} alt="politics" />
          <div className='text-white z-30 absolute bottom-10 left-10'>
            <h2 className='text-sm'>Technology / Sept 2024</h2>
            <h1 className='text-3xl font-semibold'>
              Election scan result loom 
            </h1>
            <p className='sm'>
              The world health organization attention have been drawn to the recent trend of election scam across various democratic country around the world...
            </p>
          </div>
        </div>



        {/* left side panel */}
        <div className='sm:w-1/3 w-full overflow-hidden sm:mt-0 mt-5'>
        {/* category selection */}
          <div className='flex items-center sm:justify-between justify-center gap-2 text-sm'>
            <span onClick={()=>{handleSelection('trend')}} className={`${isDark ? 'bg-darkBg hover:bg-indigo-400' : 'bg-white text-deepBg hover:text-gray-400'} px-3 py-[4px] cursor-pointer`}>Trendy</span>
            <span onClick={()=>{handleSelection('latest')}} className={`${isDark ? 'bg-darkBg hover:bg-indigo-400' : 'bg-white text-deepBg hover:text-gray-400'} px-3 py-[4px] cursor-pointer`}>Latest</span>
            <span onClick={()=>{handleSelection('popular')}} className={`${isDark ? 'bg-darkBg hover:bg-indigo-400' : 'bg-white text-deepBg hover:text-gray-400'} px-3 py-[4px] cursor-pointer`}>Popular</span>
          </div>

          {/* list of news */}
          <div className='mt-5'>
            <NewsCol newsImage={SampleNews} isDark={isDark} date='March 1 2024' details='Environmental inportance of seashells' category='Technology'/>
            <NewsCol newsImage={SampleNews2} isDark={isDark} date='March 1 2024' details='Environmental inportance of seashells' category='Technology'/>
            <NewsCol newsImage={SampleNews3} isDark={isDark} date='March 1 2024' details='Environmental inportance of seashells' category='Technology'/>
            <NewsCol newsImage={SampleNews4} isDark={isDark} date='March 1 2024' details='Environmental inportance of seashells' category='Technology'/>
            <NewsCol newsImage={SampleNews5} isDark={isDark} date='March 1 2024' details='Environmental inportance of seashells' category='Technology'/>
          </div>
        </div>
      </div>

      {/* featured */}
      <div className={`w-full mt-4 block`}>
        <div className='w-full flex items-center justify-between py-10'>
          <h2 className='text-2xl'>Featured</h2>
          <div className='flex gap-2'>
            <button className='px-5 py-2 bg-gray-200 rounded-sm text-gray-600'><FaLessThan/></button>
            <button className='px-5 py-2 bg-gray-200 rounded-sm text-gray-600'><FaGreaterThan/></button>
          </div>
        </div>

        <div className='w-[full] h-[100px] flex items-center mt-4 gap-2'>
        <NewsDeep title='Seashell and our environment' small={true} newsImage={SampleNews5} isDark={isDark} date='March 1 2024' details='Environmental inportance of seashells' category='Technology'/>
        <NewsDeep title='Seashell and our environment' small={true} newsImage={SampleNews2} isDark={isDark} date='March 1 2024' details='Environmental inportance of seashells' category='Technology'/>
        <NewsDeep title='Seashell and our environment' small={true} newsImage={SampleNews3} isDark={isDark} date='March 1 2024' details='Environmental inportance of seashells' category='Technology'/>
        </div>
      </div>



      {/* latest news */}
      <div className={`w-full mt-20 h-auto block`}>
        <div className='w-full flex items-center justify-between mb-[4px]'>
          <h2 className='text-2xl'>Latest</h2>
          <div className='flex gap-2'>
            <button className='px-5 py-2 bg-gray-200 rounded-sm text-gray-600'><FaLessThan/></button>
            <button className='px-5 py-2 bg-gray-200 rounded-sm text-gray-600'><FaGreaterThan/></button>
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <NewsLatest title='Seashell and our environment' newsImage={SampleNews3} isDark={isDark} date='March 1 2024' details='Environmental inportance of seashells' category='Technology'/>
          <NewsLatest title='Seashell and our environment' newsImage={SampleNews4} isDark={isDark} date='March 1 2024' details='Environmental inportance of seashells' category='Technology'/>
          <NewsLatest title='Seashell and our environment' newsImage={SampleNews5} isDark={isDark} date='March 1 2024' details='Environmental inportance of seashells' category='Technology'/>
        </div>
      </div>



      {/* others */}
      <div className='mt-10'>
      <hr className={`w-full h-[2px] ${isDark ? 'bg-darkBg' : 'bg-black'}`}/>
      </div>

      {/* other list */}
      <div className='flex flex-wrap mt-4 '>
        <NewsCol newsImage={SampleNews} small={true} isDark={isDark} date='March 1 2024' details='Environmental inportance of seashells' category='Technology'/>
        <NewsCol newsImage={SampleNews5} small={true} isDark={isDark} date='March 1 2024' details='Environmental inportance of seashells' category='Technology'/>
        <NewsCol newsImage={SampleNews4} small={true} isDark={isDark} date='March 1 2024' details='Environmental inportance of seashells' category='Technology'/>
        <NewsCol newsImage={SampleNews3} small={true} isDark={isDark} date='March 1 2024' details='Environmental inportance of seashells' category='Technology'/>

      </div>
    </div>
  )
}

export default News