import React from 'react'

interface IModal{
    children: React.ReactNode
    toggler: ()=>void
    showModal: boolean
    openText?: string
    title?: string
    description?: string
}

const Modal:React.FC<IModal> = ({
    children,
    showModal,
    toggler,
    openText,
    title,
    description
}) => {
  return (
    <div>
        <button className="btn" onClick={toggler}>{openText}</button>
        <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="py-4">{description}</p>
            <div className="modal-action">
            <form method="dialog">
                {
                    children
                }
                <button>Close</button>
            </form>
            </div>
        </div>
        </dialog>
    </div>
  )
}

export default Modal