import React from 'react';

interface IErrorMessage {
  message: string;
}

const ErrorText: React.FC<IErrorMessage> = ({ message }) => {
  return (
    <div className="flex text-xs items-center space-x-2 text-red-600 transition-all duration-500">
      <svg
        width="15"
        height="15"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="10" cy="10" r="10" fill="#EB5757" />
        <path
          d="M8.75 10L5 6.25L6.25 5L10 8.75L13.75 5L15 6.25L11.25 10L15 13.75L13.75 15L10 11.25L6.25 15L5 13.75L8.75 10Z"
          fill="white"
        />
      </svg>
      <span>{message}</span>
    </div>
  );
};

export default ErrorText;
