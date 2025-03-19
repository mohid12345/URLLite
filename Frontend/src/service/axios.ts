
import axios, { AxiosInstance } from "axios";

const Api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,  // Use import.meta.env for Vite
    withCredentials: true
});

console.log("Base URL:", import.meta.env.VITE_BASE_URL); // Debugging

export default Api;




//case 2
// import axios, { AxiosInstance } from "axios";

// const Api: AxiosInstance = axios.create({
//     baseURL: process.env.REACT_APP_BASE_URL , 
//     withCredentials: true
// });

// export default Api;




// case1
// import axios, { AxiosInstance } from "axios";


// const Api: AxiosInstance = axios.create({

//     baseURL: "http://13.202.106.237",
//         // baseURL:"http://localhost:3000",
//     withCredentials: true
// });

// export default Api





