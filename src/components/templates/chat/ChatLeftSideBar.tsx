import React, { useState } from 'react';
import { BsPeople, BsPeopleFill } from 'react-icons/bs';
import { FaUserCheck } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';
import LeftNavLink from '../../molecules/LeftNavLink';
import ChatProfile from '../../molecules/ChatProfile';
import DPImage from '../../../assets/home/dew.jpg';
import group from '../../../assets/home/dog.svg';
import { useAppSelector } from '../../../redux/ReduxType';

interface IChatLeftSideProps {
  isDark: boolean;
  menu: any;
}

const ChatLeftSideBar: React.FC<IChatLeftSideProps> = ({ isDark }) => {
  const [selectedOption, setSelection] = useState('user');
  const user = useAppSelector(state=>state.user)
  const handleSelection = (selection: string) => {
    setSelection(selection);
  };

  return (
    <div className={`py-4 px-2 ${isDark ? 'bg-darkBg text-white' : 'bg-white text-darkBg'}`}>
      {/* Selection Options */}
      <div className="flex items-center justify-around my-5">
        <LeftNavLink
          label="user"
          handleSelection={handleSelection}
          Icon={<FaUserCheck className={`${selectedOption === 'user' ? 'text-red-500' : ''}`} />}
          value="10"
        />
        <LeftNavLink
          label="chat"
          isDark={isDark}
          handleSelection={handleSelection}
          Icon={<IoMail className={`${selectedOption === 'chat' ? 'text-red-500' : ''}`} />}
          value="3"
        />
        <LeftNavLink
          label="group"
          handleSelection={handleSelection}
          Icon={<BsPeopleFill className={`${selectedOption === 'group' ? 'text-red-500' : ''}`} />}
          value="20"
        />
      </div>

      {/* Search Functionality */}
      <div className="border-b-2 pb-2 mb-5">
        <input
          className={`px-2 text-sm ${isDark ? 'text-newtral_pri' : 'bg-newtral_sec text-newtral_pri'} py-1 rounded-sm outline-none w-full`}
          type="text"
          placeholder="Search"
        />
      </div>

      {/* Friend List */}
      <div className="mt-5">
        {selectedOption === 'chat' && (
          <>
            <ChatProfile data={{}} name="muhammed musa" isTyping profileImage={DPImage} unreadMessages={7} lastMessageTime="1h" />
            <ChatProfile data={{}} name="Niyi yusuf" lastMessage="whats up with you" profileImage={DPImage} unreadMessages={7} lastMessageTime="1h30m" />
            <ChatProfile data={{}} name="Abubakar waqas" lastMessage="I am coming to your place" profileImage={DPImage} unreadMessages={7} />
            <ChatProfile data={{}} name="Musa galapagous" lastMessage="I have seen and confirmed the money sent" profileImage={DPImage} unreadMessages={7} />
          </>
        )}

        {/* Contact List */}
        {selectedOption === 'user' && (
          <>
            {
              user?.friends?.map((eachFriend:any)=>{
                return(
                  <ChatProfile data={eachFriend} name={eachFriend?.fullname} profileImage={eachFriend?.avatar} unreadMessages={7} lastMessageTime="1h" />
                )
              })
            }
          </>
        )}

        {/* Group List */}
        {selectedOption === 'group' && (
          <>
            <ChatProfile data={{}} name="muhammed musa" isTyping profileImage={group} unreadMessages={7} lastMessageTime="1h" />
            <ChatProfile data={{}} name="Niyi yusuf" lastMessage="whats up with you" profileImage={group} unreadMessages={7} lastMessageTime="1h30m" />
            <ChatProfile data={{}} name="Abubakar waqas" lastMessage="I am coming to your place" profileImage={group} unreadMessages={7} />
            <ChatProfile data={{}} name="Musa galapagous" lastMessage="I have seen and confirmed the money sent" profileImage={group} unreadMessages={7} />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatLeftSideBar;
