import React, { MouseEvent } from "react"
import { IEventInfo } from "./EventCalender"

interface IProps {
  open: boolean
  handleClose: () => void
  onDeleteEvent: () => void
  currentEvent: IEventInfo | null
}

const EventInfoModal: React.FC<IProps> = ({ open, handleClose, onDeleteEvent, currentEvent }) => {
  if (!open || !currentEvent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
      <div className="fixed inset-0 bg-black opacity-50" onClick={handleClose}></div>
      <div className="relative w-auto max-w-md mx-auto my-6 z-50">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          {/* Modal header */}
          <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
            <h3 className="text-2xl font-semibold">{currentEvent.title}</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={handleClose}
            >
              <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          {/* Modal body */}
          <div className="relative p-6 flex-auto">
            <p className="text-sm text-gray-500 mt-2">
              {currentEvent.description}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Start: {currentEvent.start.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              End: {currentEvent.end.toLocaleString()}
            </p>
          </div>
          {/* Modal footer */}
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={onDeleteEvent}
            >
              Delete Event
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventInfoModal