import React from 'react';

interface IToastMessage {
    message: string; 
    type?: string;
}

const Toast: React.FC<IToastMessage> = ({ message, type }) => { 
  return (
    <div className="toast toast-top toast-center px-20 transition-all duration-500">
        <div className={`alert alert-${type}`}>
            <span>{message}</span>
        </div>
    </div>
  );
}

export default Toast;