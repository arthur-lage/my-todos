import { Eye, EyeSlash } from "phosphor-react";

interface RevealPasswordButtonProps {
  isShowingPassword: boolean;
  setIsShowingPassword: (boolean: boolean) => void;
}

export const RevealPasswordButton = ({
  setIsShowingPassword,
  isShowingPassword,
  ...rest
}: RevealPasswordButtonProps) => {
  function toggleRevealPassword() {
    setIsShowingPassword(!isShowingPassword);
  }

  return (
    <button {...rest} type="button" onClick={toggleRevealPassword}>
      {isShowingPassword ? (
        <EyeSlash weight="bold" size={20} color="#222" />
      ) : (
        <Eye weight="bold" size={20} color="#222" />
      )}
    </button>
  );
};
