import { forwardRef, useImperativeHandle, useRef } from 'react';
import PlanTitle from '../../molecules/PlanTitle';
import { BsBook, BsCalendar, BsPen } from 'react-icons/bs';
import { IoAppsSharp } from "react-icons/io5";
import { CiClock1 } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight, FaColonSign } from "react-icons/fa6";
import { FaLocationArrow } from 'react-icons/fa';
import { MdOutlineNote } from 'react-icons/md';
import { MdNotes } from "react-icons/md";
import { useAppSelector } from '../../../redux/ReduxType';




const AddPlan = forwardRef<HTMLDialogElement>((props, ref) => {
  const modalRef = useRef<HTMLDialogElement>(null);

const isDark = useAppSelector(state=>state.toggleTheme.isDark)

  useImperativeHandle(ref, () => modalRef.current!, [modalRef]);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  return (
    <div onClick={openModal} className="text-xs">
      <dialog ref={modalRef} id="my_modal_3" className="modal">
        <div className={`modal-box ${isDark ? 'bg-deepBg text-white' : ''}`}>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <h3 className="font-bold text-lg">Add Event</h3>
            
            {/* add event items */}
            <div className='w-full mt-4'>
                <div className='w-full mb-4 flex items-center justify-start gap-10'>
                    <PlanTitle logo={<BsPen/>} title='Title'/>
                    <input className='w-full border-[0.5px] border-slate-500 p-2 rounded-sm' type="text" placeholder='Title'/>
                </div>
                <div className='w-full mb-4 flex items-center justify-start gap-10'>
                    <PlanTitle logo={<IoAppsSharp/>} title='Type'/>
                    <div className='flex items-center justify-start gap-10'>
                       <span className='text-gray-500 hover:bg-slate-700 p-2 rounded-sm'>Meet</span>
                       <span className='text-gray-500 hover:bg-slate-700 p-2 rounded-sm'>Reminder</span>
                       <span className='text-gray-500 hover:bg-slate-700 p-2 rounded-sm'>Task</span>
                    </div>
                </div>
                <div className='w-full mb-4 flex items-center justify-start gap-10'>
                    <PlanTitle logo={<CiClock1/>} title='Hours'/>
                    <div className='w-full flex items-center justify-between'>
                        <div className='flex items-center justify-start gap-5 p-2 border-2 rounded-sm'>
                            <FaAngleLeft/>
                            <div className='flex items-center justify-start'>
                                <span className='text-lg font-semibold'>00</span>
                                :
                                <span className='text-lg font-semibold'>00</span>
                                :
                                <span className='text-lg font-semibold'>00</span>
                            </div>
                            <FaAngleRight/>
                        </div>
                        <div className='flex items-center justify-start gap-5 p-2 border-2 rounded-sm'>
                            <FaAngleLeft/>
                            <div className='flex items-center justify-start'>
                                <span className='text-lg font-semibold'>00</span>
                                :
                                <span className='text-lg font-semibold'>00</span>
                                :
                                <span className='text-lg font-semibold'>00</span>
                            </div>
                            <FaAngleRight/>
                        </div>
                    </div>
                        
                </div>
                <div className='w-full mb-4 flex items-center justify-start gap-10'>
                    <PlanTitle logo={<BsCalendar/>} title='Date'/>
                    <input className='w-full border-[0.5px] border-slate-300 p-2 rounded-sm' type="date" placeholder='Date'/>
                </div>
                <div className='w-full mb-4 flex items-center justify-start gap-10'>
                    <PlanTitle logo={<FaLocationArrow/>} title='Place'/>
                    <input className='w-full border-[0.5px] border-slate-300 p-2 rounded-sm' type="text" placeholder='Add a place'/>
                </div>
                <div className='w-full mb-4 flex items-center justify-start gap-10'>
                    <PlanTitle logo={<MdNotes/>} title='Note'/>
                    <input className='w-full border-[0.5px] border-slate-300 p-2 rounded-sm' type="text" placeholder='Add note'/>
                </div>
            </div>
            <hr className='h-[0.5px] bg-slate-100 mb-4'/>
            <button className={`px-6 py-2 mt-10 rounded-sm text-end ${isDark ? 'bg-white text-deepBg' : 'bg-deepBg text-white'}`}>Save</button>
          </form>
        </div>
      </dialog>
    </div>
  );
});

export default AddPlan;