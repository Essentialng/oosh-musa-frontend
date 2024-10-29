import React, { Dispatch, MouseEvent, SetStateAction, ChangeEvent } from "react"


import { DatePickerEventFormData, ITodo } from "./EventCalender"

interface IProps {
  open: boolean
  handleClose: Dispatch<SetStateAction<void>>
  datePickerEventFormData: DatePickerEventFormData
  setDatePickerEventFormData: Dispatch<SetStateAction<DatePickerEventFormData>>
  onAddEvent: (e: MouseEvent<HTMLButtonElement>) => void
  todos: ITodo[]
}

const AddDatePickerEventModal = ({
  open,
  handleClose,
  datePickerEventFormData,
  setDatePickerEventFormData,
  onAddEvent,
  todos,
}: IProps) => {
  const { description, start, end, allDay } = datePickerEventFormData

  const onClose = () => {
    handleClose()
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDatePickerEventFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDatePickerEventFormData((prevState) => ({
      ...prevState,
      allDay: event.target.checked,
    }))
  }

  const handleTodoChange = (e: React.SyntheticEvent, value: ITodo | null) => {
    setDatePickerEventFormData((prevState) => ({
      ...prevState,
      todoId: value?._id,
    }))
  }

  const isDisabled = () => {
    const checkend = () => {
      if (!allDay && end === null) {
        return true
      }
    }
    if (description === "" || start === null || checkend()) {
      return true
    }
    return false
  }
  return (
    <div>AddDatePickerEventModal</div>
  )
}

export default AddDatePickerEventModal