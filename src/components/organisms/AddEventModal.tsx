import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from "react"
import { EventFormData, ITodo } from './EventCalender'


// ------ interface -------
interface IProps {
    open: boolean
    handleClose: Dispatch<SetStateAction<void>>
    eventFormData: EventFormData
    setEventFormData: Dispatch<SetStateAction<EventFormData>>
    onAddEvent: (e: MouseEvent<HTMLButtonElement>) => void
    todos: ITodo[]
  }


//   --------- function handler ---------
const AddEventModal = ({ open, handleClose, eventFormData, setEventFormData, onAddEvent, todos }: IProps) => {
    const { description } = eventFormData
  
    const onClose = () => handleClose()
  
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      setEventFormData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }))
    }
  
    const handleTodoChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setEventFormData((prevState) => ({
          ...prevState,
          todoId: event.target.value,
        }))
      }

  return (
<div className={`hidden`}>            
  <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
    <div className="relative w-auto max-w-3xl mx-auto my-6">
      <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
        {/* Modal header */}
        <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
          <h3 className="text-3xl font-semibold">Add event</h3>
          <button
            className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
            onClick={onClose}
            >
            <span className="block w-6 h-6 text-2xl text-black">
                ×
            </span>
            </button>
        </div>
        {/* Modal body */}
        <div className="relative flex-auto p-6">
          <p className="my-4 text-lg leading-relaxed text-blueGray-500">
            To add an event, please fill in the information below.
          </p>
          <form>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <input
                type="text"
                name="description"
                value={description}
                onChange={onChange}
                placeholder="Description"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Todo</span>
              </label>
              <select className="select select-bordered w-full"   onChange={handleTodoChange} value={eventFormData.todoId || ''}>
                <option value="" disabled>Pick a todo</option>
                {todos.map((todo) => (
                    <option key={todo._id} value={todo._id}>
                    {todo.title}
                    </option>
                ))}
                </select>
            </div>
          </form>
        </div>
        {/* Modal footer */}
        <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
          <button
            className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
            type="button"
            onClick={onAddEvent}
            disabled={description === ""}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}

export default AddEventModal