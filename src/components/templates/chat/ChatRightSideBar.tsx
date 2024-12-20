// import React from 'react'
// import StatusProfile from '../../molecules/StatusProfile'
// import Status1 from '../../../assets/home/tower.svg'
// import { BsCamera } from 'react-icons/bs'
// import { useAppSelector } from '../../../redux/ReduxType'

// interface IChatRightSideProps{
//     isDark:boolean,
//     menu:any
// }

// const ChatRightSideBar:React.FC<IChatRightSideProps> = () => {

//   const isDark = useAppSelector((state)=>state.theme.isDark)

//   const handleAddStatus = ()=>{
//     alert('comming soon')
//   }


//   return (
//     <div className={``}>
//       <div className='w-full flex items-center justify-between mb-2'>
//         <h1>Status</h1>
//         <BsCamera onClick={()=>{handleAddStatus()}} className={`${isDark ? 'bg-darkBg text-white' : 'bg-white text-deepBg'} p-2 cursor-pointer w-8 h-8 rounded-full`}/>
//       </div>
//       <div>
//         <StatusProfile profilePix={Status1} name='Nasir' time='03:10pm'/>
//         <StatusProfile profilePix={Status1} name='Mujeeb' time='03:10pm'/>
//         <StatusProfile profilePix={Status1} name='Waliw' time='03:10pm'/>
//         <StatusProfile profilePix={Status1} name='Habbeb' time='03:10pm'/>
//         <StatusProfile profilePix={Status1} name='Zainab' time='03:10pm'/>
//       </div>
//       <hr/>
//       <div>
//         <span className='pt-2'>Viewed</span>
//         <div>
//           <StatusProfile profilePix={Status1} name='Gabriel' time='03:10pm'/>
//           <StatusProfile profilePix={Status1} name='Saka' time='03:10pm'/>
//           <StatusProfile profilePix={Status1} name='Arteta' time='03:10pm'/>
//           <StatusProfile profilePix={Status1} name='Drake' time='03:01pm'/>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ChatRightSideBar


// -------- version 2 -----------
import React from 'react';
import StatusProfile from '../../molecules/StatusProfile';
import Status1 from '../../../assets/home/tower.svg';
import { BsCamera } from 'react-icons/bs';
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
    <div className={`p-4 ${isDark ? 'bg-darkBg text-white' : 'bg-white text-darkBg'}`}>
      {/* Status Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-lg font-semibold">Status</h1>
        <BsCamera
          onClick={handleAddStatus}
          className={`p-2 cursor-pointer w-8 h-8 rounded-full ${isDark ? 'bg-darkBg text-white' : 'bg-white text-deepBg'}`}
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
        <span className="block font-semibold mb-2">Viewed</span>
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
