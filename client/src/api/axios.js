import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
// const BASE_URL = "https://freedom-codes-api.onrender.com/";
export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
