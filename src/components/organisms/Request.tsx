import React from 'react'

interface IRequestProps{
    name:string,
    image:string,
    isDark:boolean
}

const Request:React.FC<IRequestProps> = ({name, image, isDark}) => {
  return (
    <div className={`flex items-center justify-start gap-4 text-sm cursor-pointer w-full ${isDark ? 'hover:bg-gray-200 hover:text-deepBg' : 'hover:bg-gray-200 hover:text-deepBg'} p-2 rounded-full mb-2`}>
        <img className='w-6 h-6 object-cover rounded-full' src={image} alt='group one'/>
        <p className='text-sm font-semibold'>{name}</p>
    </div>
  )
}

export default Request