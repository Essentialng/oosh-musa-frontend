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
  isOnline?: boolean;
  data: any;
}

const ChatProfile:React.FC<IChatUserProfile> = ({name, lastMessage, lastMessageTime, lastMessageRead, isTyping, unreadMessages, profileImage, isOnline, data}) => {
 
  const isDark = useAppSelector((state)=>state.theme.isDark)
  // const user = useAppSelector((state)=>state)
  // const isDark = true

  const dispatch  = useAppDispatch()
  // console.log('curr-->', user)

  const handleSelection = async()=>{
    dispatch(openView())
    // fetch user conversations
    // const payload = {
    //   userId: user._id,
    //   participantId: data._id
    // }
    // console.log('pay-->', payload)
    // console.log('data-->', data)
    // await fetchData({
    //       url: `${CONVERSATION_URL}/conversations`,
    //       method: 'POST',
    //       payload,
    //       onSuccess: (data)=>{
    //         console.log('Response data-->', data.data[0])
    //         // dispatch conversation
    //         dispatch(setConversation(data?.data[0]))
    //       },
    //       onFailure: (error:any)=>{
    //         toast.error('erro fetching data')
    //         console.log(error)
    //       },
    //   })
    // fetch user messages
  }


  return (
    <div onClick={()=>{handleSelection()}} className={`flex cursor-pointer px-2 py-[3px] items-center ${isDark ? 'hover:bg-deepLight hover:text-deepBg' : 'hover:bg-newtral_sec hover:text-newtral_pri'} justify-between mb-5 rounded-sm`}>
        {/* left */}
        <div className='flex items-center justify-start gap-3'>
            <img className='w-8 h-8 rounded-full' src={profileImage} alt="user" />
            <div>
                <h3 className='text-xs'>{name?.length > 6 ? name.split(' ')[0].slice(0, 6) +'...' : name}</h3>
                <p className='text-xs text-gray-400'>
                  {isTyping ? (
                    <span className='text-green-600'>is typing</span>
                  ) : (
                    lastMessage && lastMessage?.length > 10 ? lastMessage.slice(0, 10) + '...' : lastMessage
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