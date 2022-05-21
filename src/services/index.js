import axios from "axios";
import interceptors from "./interceptors";

const api = axios.create({
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    baseURL:"http://localhost:8000/",
    withCredentials: true
});
api.interceptors.response.use(function (config){
   return config;
}, function(error){
    interceptors(error.response);
});

const setBearerToken = token => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export { setBearerToken };
export default api;
