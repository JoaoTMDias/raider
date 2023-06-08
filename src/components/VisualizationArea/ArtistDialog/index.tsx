import { Button } from "ariakit/button";
import { Dialog, DialogDismiss, DialogHeading, useDialogState } from "ariakit/dialog";
import Image from "next/image";
import styles from "./index.module.scss";
import { useCallback, useRef, useState } from "react";

function formatNumberWithCommas(originalNumber: number): string {
  return new Intl.NumberFormat("en-US", { maximumSignificantDigits: 3 }).format(originalNumber);
}

function ArtistBio() {
  const [expanded, setExpanded] = useState(false);

  const onClick = () => setExpanded(!expanded);

  const buttonText = expanded ? "Collapse" : "Expand";

  return (
    <div className={styles.artistDialog__bio}>
      <h2 className="sr-only">Biography</h2>
      <p className={styles.artistDialog__bio__text} data-testid="dialog-bio">
        NOFX is a punk rock band from Los Angeles, California, United States, formed in 1983 and
        will officially permanently disband in 2023. The original lineup included singer/bassist Fat
        Mike, drummer Erik Sandin, and guitarist Eric Melvin. Since 1991, the lineup has remained
        the same, with El Hefe playing guitar and trumpet. They have released 14 full-length studio
        albums, 15 EPs, 2 live albums, and many 7" singles. The group has sold over 6 million
        records worldwide, making them one of the most successful independent acts of all time.{" "}
        <a href="https://www.last.fm/music/NOFX">Read more on Last.fm</a>
      </p>
      <button type="button" onClick={onClick} className={styles.artistDialog__bio__toggle}>
        {buttonText}
      </button>
    </div>
  );
}

function ArtistCover() {
  return (
    <section className={styles.artistDialog__cover}>
      <div className={styles.artistDialog__cover__heading}>
        <DialogHeading className={styles.artistDialog__cover__title} data-testid="dialog-title">
          NOFX
        </DialogHeading>
        <p data-testid="dialog-listeners">{`${formatNumberWithCommas(
          1209638
        )} listeners (Last.fm)`}</p>
      </div>
      <Image
        className={styles.artistDialog__cover__image}
        src="https://i.scdn.co/image/ab6772690000dd22ddcf65625878991cf30658be"
        width="645"
        height="640"
        alt=""
        data-testid="dialog-cover"
      />
    </section>
  );
}

type PlayStatus = "paused" | "playing";

function ArtistSong() {
  const [playingStatus, setPlayingStatus] = useState<PlayStatus>("paused");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOnClick = useCallback(() => {
    if (audioRef.current) {
      const nextStatus: PlayStatus = playingStatus === "paused" ? "playing" : "paused";

      setPlayingStatus(nextStatus);

      nextStatus === "playing" ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [playingStatus]);

  function renderPlayingStatusIcon() {
    return playingStatus === "paused" ? (
      <path
        fill="currentColor"
        d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
      />
    ) : (
      <path
        fill="currentColor"
        d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"
      />
    );
  }

  return (
    <li className={styles.popularTracks__item}>
      <button
        className={styles.popularTracks__action}
        type="button"
        onClick={handleOnClick}
        aria-label={playingStatus === "paused" ? "Play" : "Pause"}
      >
        <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24">
          {renderPlayingStatusIcon()}
        </svg>
      </button>
      <Image
        src="https://i.scdn.co/image/ab67616d0000485131ce63f1e36e1a164510cdb5"
        width="64"
        height="64"
        alt=""
      />
      <a href="https://open.spotify.com/album/6Z8BYH27wINoUk4QMUx7gh">Linoleum</a>
      <audio ref={audioRef}>
        <source
          src="https://p.scdn.co/mp3-preview/24a34752afcf058ffe4a1148bbc24f5020b8f6c7?cid=0b297fa8a249464ba34f5861d4140e58"
          type="audio/mpeg"
        ></source>
        Your browser does not support the audio element.
      </audio>
    </li>
  );
}

export default function ArtistDialogDetails() {
  const dialog = useDialogState();
  return (
    <>
      <Button
        onClick={dialog.toggle}
        className={styles.artistDialog__toggle}
        data-testid="dialog-toggle"
      >
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path
            fill="currentColor"
            d="M64 0C28.7 0 0 28.7 0 64v384c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zm96 320h64c44.2 0 80 35.8 80 80 0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16 0-44.2 35.8-80 80-80zm96-96c0 35.3-28.7 64-64 64s-64-28.7-64-64 28.7-64 64-64 64 28.7 64 64zM144 64h96c8.8 0 16 7.2 16 16s-7.2 16-16 16h-96c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
          ></path>
        </svg>
        <span>Artist Details</span>
      </Button>
      <Dialog state={dialog} className={styles.artistDialog__dialog} data-testid="dialog">
        <DialogDismiss className={styles.artistDialog__dismiss} data-testid="dialog-dismiss">
          <span className="sr-only">Dismiss Dialog</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256l105.3-105.4z"></path>
          </svg>
        </DialogDismiss>
        <ArtistCover />
        <section className={styles.artistDialog__content}>
          <h2 className="sr-only">Metadata</h2>
          <dl className={styles.artistDialog__meta} data-testid="dialog-meta">
            <div className={styles.artistDialog__meta__item}>
              <dt data-testid="dialog-genre-label">Genres</dt>
              <dd data-testid="dialog-genre-value">Punk, Skate Punk, Socal Pop Punk</dd>
            </div>
            <div className={styles.artistDialog__meta__item}>
              <dt data-testid="dialog-tour-label">On Tour</dt>
              <dd data-testid="dialog-tour-value">Yes</dd>
            </div>
            <div className={styles.artistDialog__meta__item}>
              <dt data-testid="dialog-popularity-label">Popularity Score</dt>
              <dd data-testid="dialog-popularity-label">62%</dd>
            </div>
            <div className={styles.artistDialog__meta__item}>
              <dt data-testid="dialog-playcount-label">Play Count</dt>
              <dd data-testid="dialog-playcount-label">{`${formatNumberWithCommas(66743637)}`}</dd>
            </div>
          </dl>
          <ArtistBio />
          <div className={styles.artistDialog__popular}>
            <h2>Popular tracks</h2>
            <ol className={styles.popularTracks}>
              <ArtistSong />
            </ol>
          </div>
        </section>
        <div></div>
      </Dialog>
    </>
  );
}
