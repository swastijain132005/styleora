
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // 🔥 required for cookies
});

axiosClient.interceptors.request.use( 
  (res)=>res,(err)=>{
    if(err.response.status === 401){
      window.location.href = "/login";
      return Promise.reject(err);
  }
  }
);



export default axiosClient;