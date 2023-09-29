import { SpotifyResponse } from "@/typings/spotify";
import { useSession } from "next-auth/react";
import LoginButton from "./LoginButton";
import User from "./User";
import styles from "./index.module.scss";

function UserComboBox() {
  const { data: response } = useSession();

  let content = <LoginButton />;

  const HAS_SESSION = !!response;

  if (HAS_SESSION) {
    const { session, token } = response as unknown as SpotifyResponse;

    content = <User img={session.user.image} name={session.user.name} username={token.sub} />;
  }

  return (
    <nav
      id="authentication"
      className={styles.user}
      tabIndex={-1}
      aria-label="User Session"
      data-testid="header-authentication"
    >
      {content}
    </nav>
  );
}

export default UserComboBox;
