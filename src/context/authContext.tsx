"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { authReducer, initialState } from "./reducer";
import { IAuthProviderProps, IAuthContextValue } from "./interfaces";
import actions from "./actions";
import { useQuery } from "@tanstack/react-query";
import { confirmToken, store } from "@/utils";
import { api, urls } from "@/api";
import { IAuth, IUser } from "@/interfaces";

const AuthContext = createContext<IAuthContextValue | undefined>(undefined);

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();
  const pathname = usePathname();

  const token = store.getAccessToken();
  const isAuthenticated = !!token;

  const isTokenValid = useCallback(async () => {
    return await confirmToken(token);
  }, [token]);

  useEffect(() => {
    if (!isTokenValid && pathname !== "/login") {
      console.log("ME 1!");
      router.push("/login");
      return;
    }

    if (!isAuthenticated && pathname !== "/login") {
      console.log("ME 2!");
      router.push("/login");
    }
  }, [isAuthenticated, isTokenValid, pathname, router]);

  useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        if (!isAuthenticated) return;
        const response = await api.get(urls.auth.getUser);
        setUser(response.data.user);
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch user");
      }
    },
  });

  const login = (data: IAuth) => {
    dispatch({ type: actions.LOGIN, payload: data });
  };

  const setUser = (userData: IUser) => {
    dispatch({ type: actions.SET_USER, payload: userData });
  };

  const logout = () => {
    dispatch({ type: actions.LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, setUser, logout, user: state.user }}
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
