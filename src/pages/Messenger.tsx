import React from 'react'
import { BsSend} from 'react-icons/bs'
import { MdAttachFile } from 'react-icons/md'



// image imports
import Status1 from '../assets/home/dew.jpg'
import Status2 from '../assets/home/dew2.jpg'
import { FaMicrophone, FaVideo } from 'react-icons/fa'
import MainMessageText from '../components/molecules/MainMessageText'
import OtherMessageText from '../components/molecules/OtherMessageText'
import { IoCall, IoChevronBack } from 'react-icons/io5'
import { sampleChat } from '../assets/data/chat'
import { closeView} from '../redux/slice/chatView'
import { useAppDispatch, useAppSelector } from '../redux/ReduxType'



interface IMessengerProps{
}




const Messenger:React.FC<IMessengerProps> = () => {

    const dispatch  = useAppDispatch()
    const isDark = useAppSelector((state)=>state.toggleTheme.isDark)
    const handleChatNav = ()=>{
      dispatch(closeView())
    }



  return (
    <div className="w-full">
       {/* top label */}
       <div className={`w-full sticky z-40 top-[2px] left-0 p-2 flex items-start justify-between ${isDark ? 'bg-darkBg transition-all duration-500 text-darkText' : 'bg-lightBg text-left'}`}>
        <div className='flex items-start justify-center gap-2'>
          <IoChevronBack onClick={()=>{handleChatNav()}} className='sm:hidden cursor-pointer'/>
          <img className='w-6 h-6 rounded-full' src={Status1} alt="status profile" />
          <div className='text-xs'>
            <h3>Muhammed Musa</h3>
            <p className={`${isDark ? 'text-white' : ''} text-gray-500 mt-2`}>last seen 2h ago</p>
          </div>
        </div>
        
        {/* right */}
        <div className='flex items-center justify-end gap-5'>
          <IoCall className={`${isDark ? 'text-white' : ''} text-gray-500 text-sm cursor-pointer`}/>
          <FaVideo className={`${isDark ? 'text-white' : ''} text-gray-500 text-sm cursor-pointer`}/>
        </div>
       </div>



       {/* chat section */}
       <div className={`text-xs z-40 py-5`}>
        {sampleChat.map((eachChat:any, index:number) => (
            eachChat.senderId === 1 ? 
              <MainMessageText key={index} Status={Status1} content={eachChat.text} /> 
            : 
              <OtherMessageText key={index} Status={Status2} content={eachChat.text} />
          ))}


          <div className={`w-full sticky bottom-5 z-40 left-0 flex items-center ${isDark ? 'bg-darkBg transition-all duration-500 text-darkText' : 'bg-lightBg text-left'} p-2 justify-between`}>
            <input className='w-full px-2 outline-none text-black py-3 rounded-full' type="text" placeholder='Text'/>
            <div className='flex items-end justify-center gap-3'>
              <MdAttachFile className='w-4 h-4 cursor-pointer'/>
              <FaMicrophone className='w-4 h-4 cursor-pointer'/>
              <BsSend className='w-4 h-4 cursor-pointer'/>
            </div>
          </div>
       </div>
    </div>
  )
}

export default Messenger