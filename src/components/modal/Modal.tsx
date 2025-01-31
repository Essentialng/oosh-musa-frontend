// import React from 'react'

// interface IModal{
//     children: React.ReactNode
//     toggler: ()=>void
//     showModal: boolean
//     openText?: string
//     title?: string
//     description?: string
// }

// const Modal:React.FC<IModal> = ({
//     children,
//     showModal,
//     toggler,
//     openText,
//     title,
//     description
// }) => {
//   return (
//     <div>
//         <button className="btn" onClick={toggler}>{openText}</button>
//         <dialog id="my_modal_1" className="modal">
//         <div className="modal-box">
//             <h3 className="font-bold text-lg">{title}</h3>
//             <p className="py-4">{description}</p>
//             <div className="modal-action">
//             <form method="dialog">
//                 {
//                     children
//                 }
//                 <button>Close</button>
//             </form>
//             </div>
//         </div>
//         </dialog>
//     </div>
//   )
// }

// export default Modal

// ------- version 2 --------

import React, { useEffect, useRef } from "react";

interface IModal {
  children: React.ReactNode;
  toggler: () => void;
  showModal: boolean;
  openText?: string;
  title?: string;
  description?: string;
}

const Modal: React.FC<IModal> = ({
  children,
  showModal,
  toggler,
  title,
  description,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (showModal) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [showModal]);

  const handleClose = () => {
    toggler();
  };

  return (
    <dialog
      ref={modalRef}
      className="modal modal-bottom sm:modal-middle rounded-sm"
      onClose={handleClose}
    >
      <div className="modal-box">
        {title && <h3 className="font-bold text-lg">{title}</h3>}
        {description && <p className="py-4">{description}</p>}
        <div className="modal-content">{children}</div>
        <div className="modal-action">
          <button className="btn" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={handleClose}>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
