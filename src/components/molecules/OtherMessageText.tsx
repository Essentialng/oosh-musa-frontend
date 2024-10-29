import React from 'react'


interface IMessageText{
    Status:string,
    content:string
}

const OtherMessageText:React.FC<IMessageText> = ({Status, content}) => {
  return (
    <div className="chat chat-end flex items-end flex-row-reverse w-full ">
        <img className='w-8 h-8 rounded-full' src={Status} alt="" />
        <div className="chat-bubble">{content}</div>
    </div>
  )
}

export default OtherMessageText