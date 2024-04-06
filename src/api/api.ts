import { store } from "@/utils";
import axios from "axios";
import { refreshToken } from ".";

export const BASEURL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: BASEURL,
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = store.getAccessToken();
    if (accessToken) {
      let accessExpiry: string | Date | null | undefined =
        store.getAccessExpiry();
      if (accessExpiry) {
        accessExpiry = new Date(parseInt(accessExpiry));
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

export default api;
