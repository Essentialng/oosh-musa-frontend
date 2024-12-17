import React, { MouseEventHandler } from 'react'

interface IReaction {
    title: string,
    value: string,
    logo: React.ReactNode,
    isDark?: boolean
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const Reaction: React.FC<IReaction> = ({ title, value, logo, isDark, onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className={`flex items-center gap-1 cursor-pointer px-4 py-2 ${isDark ? 'hover:bg-deepBg' : 'hover:bg-gray-100'} p-3`}
    >
        {value}
        <span>{title}</span>
        {logo}
    </button>
  )
}

export default Reaction