"use client";
import { createContext, useContext, useEffect, useReducer } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authReducer, initialState } from "./reducer";
import { IAuthProviderProps, IAuthContextValue } from "./interfaces";
import actions from "./actions";
import { useQuery } from "@tanstack/react-query";
import { store } from "@/utils";
import { BASEURL, api, urls } from "@/api";
import { IAuth, IUser } from "@/interfaces";

const AuthContext = createContext<IAuthContextValue | undefined>(undefined);

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();
  const pathname = usePathname();

  const token = store.getAccessToken();
  const isAuthenticated = !!token;

  useEffect(() => {
    if (!isAuthenticated && pathname !== "/login") {
      router.push("/login");
    }
  }, [isAuthenticated, pathname, router]);

  useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await api.get(`${BASEURL}${urls.auth.getUser}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user);
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
