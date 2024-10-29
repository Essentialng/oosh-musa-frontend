import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const CustomDatePicker: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  return (
    <div className="container mx-auto mt-10 p-4 bg-gray-100 rounded">
      {/* <div className="flex flex-col items-center">
        <label className="mb-2 text-lg">Select a date and time:</label>
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          showTimeSelect
          dateFormat="Pp"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="mt-4">
        {startDate && <p>Selected Date: {format(startDate, 'PPpp')}</p>}
      </div> */}
    </div>
  );
};

export default CustomDatePicker;
