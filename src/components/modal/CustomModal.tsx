import React, { useState } from "react";

interface ICustomModal {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size: string;
  className: string;
}

const CustomModal: React.FC<ICustomModal> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  className = "",
}) => {
  if (!isOpen) return null;

  const sizeClasses: any = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center border-2 bg-black bg-opacity-50">
      <div
        className={`rounded-lg shadow-xl ${sizeClasses[size]} w-full h-[80%] bg-gray-900 p-6 ${className}`}
      >
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            ✕
          </button>
        </div>
        <div className="flex items-center justify-center w-full h-fit pb-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
