import React, { useEffect, useState } from 'react'
import profile from '../../assets/news/news3.jpg'
import Event1 from '../../assets/live/live.jpeg'
import { useAppSelector } from '../../redux/ReduxType'
import { Link } from 'react-router-dom'

interface IEvent {
    eventData:any,
    isDark: boolean
}


const Event: React.FC<IEvent> = ({eventData,isDark}) => {
  
const [counter, setCounter] = useState(60)
const User = useAppSelector(state=>state?.user)
const [timeMargin, setTimeMargin] = useState<{days:string, hours: string, minutes: string, seconds: string}>({
  days:'', hours:'', minutes:'', seconds:''
})

const startDate: any = new Date(`${eventData?.startDate}T${eventData?.startTime}`);
const dayDifference = startDate - Date.now();

useEffect(() => {
  console.log(eventData?.hasStarted, dayDifference)
  if (eventData?.hasStarted || dayDifference <= 0) return;
  
  const getEventTimeDifference = () => {
    const difference = startDate - Date.now();
    console.log('diff -->', difference)
    // Convert to days, hours, minutes, and seconds
    const days:string = String(Math.floor(difference / (1000 * 60 * 60 * 24)));
    const hours:string = String(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const minutes = String(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = String(Math.floor((difference % (1000 * 60)) / 1000));
    console.log('days -->', days, 'hours -->', hours, 'min -->', minutes, 'sec -->', seconds)

    setTimeMargin({
      days,
      hours,
      minutes,
      seconds
    });
  };

  // Initial call to set the time immediately
  getEventTimeDifference();

  const timer = setInterval(getEventTimeDifference, 1000);

  return () => clearInterval(timer);
}, []);


  return (
    <div className={`w-full relative ${isDark ? 'bg-darkBg' : 'bg-white'} flex items-start justify-between mb-5 p-4 rounded-sm`}>
      <div className='sm:flex sm:items-start sm:justify-start sm:gap-2'>
        <span className='text-xs w-14'>{eventData?.time}</span>
        <img className='sm:w-[200px] w-full sm:h-[150px] h-[200px] object-cover' src={eventData?.eventImage || Event1} alt="sample event" />
        <div >
          <h1 className='w-2/3 text-lg font-semibold'>{eventData?.title}</h1>
          <div className='flex items-center justify-start gap-2'>
            <img className='w-6 h-6 rounded-full object-cover' src={eventData?.author?.avatar || profile} alt='profile'/>
            <span className={`text-xs ${isDark ? 'text-gray-100' : 'text-gray-500'}`}>By {eventData?.author?.fullname}</span>
          </div>


          {/* counter */}
          {!eventData?.hasStarted && dayDifference >= 0 ? <div className={`grid grid-flow-col gap-5 ${isDark ? 'text-gray-100' : 'text-gray-500'} text-center auto-cols-max`}>
            <div className="flex flex-col">
              <span className="countdown font-mono text-5xl">
                <span style={{"--value":timeMargin?.days} as React.CSSProperties}></span>
              </span>
              days
            </div>
            <div className="flex flex-col">
              <span className="countdown font-mono text-5xl">
                <span style={{"--value":timeMargin?.hours} as React.CSSProperties}></span>
              </span>
              hours
            </div>
            <div className="flex flex-col">
              <span className="countdown font-mono text-5xl">
                <span style={{"--value":timeMargin?.minutes} as React.CSSProperties}></span>
              </span>
              min
            </div>
            <div className="flex flex-col">
              <span className="countdown font-mono text-5xl">
                <span style={{"--value":timeMargin?.seconds} as React.CSSProperties}></span>
              </span>
              sec
            </div>
          </div> : ''}
        </div>
      </div>
      {
        eventData?.author?._id !== User?._id &&
        eventData?.hasStarted ? 
          <Link to={`/live/${eventData?._id}/${eventData?.author?._id}`} className='p-2 ml-2 font-semibold px-4 py-[3px] bg-red-400 text-white text-sm rounded-sm'>Join</Link> :
          null
      }
      {eventData?.author?._id === User?._id ?
      <Link to={`/live/${eventData?._id}/${eventData?.author?._id}`} className='p-2 ml-2 font-semibold px-4 py-[3px] bg-red-400 text-white text-sm rounded-sm'>start</Link>
      :
      null
    }
    </div>
  )
}

export default Event