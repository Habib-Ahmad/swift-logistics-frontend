export interface IShipment {
  id: string;
  name: string;
  startPoint: string;
  destination: string;
  schedule: {
    frequency: "daily" | "weekly" | "monthly";
    interval: number;
    dayOfWeek?:
      | ""
      | "monday"
      | "tuesday"
      | "wednesday"
      | "thursday"
      | "friday"
      | "saturday"
      | "sunday";
  };
  status: "active" | "inactive";
}
