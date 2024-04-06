import { store } from "@/utils";
import actions from "./actions";
import { IAction, IAuthState } from "./interfaces";

export const initialState: IAuthState = {
  isAuthenticated: false,
  user: null,
};

export const authReducer = (state: IAuthState, action: IAction) => {
  switch (action.type) {
    case actions.LOGIN:
      const { accessToken, accessExpiry, user } = action.payload;
      store.setAccessToken(accessToken);
      store.setAccessExpiry(accessExpiry);
      return {
        ...state,
        user: user,
        isAuthenticated: true,
      };
    case actions.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case actions.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
