import React from 'react';
import Profile from '../../../assets/home/dog.svg'
import { BsCalendar, BsStopwatch } from 'react-icons/bs';
import { FaHome, FaTasks } from 'react-icons/fa';
import { useAppSelector } from '../../../redux/ReduxType';
import { MdWork } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { IoPlanetOutline } from 'react-icons/io5';




const PlanLeftSidebar:React.FC = () => {

  const isDark = useAppSelector((state)=>state.theme.isDark)

  const navigate = useNavigate()

  return (
    <div className='text-sm'>
      <div className='w-full border-b-2 pb-10 border-slate-500 items-center flex justify-center flex-col gap-2'>
        <img className='w-12 h-12 rounded-full' src={Profile} alt='plan'/>
        <h3>Muh'd Musa</h3>
      </div>

      {/* ---- List of actions ---- */}
      <ul>
        <li className={`${isDark ? 'hover:bg-darkBg' : 'hover:bg-white'} flex p-2 items-center justify-start gap-3 mt-4 cursor-pointer `}>
          <IoPlanetOutline/> Calender</li>
        <li className={`${isDark ? 'hover:bg-darkBg' : 'hover:bg-white'} flex p-2 items-center justify-start gap-3 mt-4 cursor-pointer `}>
          <BsCalendar/> Event</li>
        <li className={`${isDark ? 'hover:bg-darkBg' : 'hover:bg-white'} flex p-2 items-center justify-start gap-3 mt-4 cursor-pointer `}><MdWork/> Task</li>
        <li className={`${isDark ? 'hover:bg-darkBg' : 'hover:bg-white'} flex p-2 items-center justify-start gap-3 mt-4 cursor-pointer `}><BsStopwatch/>Reminder</li>
        <li onClick={()=>navigate('/')} className={`${isDark ? 'hover:bg-darkBg' : 'hover:bg-white'} flex p-2 items-center justify-start gap-3 mt-4 cursor-pointer `}><FaHome/>Home</li>
      </ul>

      {/* filter system */}
      
    </div>
  )
}

export default PlanLeftSidebar