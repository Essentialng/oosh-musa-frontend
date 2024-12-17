import React from 'react'
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa'
import ProfileIMG from '../../assets/others/avatar.jpeg'


interface IComment{
    id: number,
    name: string,
    imgSrc: string,
    timestamp: string,
    content: string,
    isDark:boolean
  
}



const Comment:React.FC<IComment> = ({name, imgSrc, timestamp, content, isDark}) => {
  return (
    <div className={`flex p-2 text-sm rounded-md items-start justify-start gap-3 ${isDark ? 'bg-deepBg text-lightText' : 'bg-deepLight text-deepBg'} mb-3`}>
        <img className='w-6 h-6 rounded-full' src={imgSrc || ProfileIMG} alt="profile" />
        <div>
            <h3>{name}</h3>
            <span className='text-gray-500'>{timestamp}</span>
            <p>
                {content}
            </p>
            <div className='flex items-start justify-start gap-5'>
                <div className='flex items-center justify-start gap-2'>
                    4 <FaThumbsUp className='text-green-400 cursor-pointer hover:scale-125'/>
                </div>
                <div className='flex items-center justify-start gap-2'>
                    1 <FaThumbsDown className='text-red-400 cursor-pointer hover:scale-125'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Comment