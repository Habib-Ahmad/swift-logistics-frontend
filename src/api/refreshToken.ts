"use server";
import axios from "axios";
import { store } from "@/utils";
import { BASEURL } from ".";
import { cookies } from "next/headers";

export const refreshToken = async () => {
  try {
    const response = await axios.post(
      `${BASEURL}/users/refreshToken`,
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
    cookies().delete("refreshToken");
    throw error;
  }
};
