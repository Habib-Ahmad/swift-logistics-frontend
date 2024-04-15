export interface IDriver {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: Date | string;
  phone: string;
  address: string;
  status: "idle" | "in transit" | "inactive" | "terminated";
}
