import React, { useState } from 'react';
import { weekTime } from "../../../assets/data/plan";
import { CalendarItem } from "../../../type/calender";
import { useAppSelector } from '../../../redux/ReduxType';

interface TimeSlot {
  time: string;
  events: CalendarItem[];
}

interface DayColumn {
  date: Date;
  timeSlots: TimeSlot[];
}

const WeekView: React.FC<{ 
  currentDate: Date; 
  items: CalendarItem[];
  onAddEvent?: (date: Date, time: string) => void;
  onEditEvent?: (event: CalendarItem) => void;
}> = ({ 
  currentDate, 
  items,
  onAddEvent,
  onEditEvent 
}) => {
  // Initialize the week structure
  const getWeekStructure = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    return Array.from({ length: 7 }, (_, dayIndex) => {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(startOfWeek.getDate() + dayIndex);
      
      const timeSlots = weekTime.map(time => ({
        time,
        events: items.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate.toDateString() === currentDay.toDateString() &&
                 itemDate.getHours() === parseInt(time.split(':')[0]);
        })
      }));

      return {
        date: currentDay,
        timeSlots
      };
    });
  };

  const weekStructure = getWeekStructure();

  // Handle click on empty time slot
  const handleTimeSlotClick = (date: Date, time: string) => {
    if (onAddEvent) {
      const clickedDate = new Date(date);
      clickedDate.setHours(parseInt(time.split(':')[0]));
      onAddEvent(clickedDate, time);
    }
  };

  // Handle click on existing event
  const handleEventClick = (event: CalendarItem) => {
    if (onEditEvent) {
      onEditEvent(event);
    }
  };

  const isDark = useAppSelector(state=>state.toggleTheme.isDark)

  return (
    <div className={`flex h-[calc(100vh-200px)] overflow-auto ${isDark ? 'bg-darkBg':'bg-white'}`}>
      {/* Time Column */}
      <div className="w-20 flex-shrink-0 border-r mt-10">
        <div className="h-12"> {/* Header spacer */} </div>
        {weekTime.map((time, index) => (
          <div 
            key={time}
            className="h-20 border-b flex items-center justify-end pr-2"
          >
            <span className="text-sm text-gray-500">{time}</span>
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="flex-1 relative mt-10">
        {/* Header Row */}
        <div className="flex absolute top-0 left-0 right-0 z-10">
          {weekStructure.map(({ date }) => (
            <div 
              key={date.toISOString()} 
              className="flex-1 h-12 border-b border-l px-2 py-1"
            >
              <div className="font-semibold">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className="text-sm text-gray-500">
                {date.toLocaleDateString('en-US', { day: 'numeric' })}
              </div>
            </div>
          ))}
        </div>

        {/* Time Slots Grid */}
        <div className="flex mt-12">
          {weekStructure.map((dayColumn) => (
            <div 
              key={dayColumn.date.toISOString()} 
              className="flex-1 relative"
            >
              {dayColumn.timeSlots.map((slot, slotIndex) => (
                <div 
                  key={`${dayColumn.date.toISOString()}-${slot.time}`}
                  className="h-20 border-b border-l relative group"
                  onClick={() => handleTimeSlotClick(dayColumn.date, slot.time)}
                >
                  {/* Add Event Indicator */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-blue-50 transition-opacity" />
                  
                  {/* Events */}
                  {slot.events.map((event) => (
                    <div
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEventClick(event);
                      }}
                      className={`
                        absolute top-0 left-1 right-1 m-1 p-2 
                        rounded shadow-sm cursor-pointer
                        ${event.type === 'event' ? 'bg-blue-100 hover:bg-blue-200' :
                          event.type === 'todo' ? 'bg-green-100 hover:bg-green-200' :
                          'bg-yellow-100 hover:bg-yellow-200'}
                      `}
                    >
                      <div className="text-xs font-medium truncate">
                        {event.title}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeekView;