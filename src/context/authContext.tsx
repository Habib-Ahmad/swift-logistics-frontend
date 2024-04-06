"use client";
import { createContext, useContext, useEffect, useReducer } from "react";
import { authReducer, initialState } from "./reducer";
import { IAuthProviderProps, IAuthContextValue } from "./interfaces";
import actions from "./actions";
import { IUser } from "@/interface/user";
import { usePathname, useRouter } from "next/navigation";

const AuthContext = createContext<IAuthContextValue | undefined>(undefined);

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = !!state.user;

  useEffect(() => {
    if (!isAuthenticated && pathname !== "/login") {
      router.push("/login");
    }
  }, [isAuthenticated, pathname, router]);

  const setUser = (userData: IUser) => {
    dispatch({ type: actions.SET_USER, payload: userData });
  };

  const logout = () => {
    dispatch({ type: actions.LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setUser, logout, user: state.user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = (): IAuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthContextProvider.");
  }
  return context;
};
