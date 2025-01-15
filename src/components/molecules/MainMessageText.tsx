import React from 'react'
import { useAppSelector } from '../../redux/ReduxType'


interface IMessageText{
    Status:string,
    content:string,
    time: string,
    avatar?: string
}

const MainMessageText:React.FC<IMessageText> = ({Status, content, avatar, time}) => {
  
  const isDark = useAppSelector(state=>state.theme.isDark)

  return (
    <div className="chat text-xs chat-start flex items-end w-2/4">
        <img className='w-8 h-8 object-cover rounded-full' src={avatar||Status} alt="" />
        <div className={`chat-bubble ${isDark ? "bg-darkBg text-darkText" : "bg-newtral_chat text-newtral_sec"}`}>{content}</div>
        <p>{time}</p>
    </div>
  )
}

export default MainMessageText