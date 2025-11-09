import { useSession } from "next-auth/react";
import LoginButton from "./LoginButton";
import User from "./User";
import styles from "./index.module.scss";

function UserComboBox() {
  const { data: session } = useSession();

  let content = <LoginButton />;

  if (session?.user) {
    const { image, name, email } = session.user;

    content = (
      <User
        img={image || ''}
        name={name || ''}
        username={email || ''}
      />
    );
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
