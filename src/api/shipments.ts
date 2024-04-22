import { IShipment } from "@/interfaces";
import { api, urls } from ".";

export const getAllShipments = async () => {
  try {
    const response = await api.get(urls.shipments.getAll);
    return response.data.shipments;
  } catch (error) {
    throw new Error("Failed to fetch station");
  }
};

export const addShipment = async (payload: IShipment) => {
  try {
    const response = await api.post(urls.shipments.register, payload);
    return response.data;
  } catch (error) {
    throw new Error("Creation failed");
  }
};

export const updateShipment = async (payload: IShipment) => {
  try {
    const response = await api.patch(
      `${urls.shipments.update}/${payload.id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw new Error("Update failed");
  }
};

export const deleteShipment = async (id: string) => {
  try {
    const response = await api.delete(`${urls.shipments.delete}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Deletion failed");
  }
};
