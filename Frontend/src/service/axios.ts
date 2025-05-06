
import axios, { AxiosInstance } from "axios";

const Api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,  // Use import.meta.env for Vite
    withCredentials: true
});

console.log("Base URL:", import.meta.env.VITE_BASE_URL); // Debugging

export default Api;





