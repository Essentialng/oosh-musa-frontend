// import axios from "axios"

// interface IFetch {
//     url: string,
//     method: 'post' | 'get' | 'put' | 'delete',
//     payload?: any,
//     onSucess?: (data: any)=>void,
//     onFailure?: ()=>void,
//     final?: ()=>void
// }

// const useFetch = ()=>{
//     try {
//         const data = await axios.method()
//     } catch (error) {
        
//     }
// }

// ------ version 2 ---------
import axios, { AxiosRequestConfig } from "axios";

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
                'Content-Type': 'application/json',
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

        // Make request
        const response = await axios(config);

        // Handle success
        if (onSuccess) {
            onSuccess(response.data);
        }

        return response.data;

    } catch (error) {
        // Handle error
        if (onFailure) {
            onFailure(error);
        }
        throw error;
    } finally {
        // Cleanup
        if (final) {
            final();
        }
    }
};