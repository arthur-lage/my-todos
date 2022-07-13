import { Eye, EyeSlash } from "phosphor-react";
import { useEffect } from "react";

interface RevealPasswordButtonProps {
  isShowingPassword: boolean;
  setIsShowingPassword: (boolean: boolean) => void;
}

export const RevealPasswordButton = ({
  setIsShowingPassword,
  isShowingPassword,
}: RevealPasswordButtonProps) => {
  function toggleRevealPassword() {
    setIsShowingPassword(!isShowingPassword);
  }

  return (
    <button type="button" onClick={toggleRevealPassword}>
      {isShowingPassword ? (
        <EyeSlash weight="bold" color="#222" />
      ) : (
        <Eye weight="bold" color="#222" />
      )}
    </button>
  );
};
