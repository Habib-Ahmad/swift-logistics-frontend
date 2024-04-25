import { IStation } from "./station";

export interface ICreateShipment {
  name: string;
  startPoint: IStation | string;
  destination: IStation | string;
  schedule: {
    frequency: "" | "daily" | "weekly" | "monthly";
    interval: number | null;
    timesPerDay?: number | null;
    dayOfWeek?:
      | ""
      | "monday"
      | "tuesday"
      | "wednesday"
      | "thursday"
      | "friday"
      | "saturday"
      | "sunday";
    dayOfMonth?: number | null;
  };
  vehicleId?: string | null;
  driverId?: string | null;
}

export interface IShipment {
  id: string;
  name: string;
  startPoint: IStation | string;
  destination: IStation | string;
  schedule: {
    frequency: "daily" | "weekly" | "monthly";
    interval: number;
    timesPerDay?: number;
    dayOfWeek?:
      | ""
      | "monday"
      | "tuesday"
      | "wednesday"
      | "thursday"
      | "friday"
      | "saturday"
      | "sunday";
    dayOfMonth?: number;
  };
  status: "active" | "inactive";
}
