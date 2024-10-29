import React from 'react'
import { MdCancel } from 'react-icons/md'
import {IoMdCheckmark} from 'react-icons/io'


interface IRequestProps{
  name:string,
  image:string,
  isDark:boolean
}

const Chats:React.FC<IRequestProps> = ({name, image, isDark}) => {
return (
  <div className={`flex items-center justify-between gap-4 w-full p-2 rounded-full mb-2 text-xs`}>
      <div className='flex items-center justify-between gap-2'>
        <img className='w-6 h-6 object-cover rounded-full cursor-pointer' src={image} alt='group one'/>
        <p className='text-sm font-semibold'>{name}</p>
      </div>
      <div className='flex items-center justify-between gap-2 cursor-pointer '>
        <button className='text-green-500 hover:scale-110 hover:text-green-300'><IoMdCheckmark/></button>
        <button className='text-red-500 hover:scale-110 hover:text-red-300'><MdCancel/></button>
      </div>
  </div>
)
}

export default Chats