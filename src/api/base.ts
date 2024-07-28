import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
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