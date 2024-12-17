import axios, { AxiosInstance } from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const axiosAuth: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   // "Content-Type": "application/json",
  // },
});
