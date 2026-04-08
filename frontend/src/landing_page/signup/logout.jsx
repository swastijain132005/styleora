import { setAccessToken } from "../../utils/token";
import axiosClient from "../../../config/axios";


const logout = async ({setIsAuth}) => {
  try {
    const res = await axiosClient.post("/api/auth/logout");


    // 🔥 clear access token
    setAccessToken(null);

    console.log("Logout success");

    // redirect
    window.location.href = "/login";

  } catch (err) {
    console.error("Logout failed", err);
  }
};

export default logout;