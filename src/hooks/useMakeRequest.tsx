// import { KeyValueObj } from "../type/other.types";
// import { useAxiosAuth } from "./useAxiosAuth";
// import useLogout from "./useLogout";
// import toast from "react-hot-toast";

import toast from "react-hot-toast";
import { KeyValueObj } from "../type/other.types";
import { useAxiosAuth } from "./useAxiosAuth";
import useLogout from "./useLogout";

// interface IRequestOptions {
//   successMessageTitle?: string;
//   dontNotifyonFail?: boolean;
//   dontNotifyOnSucess?: boolean;
//   useToast?: boolean;
// }

// export function useMakeRequest() {
//   const axiosAuth = useAxiosAuth();
//   const logout = useLogout();

//   return async (
//     url: string,
//     method: string,
//     formData: KeyValueObj,
//     onSuccess: (data?: any, metadata?: any, pagination?: any, headers?: any) => void,
//     onFail: (error?: any) => void,
//     onFinally: () => void,
//     options?: IRequestOptions
//   ) => {
//     const dontNotifyOnSucess = options?.dontNotifyOnSucess;
//     const dontNotifyonFail = options?.dontNotifyonFail;

//     try {
//       const response = await axiosAuth[method.toLowerCase()](url, formData);

//       if (response.data.status) {
//         const { message, data, metadata, pagination} = response.data;
//         const responseHeader = response?.config?.headers;
//         console.log({ responseHeader });

//         if (!dontNotifyOnSucess) {
//           if (typeof message === "string" && message?.length > 0) {
//             toast.success(message);
//           } else if (Array.isArray(message)) {
//             message?.map((mess: string) => toast.success(mess));
//           } else {
//             toast.success("Operation successful");
//           }
//         }

//         onSuccess(data, metadata, pagination, responseHeader);
//         return data;
//       } else {
//         const message = response?.data?.message;
//         if (message) {
//           if (typeof message === "string" && message.length > 0) {
//             toast.error(message);
//           } else if (typeof message === "object") {
//             message?.map((mess: string) => toast.error(mess));
//           } else {
//             toast.error("Something went wrong, please try again.");
//           }
//         } else {
//           toast.error("Something went wrong, please try again.");
//         }
//       }
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err: any) {
//         if (err?.response?.request?.status === 401) {
//             return logout();
//         }
        
//         if (!dontNotifyonFail) {
//             const message = 
//                 err?.response?.data?.message || 
//                 err?.message || 
//                 "Something went wrong, please try again";
            
//             if (typeof message === "string") {
//                 toast.error(message);
//             } else if (Array.isArray(message)) {
//                 message.forEach((mess: string) => toast.error(mess));
//             }
//         }
    
//         onFail(err);
//     } finally {
//       onFinally();
//     }
//   };
// }

// ------- version 2 ----------


interface IRequestOptions {
  successMessageTitle?: string;
  dontNotifyonFail?: boolean;
  dontNotifyOnSucess?: boolean;
  useToast?: boolean;
}

export function useMakeRequest() {
    const axiosAuth = useAxiosAuth();
    const logout = useLogout();
  
    return async (
      url: string,
      method: string,
      formData: KeyValueObj,
      onSuccess: (data?: any, metadata?: any, pagination?: any, headers?: any) => void,
      onFail: (error?: any) => void,
      onFinally: () => void,
      options?: IRequestOptions
    ) => {
      const dontNotifyOnSucess = options?.dontNotifyOnSucess;
      const dontNotifyonFail = options?.dontNotifyonFail;
  
      try {
        // console.log('Request URL:', url);
        // console.log('Request Method:', method);
        // console.log('Request Data:', formData);
  
        const response = await axiosAuth[method.toLowerCase()](url, formData);
  
        // console.log('Full Response:', response);
        // console.log('Response Data:', response.data);
  
        // If response doesn't have data or status, log more details
        if (!response.data) {
          console.error('No data in response');
          toast.error('No data received from server');
          return;
        }
  
        if (response.data.status) {
          const { message, data, metadata, pagination} = response;
        //   console.log('Extracted Data:', { message, data, metadata, pagination });
  
          // ... rest of your existing code
          onSuccess(data, metadata, pagination);
          return data;
        } else {
          const message = response?.data?.message;
          console.log('Error Message:', message);
          
          // ... rest of your existing error handling
        }
      } catch (err: any) {
        console.error('Request Error:', err);
        console.error('Error Response:', err.response);
        console.error('Error Data:', err.response?.data);
  
        if (err?.response?.status === 401) {
          return logout();
        }
  
        const errorMessage = 
          err?.response?.data?.message || 
          err?.message || 
          "Something went wrong, please try again";
        
        toast.error(errorMessage);
        onFail(err);
      } finally {
        onFinally();
      }
    };
  }