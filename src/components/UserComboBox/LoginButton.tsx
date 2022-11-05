import { callIfExists } from "@feedzai/react-a11y-tools";
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
    <button type="button" className={styles.user__button} onClick={handleOnClick}>
      Login with Spotify
    </button>
  );
}

export default LoginButton;
