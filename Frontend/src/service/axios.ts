import axios, { AxiosInstance } from "axios";

const Api: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL , 
    withCredentials: true
});

export default Api;


// import axios, { AxiosInstance } from "axios";


// const Api: AxiosInstance = axios.create({

//     baseURL: "http://13.202.106.237",
//         // baseURL:"http://localhost:3000",
//     withCredentials: true
// });

// export default Api





