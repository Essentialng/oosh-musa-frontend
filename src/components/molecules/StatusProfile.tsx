import React from 'react'
import { useAppSelector } from '../../redux/ReduxType';



interface IStatusCheck{
    profilePix?: any;  // URL of the user's profile picture
    name?:string;
    status?:any;
    time?:string,
    hasUnseenStatus?: boolean
}

const StatusProfile:React.FC<IStatusCheck> = ({profilePix, name, time}) => {
  
    const isDark = useAppSelector((state)=>state.theme.isDark)
    return (
    <div className={`flex cursor-pointer text-sm py-2 px-[2px] rounded-sm items-center ${isDark ? 'hover:bg-newtral_sec hover:text-newtral_pri' : 'hover:bg-newtral_sec hover:text-newtral_pri'} justify-between mb-5 hover:bg-deepBg hover:text-white`}>
        <div className='flex items-center justify-center gap-2 '>
            <img className='h-7 w-7 rounded-full' src={profilePix} alt="profile" />
            <div className='text-xs'>
                <h3>{name}</h3>
            </div>
        </div>
        <span className='text-xs'>{time}</span>
    </div>
  )
}

export default StatusProfile