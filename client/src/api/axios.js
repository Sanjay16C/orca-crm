import axios from "axios";

const api = axios.create({
    baseURL : process.env.REACT_APP_API_URL,
    withCredentials : true
});

api.interceptors.request.use((req)=>{
    const token = localStorage.getItem("accessToken");
    if(token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

api.interceptors.response.use(res=>res,async(error)=>{
    const originalReq = error.config;

    if(error.response?.status===401 && !originalReq._retry && originalReq.url!=="/auth/refresh"){
        try {
            originalReq._retry = true;

            const response = await api.post(
                "/auth/refresh"
                
            )
            const NewAccessToken = response.data.accessToken;
            localStorage.setItem("accessToken",NewAccessToken);
            originalReq.headers.Authorization = `Bearer ${NewAccessToken}`;
            return api(originalReq);

        } catch (error) {
            localStorage.removeItem("accessToken");
            window.location.href="/";
            return Promise.reject(error);
        }
    }
    return Promise.reject(error);
})

export default api;