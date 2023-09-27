import Image from "next/image";
import styles from "./index.module.scss";
import { useCallback, useRef, useState } from "react";
import { ArtistDetailsTrack } from "./types";

type PlayStatus = "paused" | "playing";

export function ArtistSong({ id, cover, source, name, href }: ArtistDetailsTrack) {
  const [playingStatus, setPlayingStatus] = useState<PlayStatus>("paused");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOnClickOnPlayer = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      event.stopPropagation();

      if (audioRef.current) {
        const nextStatus: PlayStatus = playingStatus === "paused" ? "playing" : "paused";

        setPlayingStatus(nextStatus);

        nextStatus === "playing" ? audioRef.current.play() : audioRef.current.pause();
      }
    },
    [playingStatus]
  );

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
    <li id={id} className={styles.popularTracks__item}>
      <button
        className={styles.popularTracks__action}
        type="button"
        onClick={handleOnClickOnPlayer}
        aria-pressed={playingStatus === "playing"}
        aria-label={playingStatus === "paused" ? "Play" : "Pause"}
        data-playing-status={playingStatus}
      >
        <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24">
          {renderPlayingStatusIcon()}
        </svg>
        <Image src={cover.url ?? ""} width={cover.width} height={cover.height} alt="" />
        <span>{name}</span>
        <audio ref={audioRef}>
          <source src={source} type="audio/mpeg"></source>
          Your browser does not support the audio element.
        </audio>
      </button>
    </li>
  );
}
