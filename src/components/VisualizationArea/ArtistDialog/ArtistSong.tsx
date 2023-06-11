import Image from "next/image";
import styles from "./index.module.scss";
import { useCallback, useRef, useState } from "react";

type PlayStatus = "paused" | "playing";

export function ArtistSong() {
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
