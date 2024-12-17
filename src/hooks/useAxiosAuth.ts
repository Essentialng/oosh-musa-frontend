import { useEffect } from "react";
import { axiosAuth } from "../axios/axios";


export function useAxiosAuth() {

  let token = "";
  if (typeof window !== "undefined")
    token = localStorage.getItem("_dl_token") || "";

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config?.headers?.["authorization"]) {
          //config.headers["Authorization"] = auth.authToken;
          config.headers!["authorization"] = "Bearer " + token;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => response
      // async (err: any) => {
      //   // The previous request that was rejected is saved in the err.config
      //   const prevRequest = err?.config;
      //   if (err?.response.status === 403 && !prevRequest.sent) {
      //     prevRequest.sent = true;
      //     const newAccessToken = await refresh();
      //     setAuth((prev: any) => ({ ...prev, authToken: newAccessToken }));
      //     prevRequest.headers["authorization"] = newAccessToken;
      //     //We have placed the new auth token, now we need to repeat the request
      //     return axiosAuth(prevRequest);
      //   }
      //   //if its is not a 403, we can pass the error forward as done below
      //   return Promise.reject(err);
      // }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return axiosAuth as any ;
}
