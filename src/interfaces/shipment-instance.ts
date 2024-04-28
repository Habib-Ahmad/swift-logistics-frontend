export interface IShipmentInstance {
  id: string;
  name: string;
  date: Date | string;
  shipmentId: string;
  vehicleId: string;
  driverId: string;
  items: string[];
  status: "pending" | "in progress" | "completed" | "cancelled";
}

export interface IUpdateShipmentInstance {
  id: string;
  date?: Date | string;
  vehicleId?: string;
  driverId?: string;
  items?: string[];
  status?: "pending" | "in progress" | "completed" | "cancelled";
}
