import actions from "./actions";
import { IAction, IAuthState } from "./interfaces";

export const initialState: IAuthState = {
  isAuthenticated: false,
  user: null,
};

export const authReducer = (state: IAuthState, action: IAction) => {
  switch (action.type) {
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
