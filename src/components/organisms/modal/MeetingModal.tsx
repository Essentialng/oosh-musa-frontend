import { useRef } from 'react'
import { IoCameraReverse, IoMicOff } from 'react-icons/io5'
// import Meet from './Meet';
import { useAppSelector } from '../../../redux/ReduxType';
import '../../../styles/custom.css'
// import { io } from 'socket.io-client';



// const socket = io('http://localhost:5000');

const MeetingModal = () => {


//   useEffect(()=>{
//      socket.on('me', (id) => {
//             alert('hello')
//             console.log(id);
//         });
//   },[])

    const modalRef = useRef<HTMLDialogElement>(null);
    const isDark = useAppSelector((state)=>state.theme.isDark)

    const openModal = () => {
        if (modalRef.current) {
          modalRef.current.showModal();
        }
      };


  return (
    <div className="w-full mt-4 flex flex-col items-center justify-center custom-scrollbar">
        
        
        {/* create a meet */}
        <button className="btn mb-4 w-2/3 hover:bg-darkBg hover:text-white" onClick={openModal}>Create a meet</button>
        <dialog id="my_modal_3" className="modal custom-scrollbar" ref={modalRef}>
          <div className={`modal-box ${isDark ? 'bg-deepBg text-white' : 'bg-white text-gray-800'}`}>
            <form method="dialog" className=''>
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-red-500">✕</button>
            </form>

            {/*  */}
            <div className='flex items-center mx-auto justify-center w-10 h-10 p-4 bg-red-500 rounded-full'>
                <h3 className={`font-semibold ${isDark ? 'text-gray-800' : 'text-white'}`}>G</h3>
            </div>

            {/* market features */}
            <div className='text-center'>You</div>
            <p className='text-center'>Galapagous</p>
            <div className='w-3/4 h-[350px] bg-gray-500 relative mx-auto rounded-sm'>
                <IoCameraReverse className='bg-white p-2 rounded-full text-black w-10 h-10 bottom-5 left-5 absolute'/>
                <IoMicOff className='bg-white p-2 rounded-full text-black w-10 h-10 bottom-5 right-5 absolute'/>
            </div>
          <p className='my-5 text-sm text-center'>
            
            Share this link with colleague to join in
          </p>
        <button className='btn bg-darkBg block w-full my-2 px-3 py-2 rounded-sm text-sm mx-auto text-white'>Start</button>
        {/* <Meet/> */}
        {/* <MeetingComponent isDark={isDark} username='galapagous'/> */}
          </div>
        </dialog>
        <button className="btn w-2/3 hover:bg-darkBg hover:text-white">Join a Meet</button>
      </div>
  )
}

export default MeetingModal