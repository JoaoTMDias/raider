import * as Ariakit from "@ariakit/react";
import Image from "next/image";
import styles from "./index.module.scss";
import { isString } from "@jtmdias/js-utilities";
import { SpotifyArtistImage } from "@/typings/spotify";
import { Skeleton } from "@/components/Skeleton";

interface ArtistCoverProps {
  name: string;
  listeners: string | number;
  cover?: SpotifyArtistImage;
  isLoading?: Boolean;
}

export function formatNumberWithCommas(originalNumber: number): string {
  return new Intl.NumberFormat("en-US", { maximumSignificantDigits: 3 }).format(originalNumber);
}

export function ArtistCover({
  name = "",
  listeners = 0,
  cover,
  isLoading = false,
}: ArtistCoverProps) {
  const activeListeners = formatNumberWithCommas(
    isString(listeners) ? parseInt(listeners) : listeners
  );

  function renderHeading() {
    if (isLoading) {
      return (
        <Skeleton className={styles.artistDetails__cover__title} width="192px" height="40px" />
      );
    }

    return (
      <Ariakit.DialogHeading
        className={styles.artistDetails__cover__title}
        data-testid="artist-details-title"
      >
        {name}
      </Ariakit.DialogHeading>
    );
  }

  function renderActiveListeners() {
    if (isLoading) {
      return (
        <Skeleton className={styles.artistDetails__cover__title} width="178px" height="18px" />
      );
    }

    return <p data-testid="artist-details-listeners">{`${activeListeners} listeners (Last.fm)`}</p>;
  }

  function renderImage() {
    if (isLoading) {
      return (
        <Skeleton
          className={styles.artistDetails__cover__image}
          width="440px"
          height="330px"
          hideBackground
        />
      );
    }

    return (
      <Image
        className={styles.artistDetails__cover__image}
        src={cover?.url as string}
        width={cover?.width}
        height={cover?.height}
        alt=""
        data-testid="artist-details-cover"
      />
    );
  }

  return (
    <section className={styles.artistDetails__cover}>
      <div className={styles.artistDetails__cover__heading}>
        {renderHeading()}
        {renderActiveListeners()}
      </div>
      {renderImage()}
    </section>
  );
}
