import { setAccessToken } from "../../utils/token";

const uri = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const logout = async () => {
  try {
    const res = await fetch(`${uri}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Logout failed");

    // 🔥 clear access token
    setAccessToken(null);

    console.log("Logout success");

    // redirect
    window.location.href = "/login";

  } catch (err) {
    console.error("Logout failed", err);
  }
};