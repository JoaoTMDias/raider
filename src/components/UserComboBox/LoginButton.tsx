import { callIfExists } from "@jtmdias/js-utilities";
import { signIn } from "next-auth/react";
import { useCallback } from "react";
import styles from "./index.module.scss";

interface Props {
  onSignIn?: () => void;
}

function LoginButton({ onSignIn }: Props): JSX.Element {
  const handleOnClick = useCallback(() => {
    callIfExists(signIn);
    callIfExists(onSignIn);
  }, [onSignIn]);

  return (
    <button
      type="button"
      className={styles.user__button}
      onClick={handleOnClick}
      data-testid="header-user-login"
    >
      Login with Spotify
    </button>
  );
}

export default LoginButton;
