import { api, urls } from ".";

interface ILoginPayload {
  email: string;
  password: string;
}

export const login = async (payload: ILoginPayload) => {
  try {
    const response = await api.post(urls.auth.login, payload, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};
