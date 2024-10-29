import React from 'react'


interface IMessageText{
    Status:string,
    content:string
}

const MainMessageText:React.FC<IMessageText> = ({Status, content}) => {
  return (
    <div className="chat chat-start flex items-end w-2/4">
        <img className='w-8 h-8 rounded-full' src={Status} alt="" />
        <div className="chat-bubble">{content}</div>
    </div>
  )
}

export default MainMessageText