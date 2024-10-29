import React from 'react';
import MeetBack from '../assets/home/dew2.jpg';
import MeetingModal from '../components/organisms/modal/MeetingModal';
import { useAppSelector } from '../redux/ReduxType';



interface IMeet {
  
}

const Meeting: React.FC<IMeet> = () => {

  const isDark = useAppSelector((state)=>state.toggleTheme.isDark)

  return (
    <div className={`rounded-lg my-2 ${isDark ? 'bg-deepBg text-white' : 'bg-white text-gray-800'} p-5 custom-scrollbar`}>
      <h1 className="text-center text-3xl mb-2">OOSH Meeting Place</h1>
      <div className="rounded-lg overflow-hidden mb-4">
        <img src={MeetBack} alt="Meeting" className="w-full h-auto" />
      </div>
      <h2 className="text-2xl text-center font-semibold mb-4">Ready for a better experience?</h2>
      <p className="mb-4">
        In today’s fast-paced world, connecting with others has never been more crucial. Whether it’s for business, education, or social interactions, the ability to meet and collaborate effectively is paramount. Enter Oosh Meet, the ultimate feature designed to revolutionize the way you interact and engage with people.
      </p>
      
      <MeetingModal/>
    </div>
  );
};

export default Meeting;
