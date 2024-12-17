import {useRef} from 'react'
import { useAppSelector } from '../../../redux/ReduxType'
import AddPlan from '../modal/AddPlan';



// Define types
type ViewType = 'month' | 'week' | 'day';
type EventType = 'event' | 'todo' | 'reminder';

interface CalendarItem {
    id: string;
    title: string;
    date: Date;
    type: EventType;
  }

// Helper functions
const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    return new Date(year, month + 1, 0).getDate();
    };
    
    const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };


const MonthView: React.FC<{ currentDate: Date; items: CalendarItem[] }> = ({ currentDate, items }) => {
    
    const isDark = useAppSelector(state=>state.theme.isDark)

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  

    const modalRef = useRef<HTMLDialogElement>(null);

    const openModal = () => {
        if (modalRef.current) {
        modalRef.current.showModal();
        }
    };


    return (
      <div className="grid grid-cols-7">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className={`w-full mb-2 py-4 ${isDark ? 'bg-darkBg' : 'bg-white'} px-2 border-b-[1px] border-gray-400 flex items-center justify-between mt-5`}>{day}</div>
        ))}
        {Array(firstDayOfMonth).fill(null).map((_, index) => (
          <div key={`empty-${index}`} className="p-2"></div>
        ))}
        {days.map(day => (
          <div key={day} onClick={openModal} className={`p-2 border relative cursor-pointer ${isDark ? 'bg-darkBg' : 'bg-white'} border-slate-300 h-[100px]`}>
            <div className="font-semibold absolute bottom-1 right-[2px]">{day}</div>
            {items.filter(item => item.date.getDate() === day && item.date.getMonth() === currentDate.getMonth()).map(item => (
              <div key={item.id} className="text-xs truncate">{item.title}</div>
            ))}
            <div>
                {/* <span className='w-full p-2 bg-purple-400 text-purple-800 text-xs rounded-lg'>Call mom</span> */}
                
            </div>
            <span></span>
            <AddPlan ref={modalRef} />
          </div>
        ))}
      </div>
    );
  };


  export default MonthView