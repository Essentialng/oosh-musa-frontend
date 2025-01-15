// import axios from "axios";
// import { ApiError } from "../type/error.types";

// export class AppError extends Error {
//     code: string;
//     status: number;
  
//     constructor(message: string, code: string = 'UNKNOWN_ERROR', status: number = 500) {
//       super(message);
//       this.code = code;
//       this.status = status;
//     }
//   }
  
//   export const getClientErrorMessage = (error: any): ApiError => {
//     if (error instanceof AppError) {
//       return {
//         message: error.message,
//         code: error.code,
//         status: error.status
//       };
//     }
  
//     if (axios.isAxiosError(error)) {
//       const status = error.response?.status;
//       // Return user-friendly messages based on status codes
//       switch (status) {
//         case 400:
//           return { message: 'Invalid request. Please check your input.', status };
//         case 401:
//           return { message: 'Please login to continue.', status };
//         case 403:
//           return { message: 'You don\'t have permission to perform this action.', status };
//         case 404:
//           return { message: 'The requested resource was not found.', status };
//         case 429:
//           return { message: 'Too many requests. Please try again later.', status };
//         case 500:
//           return { message: 'Something went wrong. Please try again later.', status };
//         default:
//           return { message: 'An unexpected error occurred. Please try again.', status };
//       }
//     }
  
//     return { message: 'An unexpected error occurred. Please try again.' };
//   };



//   ------- version 2 --------
// utils/errorHandler.ts
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export const getClientErrorMessage = (error: unknown): ApiError => {
  // If it's an axios error
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data?.message || error.message;
    const status = error.response?.status;

    switch (status) {
      case 400:
        return { message: errorMessage || 'Invalid request. Please check your input.', status };
      case 401:
        return { message: errorMessage || 'Please login to continue.', status };
      case 403:
        return { message: errorMessage || 'You don\'t have permission to perform this action.', status };
      case 404:
        return { message: errorMessage || 'The requested resource was not found.', status };
      case 429:
        return { message: errorMessage || 'Too many requests. Please try again later.', status };
      case 500:
        return { message: errorMessage || 'Something went wrong. Please try again later.', status };
      default:
        return { message: errorMessage || 'An unexpected error occurred. Please try again.', status };
    }
  }

  // If it's an Error object
  if (error instanceof Error) {
    return { 
      message: error.message || 'An unexpected error occurred.',
      code: 'UNKNOWN_ERROR'
    };
  }

  // If it's an object with a message
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return {
      message: String(error.message),
      code: 'UNKNOWN_ERROR'
    };
  }

  // For all other cases
  return { 
    message: 'An unexpected error occurred. Please try again.',
    code: 'UNKNOWN_ERROR'
  };
};

// Updated fetchData utility
