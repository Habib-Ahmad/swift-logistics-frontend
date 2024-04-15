import { IDriver } from "@/interfaces";
import { api, urls } from ".";

export const getAllDrivers = async () => {
  try {
    const response = await api.get(urls.drivers.getAll);
    return response.data.drivers;
  } catch (error) {
    throw new Error("Failed to fetch driver");
  }
};

export const addDriver = async (payload: IDriver) => {
  try {
    const response = await api.post(urls.drivers.register, payload);
    return response.data;
  } catch (error) {
    throw new Error("Creation failed");
  }
};

export const updateDriver = async (payload: IDriver) => {
  try {
    const response = await api.patch(
      `${urls.drivers.update}/${payload.id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw new Error("Update failed");
  }
};
