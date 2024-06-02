import { redirect } from "next/navigation";
import { store } from "@/utils";
import axios from "axios";
import { refreshToken } from ".";

export const BASEURL = process.env.BASE_URL;

const api = axios.create({
  baseURL: BASEURL,
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = store.getAccessToken();
    if (accessToken) {
      let accessExpiry: any = store.getAccessExpiry();
      if (accessExpiry) {
        accessExpiry = new Date(accessExpiry);
        if (accessExpiry && accessExpiry <= new Date()) {
          // Access token has expired, make a request to refresh token API
          const newAccessToken = await refreshToken();
          config.headers.Authorization = `Bearer ${newAccessToken}`;
        } else {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Logout due to unauthorized");
      store.removeAccessToken();
      store.removeAccessExpiry();
      redirect("/login");
    }
    return Promise.reject(error);
  }
);

export default api;
