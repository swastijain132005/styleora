import { getAccessToken, setAccessToken } from "./token";
const uri = process.env.VITE_BACKEND_URL || "http://localhost:3000";

const fetchWithAuth = async (url, options = {}) => {
  let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
    credentials: "include", // IMPORTANT
  });

  // 🔥 if access token expired
  if (res.status === 401) {
    // call refresh API
    const refreshRes = await fetch("http://localhost:3000/api/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    if (!refreshRes.ok) {
      // refresh failed → logout user
      console.log("Session expired");
      return res;
    }

    const data = await refreshRes.json();

    // store new access token
    setAccessToken(data.accessToken);

    // retry original request
    res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
      credentials: "include",
    });
  }

  return res;
};

export default fetchWithAuth;