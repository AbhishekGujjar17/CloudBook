import { AUTH_REDUCER_ACTION_TYPE } from "../types/enum";
import { AuthActionType, AuthType } from "../types/types";

const authReducer = (auth: AuthType, action: AuthActionType): AuthType => {
  switch (action.type) {
    case AUTH_REDUCER_ACTION_TYPE.LOGIN: {
      localStorage.setItem("token", action.payload || "");
      localStorage.setItem("isLoggedIn", "true");
      return { ...auth, isLoggedIn: true, token: action.payload };
    }
    case AUTH_REDUCER_ACTION_TYPE.LOGOUT: {
      localStorage.removeItem("token");
      localStorage.setItem("isLoggedIn", "false");
      return { ...auth, isLoggedIn: false, token: null };
    }
    default: {
      return auth;
    }
  }
};

export default authReducer;
