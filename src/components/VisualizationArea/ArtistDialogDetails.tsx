import { Button } from "ariakit/button";
import { Dialog, DialogDismiss, DialogHeading, useDialogState } from "ariakit/dialog";
import styles from "./index.module.scss";

export default function ArtistDialogDetails() {
  const dialog = useDialogState();

  return (
    <>
      <Button onClick={dialog.toggle} className={styles.artistDialog__toggle}>
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path
            fill="currentColor"
            d="M64 0C28.7 0 0 28.7 0 64v384c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zm96 320h64c44.2 0 80 35.8 80 80 0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16 0-44.2 35.8-80 80-80zm96-96c0 35.3-28.7 64-64 64s-64-28.7-64-64 28.7-64 64-64 64 28.7 64 64zM144 64h96c8.8 0 16 7.2 16 16s-7.2 16-16 16h-96c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
          ></path>
        </svg>
        <span>Artist Details</span>
      </Button>
      <Dialog state={dialog} className={styles.artistDialog__dialog}>
        <DialogDismiss className={styles.artistDialog__dismiss}>
          <span className="sr-only">Dismiss Dialog</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256l105.3-105.4z"></path>
          </svg>
        </DialogDismiss>
        <DialogHeading className={styles.artistDialog__heading}>Artist Details</DialogHeading>
        <p className="description">
          Your payment has been successfully processed. We have emailed your receipt.
        </p>
        <div></div>
      </Dialog>
    </>
  );
}
