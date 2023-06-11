import { Button } from "ariakit/button";
import styles from "./index.module.scss";
import { MouseEventHandler } from "react";

export function ArtistTrigger({ onClick }: { onClick?: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <Button onClick={onClick} className={styles.artistDialog__toggle} data-testid="dialog-toggle">
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path
          fill="currentColor"
          d="M64 0C28.7 0 0 28.7 0 64v384c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zm96 320h64c44.2 0 80 35.8 80 80 0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16 0-44.2 35.8-80 80-80zm96-96c0 35.3-28.7 64-64 64s-64-28.7-64-64 28.7-64 64-64 64 28.7 64 64zM144 64h96c8.8 0 16 7.2 16 16s-7.2 16-16 16h-96c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
        ></path>
      </svg>
      <span>Artist Details</span>
    </Button>
  );
}
