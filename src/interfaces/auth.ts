import { IUser } from ".";

export interface IAuth {
  accessToken: string;
  accessExpiry: string;
  user: IUser;
}
