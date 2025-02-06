import { useState } from "react";

interface IForget {
  showModal: boolean;
  closeModal: () => void;
  children?: any;
}

const MainModal: React.FC<IForget> = ({ showModal, closeModal, children }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-[999]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          className="text-red-500 hover:bg-neutral-200 rounded-full p-2 w-10 h-10"
          onClick={closeModal}
        >
          &times;
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default MainModal;
