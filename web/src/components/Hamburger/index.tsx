import { List, SignOut, X } from "phosphor-react";
import { useAuth } from "../../hooks/useAuth";
import { ThemeToggler } from "../ThemeToggler";

type Props = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

export function Hamburger({ isMenuOpen, toggleMenu }: Props) {
  const { currentUser, handleLogout } = useAuth();

  return (
    <div>
      <div className="relative">
        <button
          onClick={toggleMenu}
          type="button"
          className="text-zinc-900 dark:text-white absolute z-10 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
        >
          {isMenuOpen ? (
            <X weight="bold" size={28} />
          ) : (
            <List weight="bold" size={28} />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div className="w-[100vw] h-[100vh] bg-zinc-100 dark:bg-zinc-900 flex flex-col items-center justify-center gap-36 absolute top-0 left-0 right-0 bottom-0">
          <span className="font-medium text-zinc-900 dark:text-white text-[1.7rem]">
            {currentUser!.name}
          </span>
          <ThemeToggler />
          <button
            className="font-medium small:text-xl text-2xl text-zinc-900 dark:text-white flex items-center gap-4 cursor-pointer hover:brightness-[.85] transition-all duration-150 p-3 rounded-md bg-white dark:bg-[#444]"
            onClick={handleLogout}
          >
            <SignOut
              weight="bold"
              className="dark:text-white text-zinc-900"
              size={26}
            />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
