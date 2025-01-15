import toast from "react-hot-toast";
import { KeyValueObj } from "../type/other.types";
import { useAxiosAuth } from "./useAxiosAuth";
import useLogout from "./useLogout";

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
        const response = await axiosAuth[method.toLowerCase()](url, formData);
  
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