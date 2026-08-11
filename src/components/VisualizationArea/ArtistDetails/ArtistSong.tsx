import Image from "next/image";
import styles from "./index.module.scss";
import { ArtistDetailsTrack } from "./types";
import { FALLBACK_IMAGE, isPlaceholderImageUrl } from "@/helpers";

export function ArtistSong({ id, cover, name, href }: ArtistDetailsTrack) {
  const coverUrl =
    cover?.url && !isPlaceholderImageUrl(cover.url) ? cover.url : FALLBACK_IMAGE;

  return (
    <li id={id} className={styles.popularTracks__item} data-testid="artist-details-song">
      <a
        className={styles.popularTracks__action}
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${name} on Last.fm`}
        data-testid="artist-details-song-button"
      >
        <Image
          src={coverUrl}
          width={cover?.width ?? 64}
          height={cover?.height ?? 64}
          alt=""
          data-testid="artist-details-song-icon-cover"
        />
        <span data-testid="artist-details-song-name">{name}</span>
      </a>
    </li>
  );
}
