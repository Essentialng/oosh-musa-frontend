import React from 'react'
import Header from '../../shared/Header'

interface ILiveLayoutTemplate{
  children: React.ReactNode;
}

const LiveTemplate: React.FC<ILiveLayoutTemplate> = ({children}) => {
  return (
    <div>
      <Header/>
      <div className='h-[450px] pb-2'>
        {children}
      </div>
    </div>
  )
}

export default LiveTemplate