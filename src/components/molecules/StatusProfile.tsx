import React from 'react'
import { useAppSelector } from '../../redux/ReduxType';



interface IStatusCheck{
    profilePix?: any;  // URL of the user's profile picture
    name?:string;
    status?:any;
    time?:string,
}

const StatusProfile:React.FC<IStatusCheck> = ({profilePix, name, time}) => {
  
    const isDark = useAppSelector((state)=>state.toggleTheme.isDark)
  
    return (
    <div className={`flex cursor-pointer text-sm p-2 items-center ${isDark ? 'hover:bg-darkBg hover:text-white' : 'hover:bg-white'} justify-between mb-5`}>
        <div className='flex items-start justify-start gap-2 '>
            <img className='h-7 w-7 rounded-full' src={profilePix} alt="profile" />
            <div className=''>
                <h3>{name}</h3>
            </div>
        </div>
        <span className='text-xs'>{time}</span>
    </div>
  )
}

export default StatusProfile