import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useAppSelector } from '../../../redux/ReduxType';

interface CalendarProps {
  initialDate?: Date;
}

const Calendar: React.FC<CalendarProps> = ({ initialDate = new Date() }) => {
  const isDark = useAppSelector(state=>state.toggleTheme.isDark)
  
  const [currentDate, setCurrentDate] = useState(initialDate);

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderCalendar = () => {
    const days = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);
    const calendarDays = [];

    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let i = 1; i <= days; i++) {
      calendarDays.push(
        <div onClick={()=>{alert(`Add item for ${i}`)}} key={i} className="p-2 text-center hover:bg-gray-100 hover:text-gray-500 cursor-pointer">
          {i}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className={`shadow-lg ${isDark ? 'bg-darkBg' : 'bg-white'} p-2`}>
      <div className={`flex justify-between items-center p-2 ${isDark ? 'text-white' : 'text-gray-400'}`}>
        <button onClick={prevMonth} className="p-1">
          <FaChevronLeft className='w-3 h-3' size={20} />
        </button>
        <div>
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </div>
        <button onClick={nextMonth} className="p-1">
          <FaChevronRight className='w-3 h-3' size={20} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 p-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>
    </div>
  );
};

export default Calendar;