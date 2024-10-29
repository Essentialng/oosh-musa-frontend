import React, { useState } from 'react'

const RenderCalender = (newDate:Date) => {

  const [currentDate, setCurrentDate] = useState(newDate)

  const daysInMonth = (date:Date)=>{
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }
  
  const firstDayOfMonth = (date: Date) =>{
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }


  const prevMonth = (date: Date)=>{
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };


  // variables
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
}

export default RenderCalender

