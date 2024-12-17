import React from 'react'
import { BsCheck2Square } from 'react-icons/bs';
import { openView } from '../../redux/slice/chatView';
import { useAppDispatch, useAppSelector } from '../../redux/ReduxType';


interface IChatUserProfile{
  name:string;
  lastMessage?:string;
  isTyping?:boolean;
  unreadMessages?:number;
  lastMessageTime?:string;
  lastMessageRead?:boolean;
  profileImage?:any;
}

const ChatProfile:React.FC<IChatUserProfile> = ({name, lastMessage, lastMessageTime, lastMessageRead, isTyping, unreadMessages, profileImage}) => {
 
  const isDark = useAppSelector((state)=>state.theme.isDark)
  // const isDark = true
  const dispatch  = useAppDispatch()


  const handleSelection = ()=>{
    dispatch(openView())
  }


  return (
    <div onClick={()=>{handleSelection()}} className={`flex cursor-pointer px-2 py-[3px] items-center ${isDark ? 'hover:bg-darkBg hover:text-white' : 'hover:bg-deepLight sm:hover:bg-white'} justify-between mb-5`}>
        {/* left */}
        <div className='flex items-center justify-start gap-3'>
            <img className='w-6 h-6 rounded-full' src={profileImage} alt="user" />
            <div>
                <h3 className='text-xs'>{name.length > 6 ? name.split(' ')[0].slice(0, 6) +'...' : name}</h3>
                <p className='text-xs text-gray-400'>
                  {isTyping ? (
                    <span className='text-green-600'>is typing</span>
                  ) : (
                    lastMessage && lastMessage.length > 10 ? lastMessage.slice(0, 10) + '...' : lastMessage
                  )}
                </p>
            </div>
        </div>
        {/* right */}
        <div className='text-xs text-end'>
          <p className='text-gray-500'>{lastMessageTime || ' '}</p>
          {lastMessageRead ? <BsCheck2Square/> : unreadMessages ? <p className='text-red-500'>{unreadMessages}</p> : ''}
        </div>
    </div>
  )
}

export default ChatProfile