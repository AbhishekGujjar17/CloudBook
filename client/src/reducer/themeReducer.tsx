import { THEME_REDUCER_ACTION_TYPE } from "../types/enum";
import { ThemeActionType, ThemeType } from "../types/types";

const themeReducer = (theme: ThemeType, action: ThemeActionType): ThemeType => {
  switch (action.type) {
    case THEME_REDUCER_ACTION_TYPE.TOGGLE_THEME: {
      const newMode = theme.mode === "white" ? "#1f2937" : "white";
      localStorage.setItem("mode", newMode);
      return { ...theme, mode: newMode };
    }
    default:
      return theme;
  }
};

export default themeReducer;
