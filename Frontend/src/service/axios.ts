import axios, { AxiosInstance } from "axios";


const Api:AxiosInstance = axios.create({
    // baseURL:"http://localhost:3000",
    baseURL:"http://13.202.106.237",
    withCredentials:true
});

export default Api





