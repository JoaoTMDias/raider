import Image from "next/image";
import { useState } from "react";
import styles from "./index.module.scss";
import UserMenu from "./UserMenu";

interface Props {
  img: string;
  name: string;
  username: string;
}

function User({ img, name, username }: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnToggle = () => {
    console.log("toggle");
    setIsOpen(!isOpen);
  };

  return (
    <details className={styles["user-menu"]} data-open={isOpen}>
      <summary
        className={styles["user-menu__toggle"]}
        role="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={handleOnToggle}
      >
        <Image
          className={styles["user-menu__toggle__image"]}
          src={img}
          width="24"
          height="24"
          loading="lazy"
          alt=""
        />
        <span>
          <span className="sr-only">Signed In as</span>
          {name}
        </span>
        <span className={styles["user-menu__toggle__chevron"]}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 4">
            <path
              fill="#fff"
              d="m.427.427 3.396 3.396a.25.25 0 0 0 .354 0L7.573.427A.25.25 0 0 0 7.396 0H.604a.25.25 0 0 0-.177.427Z"
            />
          </svg>
        </span>
      </summary>
      <UserMenu username={username} />
    </details>
  );
}

export default User;
