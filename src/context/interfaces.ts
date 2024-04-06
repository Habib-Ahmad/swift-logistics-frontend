import { IAuth, IUser } from "@/interfaces";

export interface IAuthState {
  isAuthenticated: boolean;
  user: IUser | null;
}

export interface IAction {
  type: string;
  payload?: any;
}

export interface IAuthContextValue {
  isAuthenticated: boolean;
  user: IUser;
  setUser: (userData: IUser) => void;
  login: (data: IAuth) => void;
  logout: () => void;
}

export interface IAuthProviderProps {
  children: React.ReactNode;
}
