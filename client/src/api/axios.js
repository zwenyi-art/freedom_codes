import axios from "axios";
const BASE_URL = "http://192.168.1.103:3500";
export default axios.create({
  baseURL: import.meta.env.VITE_APP_REMOTE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_APP_REMOTE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
