import React from 'react'
import Header from '../../shared/Header'
import { useAppSelector } from '../../../redux/ReduxType'
import ChatLeftSideBar from './ChatLeftSideBar'
import ChatRightSideBar from './ChatRightSideBar';



interface IChatLayoutProps {
  children: React.ReactNode;
}


const ChatTemplate:React.FC<IChatLayoutProps> = ({children}) => {


  const isDark = useAppSelector(state=>state.toggleTheme.isDark)
  const isView = useAppSelector((state)=>state.viewChat.inView)
  const handleMenu = ()=>{

  }



  return (
    <div className={`w-[100%] h-[100vh] ${isDark ? 'bg-deepBg transition-all duration-500 text-darkText' : 'bg-deepLight text-left'} overflow-hidden custom-scrollbar`}>
        <Header/>
        <div className={`flex items-start justify-between relative`}>
            <div className={`border-r-2 custom-scrollbar sm:w-1/6 w-full ${isView ? 'sm:block hidden' : 'sm:block'} sm:h-[calc(100vh-100px)] h-[100%] py-3 px-2 overflow-auto sm:relative absolute top-0 left-0 z-50 sm:block ${isDark ? 'sm:bg-inherit bg-deepBg' : 'sm:bg-inherit bg-white'}`}>
                <ChatLeftSideBar isDark={isDark} menu={handleMenu}/>
            </div>
            <div className={`relative z-30 sm:w-3/5 w-full ${isDark ? 'text-darkText' : 'text-deepBg'} bg-gray overflow-auto h-[calc(100vh-120px)] custom-scrollbar`}>
                {
                    children
                }
            </div>
            <div className={`custom-scrollbar sm:w-1/6 ${isDark ? 'text-darkText' : ' text-deepBg'} h-[calc(100vh-100px)] py-5 px-2 overflow-auto hidden sm:block`}>
                <ChatRightSideBar isDark={isDark} menu={handleMenu}/>
            </div>
        </div>
    </div>
  )
}

export default ChatTemplate