export interface IVehicle {
  id: string;
  brand: string;
  carModel: string;
  year: string;
  color: string;
  registrationNumber: string;
  type: "saloon" | "bus" | "bike";
  transmission?: "automatic" | "manual";
  status: "idle" | "in transit" | "inactive" | "decomissioned";
}
