import { DialogHeading } from "ariakit/dialog";
import Image from "next/image";
import styles from "./index.module.scss";
import { isEmpty, isNil, isString } from "@jtmdias/js-utilities";
import { SpotifyArtistImage } from "@/typings/spotify";

interface ArtistCoverProps {
  name: string;
  listeners: string | number;
  cover?: SpotifyArtistImage;
}

export function formatNumberWithCommas(originalNumber: number): string {
  return new Intl.NumberFormat("en-US", { maximumSignificantDigits: 3 }).format(originalNumber);
}

export function ArtistCover({ name = "", listeners = 0, cover }: ArtistCoverProps) {
  const activeListeners = formatNumberWithCommas(
    isString(listeners) ? parseInt(listeners) : listeners
  );

  return (
    <section className={styles.artistDetails__cover}>
      <div className={styles.artistDetails__cover__heading}>
        <DialogHeading className={styles.artistDetails__cover__title} data-testid="dialog-title">
          {name}
        </DialogHeading>
        {activeListeners && (
          <p data-testid="dialog-listeners">{`${activeListeners} listeners (Last.fm)`}</p>
        )}
      </div>
      {!isNil(cover) && !isEmpty(cover) && (
        <Image
          className={styles.artistDetails__cover__image}
          src={cover.url as string}
          width={cover.width}
          height={cover.height}
          alt=""
          data-testid="dialog-cover"
        />
      )}
    </section>
  );
}
