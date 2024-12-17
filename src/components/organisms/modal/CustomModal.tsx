import React from 'react'

interface IModalProps{
    isOpen: boolean
    handleOpen:()=>void
    handleClose: ()=>void
    children:React.ReactNode


}

const CustomModal:React.FC<IModalProps> = ({
    isOpen,
    handleOpen,
    handleClose,
    children
}) => {
  return (
    <div>
    <label onClick={handleOpen} htmlFor="my_modal_7" className="btn">open modal</label>

    <input type="checkbox" id="my_modal_7" className="modal-toggle" />
    <div className="modal" role="dialog">
    <div className="modal-box">
        {children}
    </div>
    <label onClick={handleClose} className="modal-backdrop" htmlFor="my_modal_7">Close</label>
    </div>
    </div>
  )
}

export default CustomModal