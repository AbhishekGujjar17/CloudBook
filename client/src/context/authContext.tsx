import { ReactNode, createContext, useContext, useReducer } from "react";
import { AuthType } from "../types/types";
import authReducer from "../reducer/authReducer";
import axios from "axios";

const initialAuth = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  token: localStorage.getItem("token") || null,
};

const AuthContext = createContext<{
  auth: AuthType;
  dispatch: React.Dispatch<any>;
}>({
  auth: initialAuth,
  dispatch: () => undefined,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, dispatch] = useReducer(authReducer, initialAuth);
  axios.defaults.headers.common["auth-token"] = auth?.token;

  return (
    <AuthContext.Provider value={{ auth, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

//custom hook
const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
