import React from 'react';
import StatusProfile from '../../molecules/StatusProfile';
import Status1 from '../../../assets/home/tower.svg';
import { BsCamera, BsCameraFill } from 'react-icons/bs';
import { useAppSelector } from '../../../redux/ReduxType';

interface IChatRightSideProps {
  isDark: boolean;
  menu: any;
}

const ChatRightSideBar: React.FC<IChatRightSideProps> = () => {
  const isDark = useAppSelector((state) => state.theme.isDark);

  const handleAddStatus = () => {
    alert('Coming soon');
  };

  return (
    <div className={`px-2 ${isDark ? 'bg-darkBg text-white' : 'bg-white text-darkBg'}`}>
      {/* Status Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-base font-semibold">status</h1>
        <BsCameraFill
          onClick={handleAddStatus}
          className={`p-2 cursor-pointer w-8 h-8 ${isDark ? 'bg-darkBg text-white' : 'bg-white text-deepBg'}`}
        />
      </div>

      {/* Status List */}
      <div>
        <StatusProfile profilePix={Status1} name="Nasir" time="03:10pm" />
        <StatusProfile profilePix={Status1} name="Mujeeb" time="03:10pm" />
        <StatusProfile profilePix={Status1} name="Waliw" time="03:10pm" />
        <StatusProfile profilePix={Status1} name="Habbeb" time="03:10pm" />
        <StatusProfile profilePix={Status1} name="Zainab" time="03:10pm" />
      </div>

      {/* Divider */}
      <hr className="my-4" />

      {/* Viewed Status */}
      <div>
        <span className="block text-sm font-semibold mb-2">Viewed</span>
        <div>
          <StatusProfile profilePix={Status1} name="Gabriel" time="03:10pm" />
          <StatusProfile profilePix={Status1} name="Saka" time="03:10pm" />
          <StatusProfile profilePix={Status1} name="Arteta" time="03:10pm" />
          <StatusProfile profilePix={Status1} name="Drake" time="03:01pm" />
        </div>
      </div>
    </div>
  );
};

export default ChatRightSideBar;
