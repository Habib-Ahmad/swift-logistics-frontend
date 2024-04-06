import axios from "axios";
import { BASEURL, urls } from ".";

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
