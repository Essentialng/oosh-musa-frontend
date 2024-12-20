
// import React, { useState } from 'react'
// import { BsPeople } from 'react-icons/bs'
// import { FaUserCheck } from 'react-icons/fa'
// import { IoMail } from 'react-icons/io5'
// import LeftNavLink from '../../molecules/LeftNavLink'
// import ChatProfile from '../../molecules/ChatProfile'
// import DPImage from '../../../assets/home/dew.jpg'
// import group from '../../../assets/home/dog.svg'




// interface IChatLeftSideProps{
//     isDark:boolean,
//     menu:any
// }

// const ChatLeftSideBar:React.FC<IChatLeftSideProps> = () => {


//     const [selectedOption, setSelection] = useState('chat')
//     const handleSelction = (selection:string)=>{
//         setSelection(selection)
//     }



//   return (
//     <div className={``}>
//         {/* selection options */}
//         <div className='flex items-center justify-evenly my-5'>
//             <LeftNavLink label='chat' handleSelection={handleSelction} Icon={<IoMail className={`${selectedOption === 'chat' ? 'text-darkBg' : ''}`}/>} value='3'/>
//             <LeftNavLink label='user' handleSelection={handleSelction} Icon={<FaUserCheck className={`${selectedOption === 'user' ? 'text-darkBg' : ''}`}/>} value='10'/>
//             <LeftNavLink label='group' handleSelection={handleSelction} Icon={<BsPeople className={`${selectedOption === 'group' ? 'text-darkBg' : ''}`}/>} value='20'/>
//         </div>

//         {/* search functionality */}
//         <div className='border-b-2'>
//         <input className='px-2 mb-2 py-[3px] rounded-sm outline-none text-black' type="text" placeholder='Search'/>
//         </div>

//         {/* friend list */}
//         {selectedOption === 'chat' && <div className='mt-5'>
//             <ChatProfile name='muhammed musa' isTyping={true} profileImage={DPImage} unreadMessages={7} lastMessageTime='1h'/>
//             <ChatProfile name='Niyi yusuf' lastMessage='whats up with you' profileImage={DPImage} unreadMessages={7} lastMessageTime='1h30m'/>
//             <ChatProfile name='Abubakar waqas' lastMessage='I am comming to your place' profileImage={DPImage} unreadMessages={7}/>
//             <ChatProfile name='Musa galapagous' lastMessage='I have seen and confirmed the money sent' profileImage={DPImage} unreadMessages={7}/>
//         </div>}


//         {/* contact */}
//         {selectedOption === 'user' && <div className='mt-5'>
//             <ChatProfile name='muhammed musa' isTyping={true} profileImage={DPImage} unreadMessages={7} lastMessageTime='1h'/>
//             <ChatProfile name='Niyi yusuf' lastMessage='whats up with you' profileImage={DPImage} unreadMessages={7} lastMessageTime='1h30m'/>
//             <ChatProfile name='Abubakar waqas' lastMessage='I am comming to your place' profileImage={DPImage} unreadMessages={7}/>
//             <ChatProfile name='Musa galapagous' lastMessage='I have seen and confirmed the money sent' profileImage={DPImage} unreadMessages={7}/>
//         </div>}


//         {/* groups */}
//         {selectedOption === 'group' && <div className='mt-5'>
//             <ChatProfile name='muhammed musa' isTyping={true} profileImage={group} unreadMessages={7} lastMessageTime='1h'/>
//             <ChatProfile name='Niyi yusuf' lastMessage='whats up with you' profileImage={group} unreadMessages={7} lastMessageTime='1h30m'/>
//             <ChatProfile name='Abubakar waqas' lastMessage='I am comming to your place' profileImage={group} unreadMessages={7}/>
//             <ChatProfile name='Musa galapagous' lastMessage='I have seen and confirmed the money sent' profileImage={group} unreadMessages={7}/>
//         </div>}
//     </div>
//   )
// }

