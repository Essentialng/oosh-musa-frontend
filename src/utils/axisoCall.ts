// import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
// import toast from "react-hot-toast";
// import { getClientErrorMessage } from "./errorHandler";

// const BASE_URL = process.env.REACT_APP_API_URL;

// const axiosInstance: AxiosInstance = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });

// interface IFetch {
//     url: string;
//     method: 'POST' | 'GET' | 'PUT' | 'DELETE';
//     payload?: any;
//     onSuccess?: (data: any) => void;
//     onFailure?: (error: any) => void;
//     final?: () => void;
//     headers?: Record<string, string>;
// }

// export const fetchData = async ({
//     url,
//     method,
//     payload,
//     onSuccess,
//     onFailure,
//     final,
//     headers = {}
// }: IFetch): Promise<any> => {
//     try {
//         const config = {
//             url,
//             method,
//             headers: {
//                 ...headers
//             },
//             ...(method !== 'GET' ? { data: payload } : {}),
//             ...(method === 'GET' ? { params: payload } : {})
//         };

//         const response = await axiosInstance(config);

//         if (onSuccess) {
//             onSuccess(response.data);
//         }

//         return response.data;

//     } catch (error: unknown) {
//         const clientError = getClientErrorMessage(error);
        
//         // Log the full error for debugging
//         console.error('[API Error]:', {
//             url,
//             method,
//             error,
//             clientError
//         });

//         // Show user-friendly error message
//         toast.error(clientError.message);
        
//         if (onFailure) {
//             onFailure(clientError);
//         }

//         // Return a rejected promise with the formatted error
//         return Promise.reject(clientError);
//     } finally {
//         if (final) {
//             final();
//         }
//     }
// };

// ------------- version 2 --------------------


import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import toast from "react-hot-toast";

const BASE_URL = process.env.REACT_APP_API_URL;

// Create axios instance with base configuration
const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

interface IFetch {
    url: string;
    method: 'POST' | 'GET' | 'PUT' | 'DELETE';
    payload?: any;
    onSuccess?: (data: any) => void;
    onFailure?: (error: any) => void;
    final?: () => void;
    headers?: Record<string, string>;
}

export const fetchData = async ({
    url,
    method,
    payload,
    onSuccess,
    onFailure,
    final,
    headers = {}
}: IFetch) => {
    try {
        // Configure request
        const config: AxiosRequestConfig = {
            url,
            method,
            headers: {
                ...headers
            }
        };

        // Add payload for non-GET requests
        if (method !== 'GET' && payload) {
            config.data = payload;
        }

        // Add payload as params for GET requests
        if (method === 'GET' && payload) {
            config.params = payload;
        }

        // Make request using the instance with baseURL
        const response = await axiosInstance(config);

        // Handle success
        if (onSuccess) {
            onSuccess(response.data);
        }

        return response.data;

    } catch (error:any) {
        // Handle error
        if (onFailure) {
            onFailure(error);
        }
        toast.error(error?.response?.data?.Message)
        // throw error;
    } finally {
        // Cleanup
        if (final) {
            final();
        }
    }
};