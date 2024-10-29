import React from 'react'

interface IEvent {
    EventImg: string;
    authorImg: string;
    title: string;
    time: string;
    authorName: string;
    isDark: boolean;
    isLive: boolean;
    counter: number;
}

const Event: React.FC<IEvent> = ({EventImg, isLive, authorImg, title, time, authorName, isDark, counter}) => {
  return (
    <div className={`w-full relative ${isDark ? 'bg-darkBg' : 'bg-white'} flex items-start justify-between mb-5 p-4 rounded-sm`}>
      <div className='sm:flex sm:items-start sm:justify-start sm:gap-2'>
        <span className='text-xs w-14'>{time}</span>
        <img className='sm:w-[200px] w-full sm:h-[150px] h-[200px] object-cover' src={EventImg} alt="sample event" />
        <div >
          <h1 className='w-2/3 text-lg font-semibold'>{title}</h1>
          <div className='flex items-center justify-start gap-2'>
            <img className='w-6 h-6 rounded-full object-cover' src={authorImg} alt='profile'/>
            <span className={`text-xs ${isDark ? 'text-gray-100' : 'text-gray-500'}`}>By {authorName}</span>
          </div>


          {/* counter */}
          {!isLive ? <div className={`grid grid-flow-col gap-5 ${isDark ? 'text-gray-100' : 'text-gray-500'} text-center auto-cols-max`}>
            <div className="flex flex-col">
              <span className="countdown font-mono text-5xl">
                <span style={{"--value":15} as React.CSSProperties}></span>
              </span>
              days
            </div>
            <div className="flex flex-col">
              <span className="countdown font-mono text-5xl">
                <span style={{"--value":10} as React.CSSProperties}></span>
              </span>
              hours
            </div>
            <div className="flex flex-col">
              <span className="countdown font-mono text-5xl">
                <span style={{"--value":24} as React.CSSProperties}></span>
              </span>
              min
            </div>
            <div className="flex flex-col">
              <span className="countdown font-mono text-5xl">
                <span style={{"--value":counter} as React.CSSProperties}></span>
              </span>
              sec
            </div>
          </div> : ''}
        </div>
      </div>
      {isLive ? 
        <button className='p-2 font-semibold px-4 py-[3px] bg-red-400 text-white text-sm rounded-sm'>Join</button> : 
        <button className='p-2 font-semibold px-4 py-[3px] bg-gray-400 text-white text-sm rounded-sm'>upcoming</button>
      }
    </div>
  )
}

export default Event