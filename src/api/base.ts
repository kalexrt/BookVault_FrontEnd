import axios from "axios";
import { axiosDefaultTimeout, baseHeader, baseURL } from "../constants/constants";

export const instance = axios.create({
  baseURL: baseURL,
  timeout: axiosDefaultTimeout,
  headers: baseHeader,
});

//add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);