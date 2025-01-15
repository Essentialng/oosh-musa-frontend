import React from 'react'
import { useAppSelector } from '../../redux/ReduxType'


interface IMessageText{
    Status:string,
    content:string,
    time: string,
    avatar?: string;
}

const OtherMessageText:React.FC<IMessageText> = ({Status, content, time, avatar}) => {

  const isDark = useAppSelector(state=>state.theme.isDark)

  return (
    <div className="chat text-xs chat-end flex items-end flex-row-reverse w-full ">
        <img className='w-8 h-8 object-cover rounded-full' src={avatar||Status} alt="" />
        <div className={`chat-bubble ${isDark ? "bg-darkBg text-darkText" : "bg-newtral_chat text-newtral_sec"}`}>{content}</div>
        <p>{time}</p>
    </div>
  )
}

export default OtherMessageText