import { createContext, ReactNode, useEffect, useState } from "react";

type ThemeProps = {
  isDarkModeOn: boolean;
  handleSetIsDarkModeOn: () => void;
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext({} as ThemeProps);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkModeOn, setIsDarkModeOn] = useState<boolean>(false);

  function handleSetIsDarkModeOn() {
    setIsDarkModeOn(!isDarkModeOn);
  }

  useEffect(() => {
    if(isDarkModeOn) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("my_todos:theme", JSON.stringify(true))
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("my_todos:theme", JSON.stringify(false))
    }
  }, [isDarkModeOn])

  const value = {
    isDarkModeOn,
    handleSetIsDarkModeOn,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
