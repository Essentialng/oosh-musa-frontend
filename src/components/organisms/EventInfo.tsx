import React from 'react';

interface IEventInfo {
  description: string;
  // Add other properties of IEventInfo as needed
}

interface IProps {
  event: IEventInfo;
}

const EventInfo: React.FC<IProps> = ({ event }) => {
  return (
    <div className="text-sm font-normal text-gray-700">
      {event.description}
    </div>
  );
};

export default EventInfo;