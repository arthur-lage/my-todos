import { Moon, Sun } from "phosphor-react";

import { useTheme } from "../../hooks/useTheme";

export function ThemeToggler() {
  const { isDarkModeOn, handleSetIsDarkModeOn } = useTheme();

  return (
    <div
      onClick={handleSetIsDarkModeOn}
      className="shadow-[0_0_7.5px_3px_rgba(0,0,0,0.2)] cursor-pointer flex items-center justify-center rounded-full p-2 w-14 h-14 bg-white dark:bg-[#292929]"
    >
      {isDarkModeOn ? (
        <Moon size={28} color="#fff" weight="fill" />
      ) : (
        <Sun size={28} color="#222" weight="fill" />
      )}
    </div>
  );
}
