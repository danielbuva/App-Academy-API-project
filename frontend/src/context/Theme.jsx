import { createContext, useState } from "react";

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isNightMode, setIsNightMode] = useState(false);

  const toggleMode = () => {
    setIsNightMode(!isNightMode);
  };

  const theme = {
    colors: {
      background: isNightMode ? "222" : "fff",
      text: isNightMode ? "fff" : "222",
    },
    isNightMode,
    toggleMode,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}
