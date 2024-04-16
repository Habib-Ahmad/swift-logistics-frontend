import { IStation } from "@/interfaces";
import { api, urls } from ".";

export const getAllStations = async () => {
  try {
    const response = await api.get(urls.stations.getAll);
    return response.data.stations;
  } catch (error) {
    throw new Error("Failed to fetch station");
  }
};

export const addStation = async (payload: IStation) => {
  try {
    const response = await api.post(urls.stations.register, payload);
    return response.data;
  } catch (error) {
    throw new Error("Creation failed");
  }
};

export const updateStation = async (payload: IStation) => {
  try {
    const response = await api.patch(
      `${urls.stations.update}/${payload.id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw new Error("Update failed");
  }
};

export const deleteStation = async (id: string) => {
  try {
    const response = await api.delete(`${urls.stations.delete}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Deletion failed");
  }
};
