import { IShipmentInstance, IUpdateShipmentInstance } from "@/interfaces";
import { api, urls } from ".";

export const getAllShipmentInstances = async () => {
  try {
    const response = await api.get(urls.shipmentInstances.getAll);
    return response.data.shipments;
  } catch (error) {
    throw new Error("Failed to fetch shipments");
  }
};

export const addShipmentInstance = async (payload: IShipmentInstance) => {
  try {
    const response = await api.post(urls.shipmentInstances.register, payload);
    return response.data;
  } catch (error) {
    throw new Error("Creation failed");
  }
};

export const updateShipmentInstance = async (
  payload: IUpdateShipmentInstance
) => {
  try {
    const response = await api.patch(
      `${urls.shipmentInstances.update}/${payload.id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw new Error("Update failed");
  }
};

export const deleteShipmentInstance = async (id: string) => {
  try {
    const response = await api.delete(`${urls.shipmentInstances.delete}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Deletion failed");
  }
};
