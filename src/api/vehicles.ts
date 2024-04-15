import { IVehicle } from "@/interfaces";
import { api, urls } from ".";

export const getAllVehicles = async () => {
  try {
    const response = await api.get(urls.vehicles.getAll);
    return response.data.vehicles;
  } catch (error) {
    throw new Error("Failed to fetch user");
  }
};

export const addVehicle = async (payload: IVehicle) => {
  try {
    const response = await api.post(urls.vehicles.register, payload);
    return response.data;
  } catch (error) {
    throw new Error("Creation failed");
  }
};

export const updateVehicle = async (payload: IVehicle) => {
  try {
    const response = await api.patch(
      `${urls.vehicles.update}/${payload.id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw new Error("Update failed");
  }
};

export const deleteVehicle = async (id: string) => {
  try {
    const response = await api.delete(`${urls.vehicles.update}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Deletion failed");
  }
};
