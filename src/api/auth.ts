import axios from "axios";
import { BASEURL, urls } from ".";
import { store } from "@/utils";

interface ILoginPayload {
  email: string;
  password: string;
}

export const login = async (payload: ILoginPayload) => {
  try {
    const response = await axios.post(BASEURL + urls.auth.login, payload, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const refreshToken = async () => {
  try {
    const response = await axios.post(
      BASEURL + urls.auth.refreshToken,
      {},
      {
        withCredentials: true,
      }
    );
    store.setAccessToken(response.data.accessToken);
    store.setAccessExpiry(response.data.accessExpiry);

    return response.data.accessToken;
  } catch (error) {
    store.removeAccessToken();
    store.removeAccessExpiry();
    throw new Error("Failed to fetch refresh token");
  }
};
