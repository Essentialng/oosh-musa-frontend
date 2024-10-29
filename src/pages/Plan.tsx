import React, { useState } from 'react'
// import EventCalender from '../components/organisms/EventCalender'
// import Calender2 from '../components/organisms/plan/Calender2'
// import CalenderData from '../components/organisms/plan/CalenderData'
import { BsChevronLeft, BsChevronRight, BsPlus } from 'react-icons/bs'
import { useAppSelector } from '../redux/ReduxType'
import MonthView from '../components/organisms/plan/MonthView'
import WeekView from '../components/organisms/plan/WeekView'
import DayView from '../components/organisms/plan/DayView'


// Define types
type ViewType = 'month' | 'week' | 'day';
type EventType = 'event' | 'todo' | 'reminder';

interface CalendarItem {
  id: string;
  title: string;
  date: Date;
  type: EventType;
}


const Plan = () => {


  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewType>('month');
  const [items, setItems] = useState<CalendarItem[]>([]);

  const changeView = (newView: ViewType) => {
    setView(newView);
  };

  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') newDate.setMonth(newDate.getMonth() - 1);
    if (view === 'week') newDate.setDate(newDate.getDate() - 7);
    if (view === 'day') newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const navigateNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') newDate.setMonth(newDate.getMonth() + 1);
    if (view === 'week') newDate.setDate(newDate.getDate() + 7);
    if (view === 'day') newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const addItem = (title: string, date: Date, type: EventType) => {
    const newItem: CalendarItem = {
      id: Date.now().toString(),
      title,
      date,
      type,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

const isdark = useAppSelector(state=>state.toggleTheme.isDark)

const [activeSelection, setActiveSelection] = useState('months')



  return (
    <div className='w-full text-sm mt-4 px-3'>
      {/* calender header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-center gap-2'>
          <BsPlus className='bg-blue-500 p-1 w-6 h-6 cursor-pointer rounded-full'/>        
          <p>Add</p>
        </div>
        {/* Middle section */}
        <div className='flex items-center justify-center gap-20'>
          <BsChevronLeft className='cursor-pointer w-3 h-3'/>
          <div className='text-center'>
            <h3>October</h3>
            <p className='text-sm text-gray-400'>2024</p>
          </div>
          <BsChevronRight className='cursor-pointer w-3 h-3'/>
        </div>

        {/* view switchers */}
        <div className='flex items-center justify-center gap-5'>
          <button onClick={()=>{setActiveSelection('days')}} className={`${activeSelection === 'days' ? isdark ? 'bg-darkBg' : 'bg-white' : ''} p-2`}>Days</button>
          <button onClick={()=>{setActiveSelection('weeks')}} className={`${activeSelection === 'weeks' ? isdark ? 'bg-darkBg' : 'bg-white' : ''} p-2`}>Weeks</button>
          <button onClick={()=>{setActiveSelection('months')}} className={`${activeSelection === 'months' ? isdark ? 'bg-darkBg' : 'bg-white' : ''} p-2`}>Months</button>
        </div>
      </div>

      {/* main area */}
      <div>
      {
        activeSelection === 'months' && <MonthView currentDate={currentDate} items={items} />
      }
      {
      activeSelection === 'weeks' && <WeekView currentDate={currentDate} items={items}/>
      }
      {
      activeSelection === 'days' && <DayView currentDate={currentDate} items={items}/>
      }
      </div>
    </div>
  )
}

export default Plan