// export default ChatLeftSideBar


// --------- version 2 ----------
import React, { useState } from 'react';
import { BsPeople } from 'react-icons/bs';
import { FaUserCheck } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';
import LeftNavLink from '../../molecules/LeftNavLink';
import ChatProfile from '../../molecules/ChatProfile';
import DPImage from '../../../assets/home/dew.jpg';
import group from '../../../assets/home/dog.svg';

interface IChatLeftSideProps {
  isDark: boolean;
  menu: any;
}

const ChatLeftSideBar: React.FC<IChatLeftSideProps> = ({ isDark }) => {
  const [selectedOption, setSelection] = useState('chat');

  const handleSelection = (selection: string) => {
    setSelection(selection);
  };

  return (
    <div className={`p-4 ${isDark ? 'bg-darkBg text-white' : 'bg-white text-darkBg'}`}>
      {/* Selection Options */}
      <div className="flex items-center justify-around my-5">
        <LeftNavLink
          label="chat"
          handleSelection={handleSelection}
          Icon={<IoMail className={`${selectedOption === 'chat' ? 'text-primary' : ''}`} />}
          value="3"
        />
        <LeftNavLink
          label="user"
          handleSelection={handleSelection}
          Icon={<FaUserCheck className={`${selectedOption === 'user' ? 'text-primary' : ''}`} />}
          value="10"
        />
        <LeftNavLink
          label="group"
          handleSelection={handleSelection}
          Icon={<BsPeople className={`${selectedOption === 'group' ? 'text-primary' : ''}`} />}
          value="20"
        />
      </div>

      {/* Search Functionality */}
      <div className="border-b-2 pb-2 mb-5">
        <input
          className="px-2 py-1 rounded-sm outline-none w-full"
          type="text"
          placeholder="Search"
        />
      </div>

      {/* Friend List */}
      <div className="mt-5">
        {selectedOption === 'chat' && (
          <>
            <ChatProfile name="muhammed musa" isTyping profileImage={DPImage} unreadMessages={7} lastMessageTime="1h" />
            <ChatProfile name="Niyi yusuf" lastMessage="whats up with you" profileImage={DPImage} unreadMessages={7} lastMessageTime="1h30m" />
            <ChatProfile name="Abubakar waqas" lastMessage="I am coming to your place" profileImage={DPImage} unreadMessages={7} />
            <ChatProfile name="Musa galapagous" lastMessage="I have seen and confirmed the money sent" profileImage={DPImage} unreadMessages={7} />
          </>
        )}

        {/* Contact List */}
        {selectedOption === 'user' && (
          <>
            <ChatProfile name="muhammed musa" isTyping profileImage={DPImage} unreadMessages={7} lastMessageTime="1h" />
            <ChatProfile name="Niyi yusuf" lastMessage="whats up with you" profileImage={DPImage} unreadMessages={7} lastMessageTime="1h30m" />
            <ChatProfile name="Abubakar waqas" lastMessage="I am coming to your place" profileImage={DPImage} unreadMessages={7} />
            <ChatProfile name="Musa galapagous" lastMessage="I have seen and confirmed the money sent" profileImage={DPImage} unreadMessages={7} />
          </>
        )}

        {/* Group List */}
        {selectedOption === 'group' && (
          <>
            <ChatProfile name="muhammed musa" isTyping profileImage={group} unreadMessages={7} lastMessageTime="1h" />
            <ChatProfile name="Niyi yusuf" lastMessage="whats up with you" profileImage={group} unreadMessages={7} lastMessageTime="1h30m" />
            <ChatProfile name="Abubakar waqas" lastMessage="I am coming to your place" profileImage={group} unreadMessages={7} />
            <ChatProfile name="Musa galapagous" lastMessage="I have seen and confirmed the money sent" profileImage={group} unreadMessages={7} />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatLeftSideBar;
