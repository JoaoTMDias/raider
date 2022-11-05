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
    <div className={styles["user-info"]}>
      <div className={styles["user-info__profile"]}>
        <Image
          className={styles["user-info__profile__image"]}
          src={img}
          width="24"
          height="24"
          loading="lazy"
          alt=""
        />
        <p>
          <span className="sr-only">Signed In on Spotify as</span>
          {name}
        </p>
      </div>
      <button type="button" className={styles["user__button"]} onClick={handleOnClick}>
        Log out <span className="sr-only">of Spotify</span>
      </button>
    </div>
  );
}

export default User;
