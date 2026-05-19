import axios from "axios";
import { Navigate } from "react-router-dom";
const api = axios.create({
    baseURL : process.env.REACT_APP_API_URL
});

api.interceptors.request.use((req)=>{
    const token = localStorage.getItem("token");
    if(token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

api.interceptors.response.use(res=>res,(error)=>{
    if(error.response?.status===401){
        localStorage.removeItem("token");
        window.location.href="/";
    }
    return Promise.reject(error);
})

export default api;