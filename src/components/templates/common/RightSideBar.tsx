import React, { useState } from 'react'
import { useAppSelector } from '../../../redux/ReduxType'
import Request from '../../organisms/Request'
import Chats from '../../organisms/Chats'
import { BsCalendarEvent, BsSearch } from 'react-icons/bs'
import { FaBirthdayCake, FaEdit } from 'react-icons/fa'
import { MdEmail, MdMoreVert } from 'react-icons/md'
import AddImage from '../../../assets/home/dew2.jpg'
import code from '../../../assets/home/study.svg'
import work from '../../../assets/home/read.svg'


// ------images request--------
const imgSrc:string = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
// ------images request--------



const RightSideBar = () => {


    const isDark = useAppSelector((state)=>state.theme.isDark)

    const [currentFilter, setCurrentMenu] = useState('chat')


    const handleFilter = (e: React.MouseEvent<HTMLSpanElement>) => {
        const target = e.target as HTMLSpanElement;
        setCurrentMenu(target.innerText.toLowerCase());
    }
    

    return (
    <div className={`sm:mb-10 text-sm`}>
        {/* advert */}
        <div className={`${isDark ? 'bg-darkBg text-darkText' : 'bg-lightBg text-deepBg'} p-2 relative rounded-sm`}>
            <h1 className='text-lg font-semibold mb-2'>Advert</h1>
            <img src={AddImage} alt='advert'/>
            <button className='btn absolute top-1/2 left-1/3 bg-lightBg text-deepBg font-semibold px-4 py-2 rounded-full'>Explore</button>
        </div>


        {/* email box */}
        <div className={`${isDark ? 'bg-darkBg hover:bg-indigo-600 text-darkText' : 'bg-lightBg hover:bg-gray-200 text-deepBg'} cursor-pointer p-2 relative rounded-sm my-10`}>
            <div className='flex items-center justify-between'>
                <h1>Inbox</h1>
                <div className='relative'>
                    <MdEmail/>
                    <span className='text-red-500 absolute -top-2 -right-2 bg-white p-[1px] w-4 h-4 flex items-center justify-center text-xs rounded-full font-semibold'>3</span>
                </div>
            </div>
        </div>


        {/* messenger section */}
        <div className={`${isDark ? 'bg-darkBg text-darkText' : 'bg-lightBg text-deepBg'} mt-4 px-4 py-2 rounded-sm`}>
           <div className='flex items-center justify-between'>
                <h3>Message</h3>
                <FaEdit/>
           </div>
           <label className='bg-indigo-50 text-sm mt-3 px-2 py-[4px] flex items-center gap-2 w-full rounded-full'>
                <BsSearch className='text-indigo-400 text-lg w-3 h-3'/>
                <input type='text' className='grow bg-inherit outline-none font-semibold' placeholder='search'/>
            </label>

            {/* filter selection */}
            <div className='flex items-center justify-between text-sm mt-4'>
                <span onClick={(e)=>{handleFilter(e)}} className={`cursor-pointer ${currentFilter==='chats' ? 'text-blue-400' : ''} active:text-blue-300`}>Chats</span>
                <span onClick={(e)=>{handleFilter(e)}} className={`cursor-pointer ${currentFilter==='requests' ? 'text-blue-400' : ''} active:text-blue-300`}>Requests</span>
            </div>



        {/* filter results */}
            {currentFilter === 'chats' ? <div className={`mt-3`}>
                <Request isDark={isDark} name='Grace Joy' image={imgSrc}/>
                <Request isDark={isDark} name='Agokeye Seyi' image={code}/>
                <Request isDark={isDark} name='Juan Mata' image={work}/>
            </div> : <div className={`mt-3`}>
                <Chats isDark={isDark} name='Grace Joy' image={imgSrc}/>
                <Chats isDark={isDark} name='Agokeye Seyi' image={code}/>
                <Chats isDark={isDark} name='Juan Mata' image={work}/>
            </div>}
            <button className='text-blue-400 text-sm'>see more</button>
        </div>


        <div>

        </div>


        {/* events */}
        <div className={`${isDark ? 'bg-darkBg text-darkText' : 'bg-lightBg text-deepBg'} mt-4 px-4 py-2 rounded-sm`}>
            <div className='flex items-center justify-between'>
                <h3>Event</h3>
                <MdMoreVert/>
           </div>
            <hr className='w-full h-[1px] bg-white my-2'/>
            <div className='text-sm'>
                <div className='flex items-center justify-start gap-2 mb-2'>
                    <BsCalendarEvent/>
                    <p>10 new events</p>
                </div>
                <div className='flex items-center justify-start gap-2 mb-2'>
                    <BsCalendarEvent/>
                    <p>Design system colaboration</p>
                </div>
                <div className='flex items-center justify-start gap-2 mb-2'>
                    <BsCalendarEvent/>
                    <p>web 3.0 meetup</p>
                </div>
                <div className='flex items-center justify-start gap-2 mb-2'>
                    <FaBirthdayCake/>
                    <p>Wale birthday</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RightSideBar