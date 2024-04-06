import axios from "axios";
import { store } from "@/utils";
import { BASEURL, urls } from ".";

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
