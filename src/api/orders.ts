import { ICreateOrder, IOrder } from "@/interfaces";
import { api, urls } from ".";

export const getAllOrders = async () => {
  try {
    const response = await api.get(urls.orders.getAll);
    return response.data.orders;
  } catch (error) {
    throw new Error("Failed to fetch orders");
  }
};

export const addOrder = async (payload: ICreateOrder) => {
  console.log("%^&*(", payload);
  try {
    const response = await api.post(urls.orders.register, payload);
    return response.data;
  } catch (error) {
    throw new Error("Creation failed");
  }
};

export const updateOrder = async (payload: IOrder) => {
  try {
    const response = await api.patch(
      `${urls.orders.update}/${payload.id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw new Error("Update failed");
  }
};

export const deleteOrder = async (id: string) => {
  try {
    const response = await api.delete(`${urls.orders.delete}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Deletion failed");
  }
};
