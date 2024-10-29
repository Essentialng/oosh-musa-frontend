import React, { useState, MouseEvent } from "react";
import { Calendar, dateFnsLocalizer, EventProps } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventInfo from "./EventInfo";
import AddEventModal from "./AddEventModal";
import EventInfoModal from "./EventInfoModal";
import AddTodoModal from './AddTodoModal';
import AddDatePickerEventModal from "./AddDatePickerEventModal";

// Interfaces
export interface ITodo {
  _id: string;
  title: string;
  color?: string;
}

export interface IEventInfo {
  _id: string;
  title: string;
  start: Date;
  end: Date;
  description: string;
  todoId?: string;
}

export interface EventFormData {
  title: string;
  description: string;
  todoId?: string;
}

export interface DatePickerEventFormData extends EventFormData {
  allDay: boolean;
  start?: Date;
  end?: Date;
}

// Helper function
export const generateId = () => (Math.floor(Math.random() * 10000) + 1).toString();

const EventCalendar: React.FC = () => {
  // Localizer setup
  const locales = {
    "en-US": enUS,
  };
  
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  // Initial states
  const initialEventFormState: EventFormData = {
    title: "",
    description: "",
    todoId: undefined,
  };
  
  const initialDatePickerEventFormData: DatePickerEventFormData = {
    ...initialEventFormState,
    allDay: false,
    start: undefined,
    end: undefined,
  };

  // State declarations
  const [openSlot, setOpenSlot] = useState(false);
  const [openDatepickerModal, setOpenDatepickerModal] = useState(false);
  const [openTodoModal, setOpenTodoModal] = useState(true);
  const [currentEvent, setCurrentEvent] = useState<IEventInfo | null>(null);
  const [eventInfoModal, setEventInfoModal] = useState(false);
  const [events, setEvents] = useState<IEventInfo[]>([]);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [eventFormData, setEventFormData] = useState<EventFormData>(initialEventFormState);
  const [datePickerEventFormData, setDatePickerEventFormData] = useState<DatePickerEventFormData>(initialDatePickerEventFormData);

  // Event handlers
  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    setOpenSlot(true);
    setCurrentEvent({ _id: generateId(), title: "", start: slotInfo.start, end: slotInfo.end, description: "" });
  };

  const handleSelectEvent = (event: IEventInfo) => {
    setCurrentEvent(event);
    setEventInfoModal(true);
  };

  const handleClose = () => {
    setEventFormData(initialEventFormState);
    setOpenSlot(false);
  };

  const handleDatePickerClose = () => {
    setDatePickerEventFormData(initialDatePickerEventFormData);
    setOpenDatepickerModal(false);
  };

  const onAddEvent = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (currentEvent) {
      const newEvent: IEventInfo = {
        ...currentEvent,
        ...eventFormData,
      };

      setEvents([...events, newEvent]);
      handleClose();
    }
  };

  const onAddEventFromDatePicker = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { start, end, allDay, ...eventData } = datePickerEventFormData;

    if (start && end) {
      const newEvent: IEventInfo = {
        _id: generateId(),
        ...eventData,
        start: allDay ? new Date(start.setHours(0, 0, 0, 0)) : start,
        end: allDay ? new Date(start.setHours(23, 59, 59, 999)) : end,
      };

      setEvents([...events, newEvent]);
      handleDatePickerClose();
    }
  };

  const onDeleteEvent = () => {
    if (currentEvent) {
      setEvents(events.filter((e) => e._id !== currentEvent._id));
      setEventInfoModal(false);
    }
  };

  // Custom EventInfo component
  const CustomEventInfo: React.FC<EventProps<IEventInfo>> = ({ event }) => (
    <EventInfo event={event} />
  );

  return (
    <div className="mt-8 mb-8 flex-grow py-8">
      <div className="container mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Calendar</h2>
            <p className="text-base-content/70">Create Events and Todos and manage them easily</p>
            <div className="divider"></div>
            <div className="flex justify-between">
              <div className="btn-group">
                <button className="btn btn-primary" onClick={() => setOpenDatepickerModal(true)}>
                  Add event
                </button>
                <button className="btn btn-primary" onClick={() => setOpenTodoModal(true)}>
                  Create todo
                </button>
              </div>
            </div>
            <div className="divider my-4"></div>
            <AddEventModal
              open={openSlot}
              handleClose={handleClose}
              eventFormData={eventFormData}
              setEventFormData={setEventFormData}
              onAddEvent={onAddEvent}
              todos={todos}
            />
            <AddDatePickerEventModal
              open={openDatepickerModal}
              handleClose={handleDatePickerClose}
              datePickerEventFormData={datePickerEventFormData}
              setDatePickerEventFormData={setDatePickerEventFormData}
              onAddEvent={onAddEventFromDatePicker}
              todos={todos}
            />
            <EventInfoModal
              open={eventInfoModal}
              handleClose={() => setEventInfoModal(false)}
              onDeleteEvent={onDeleteEvent}
              currentEvent={currentEvent}
            />
            <AddTodoModal
              open={openTodoModal}
              handleClose={() => setOpenTodoModal(false)}
              todos={todos}
              setTodos={setTodos}
            />
            <Calendar
              localizer={localizer}
              events={events}
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              selectable
              startAccessor="start"
              components={{ event: CustomEventInfo }}
              endAccessor="end"
              defaultView="week"
              eventPropGetter={(event) => {
                const hasTodo = todos.find((todo) => todo._id === event.todoId);
                return {
                  style: {
                    backgroundColor: hasTodo ? hasTodo.color : "#b64fc8",
                    borderColor: hasTodo ? hasTodo.color : "#b64fc8",
                  },
                };
              }}
              className="h-[900px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;