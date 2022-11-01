import { signOut } from "next-auth/react";
import styles from "./index.module.scss";

function UserMenu({ username }: { username: string }): JSX.Element {
  const handleOnClick = () => {
    signOut();
  };

  const profileUrl = `https://open.spotify.com/user/${username}`;

  return (
    <ul role="menu" className={styles["user-menu__menu"]}>
      <li role="menuitem" className={styles["user-menu__item"]}>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles["user-menu__profile"]}
        >
          Spotify Profile
        </a>
      </li>
      <li role="menuitem" className={styles["user-menu__item"]}>
        <button className={styles["user__button"]} onClick={handleOnClick}>
          Log out of Spotify
        </button>
      </li>
    </ul>
  );
}

export default UserMenu;
