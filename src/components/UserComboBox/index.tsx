import { SpotifyResponse } from "@/typings/spotify";
import { useSession } from "next-auth/react";
import LoginButton from "./LoginButton";
import User from "./User";
import styles from "./index.module.scss";

function UserComboBox() {
  const { data: response } = useSession();

  let content = <LoginButton />;

  if (response) {
    const { session, token } = response as unknown as SpotifyResponse;

    content = <User img={session.user.image} name={session.user.name} username={token.sub} />;
  }

  return (
    <nav className={styles.user} aria-label="User Session">
      {content}
    </nav>
  );
}

export default UserComboBox;
