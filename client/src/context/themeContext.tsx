import { ReactNode, createContext, useContext, useReducer } from "react";
import themeReducer from "../reducer/themeReducer";
import { ThemeActionType, ThemeType } from "../types/types";

const initialTheme = {
  mode: localStorage.getItem("mode") || "white",
};

const ThemeContext = createContext<{
  theme: ThemeType;
  dispatchTheme: React.Dispatch<ThemeActionType>;
}>({
  theme: initialTheme,
  dispatchTheme: () => undefined,
});

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, dispatchTheme] = useReducer(themeReducer, initialTheme);

  return (
    <ThemeContext.Provider value={{ theme, dispatchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

//custom hook
//const useTheme = () => useContext(ThemeContext);

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
export { ThemeProvider, useTheme };
