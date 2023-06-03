import { useContext } from "react";
import { ThemeContext } from "../context/Theme";

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "Theme.* component muse be rendered as a child of Tile component"
    );
  }
  return context;
}
