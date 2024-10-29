import { CalendarItem } from "../../../type/calender";

const DayView: React.FC<{ currentDate: Date; items: CalendarItem[] }> = ({ currentDate, items }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="grid grid-cols-1 gap-1 mt-4">
      {hours.map(hour => (
        <div key={hour} className="border-b py-5">
          <div className="font-semibold">{hour}:00</div>
          {items.filter(item => 
            item.date.toDateString() === currentDate.toDateString() && 
            item.date.getHours() === hour
          ).map(item => (
            <div key={item.id} className="ml-4 p-1 bg-base-200 rounded">{item.title}</div>
          ))}
        </div>
      ))}
    </div>
  );
};


export default DayView