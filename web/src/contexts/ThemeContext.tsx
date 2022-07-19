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
    localStorage.setItem("my_todos:theme", JSON.stringify(!isDarkModeOn));
    setIsDarkModeOn(!isDarkModeOn);
  }

  useEffect(() => {
    if (JSON.parse(String(localStorage.getItem("my_todos:theme"))) == true) {
      setIsDarkModeOn(true);
    } else {
      setIsDarkModeOn(false);
    }

    if (isDarkModeOn) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkModeOn]);

  const value = {
    isDarkModeOn,
    handleSetIsDarkModeOn,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
