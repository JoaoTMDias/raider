import Image from "next/image";
import { signOut } from "next-auth/react";
import styles from "./index.module.scss";

interface Props {
  img: string;
  name: string;
  username: string;
}

function User({ img, name }: Props): JSX.Element {
  const handleOnClick = () => {
    signOut();
  };

  return (
    <div className={styles["user-info"]} data-testid="header-user">
      <div className={styles["user-info__profile"]}>
        <Image
          className={styles["user-info__profile__image"]}
          src={img}
          width="24"
          height="24"
          loading="lazy"
          alt=""
          data-testid="header-user-image"
        />
        <p data-testid="header-user-name">
          <span className="sr-only">Signed In on Spotify as</span>
          <span>{name}</span>
        </p>
      </div>
      <button
        type="button"
        className={styles["user__button"]}
        onClick={handleOnClick}
        data-testid="header-user-logout"
      >
        Log out <span className="sr-only">of Spotify</span>
      </button>
    </div>
  );
}

export default User;
