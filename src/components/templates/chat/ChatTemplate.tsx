// ----------- version 2 ------------
import React from 'react';
import Header from '../../shared/Header';
import { useAppSelector } from '../../../redux/ReduxType';
import ChatLeftSideBar from './ChatLeftSideBar';
import ChatRightSideBar from './ChatRightSideBar';
import { useSocket, useSocketEvent } from '../../../context/socket.context';

interface IChatLayoutProps {
  children: React.ReactNode;
}

const ChatTemplate: React.FC<IChatLayoutProps> = ({ children }) => {
  const isDark = useAppSelector(state => state.theme.isDark);
  const isView = useAppSelector(state => state.viewChat.inView);
  const handleMenu = ()=>{

  }

  const { socket, isConnected } = useSocket();
  useSocketEvent('connection', (data) => {
    console.log('Received:', data);
  });
  


  return (
    <div className={`w-full h-[100vh] ${isDark ? 'bg-deepBg text-darkText' : 'bg-deepLight text-left'} overflow-hidden custom-scrollbar transition-all duration-500`}>
      <Header />
      <div className="flex items-start justify-between relative">
        <div className={`border-r-2 custom-scrollbar sm:w-1/6 w-full ${isView ? 'sm:block hidden' : 'sm:block'} sm:h-[calc(100vh-100px)] h-full py-3 px-2 overflow-auto sm:relative absolute top-0 left-0 z-10 ${isDark ? 'sm:bg-inherit bg-deepBg' : 'sm:bg-inherit bg-white'}`}>
          <ChatLeftSideBar isDark={isDark} menu={handleMenu}/>
        </div>
        <div className={`relative z-30 sm:w-3/5 w-full ${isDark ? 'text-darkText' : 'text-deepBg'} bg-gray overflow-auto h-[calc(100vh-120px)] custom-scrollbar`}>
          {children}
        </div>
        <div className={`custom-scrollbar sm:w-1/6 ${isDark ? 'text-darkText' : 'text-deepBg'} h-[calc(100vh-100px)]  px-2 overflow-auto hidden sm:block mt-3`}>
          <ChatRightSideBar isDark={isDark} menu={handleMenu}/>
        </div>
      </div>
    </div>
  );
};

export default ChatTemplate;
