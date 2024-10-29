import { useState, Dispatch, SetStateAction } from "react"

import { HexColorPicker } from "react-colorful"
import { ITodo, generateId } from "./EventCalender"
import { BsTrash } from "react-icons/bs"



// ------ interface --------
interface IProps {
  open: boolean
  handleClose: Dispatch<SetStateAction<void>>
  todos: ITodo[]
  setTodos: Dispatch<SetStateAction<ITodo[]>>
}

const AddTodoModal = ({ open, handleClose, todos, setTodos }: IProps) => {
  const [color, setColor] = useState("#b32aa9")
  const [title, setTitle] = useState("")

  const onAddTodo = () => {
    setTitle("")
    setTodos([
      ...todos,
      {
        _id: generateId(),
        color,
        title,
      },
    ])
  }

  const onDeletetodo = (_id: string) => setTodos(todos.filter((todo) => todo._id !== _id))

  const onClose = () => handleClose()
  return (
    <div className={`fixed ${open ? '' : 'hidden'} inset-0 z-50 overflow-y-auto`}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add todo</h3>
            <p className="text-sm text-gray-500 mb-4">Create todos to add to your Calendar.</p>
            
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="flex justify-around mb-6">
              <HexColorPicker color={color} onChange={setColor} />
              <div className="h-20 w-20 rounded" style={{ backgroundColor: color }}></div>
            </div>

            <ul className="divide-y divide-gray-200">
              {todos.map((todo) => (
                <li key={todo.title} className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded mr-3" style={{ backgroundColor: todo.color }}></div>
                    <p className="text-sm font-medium text-gray-900">{todo.title}</p>
                  </div>
                  <button
                    onClick={() => onDeletetodo(todo._id)}
                    className="ml-2 bg-red-100 p-2 rounded-full text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <BsTrash className="h-5 w-5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm ${title === "" || color === "" ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={onAddTodo}
              disabled={title === "" || color === ""}
            >
              Add
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddTodoModal