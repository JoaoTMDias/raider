import { Dialog, DialogDismiss } from "ariakit/dialog";
import styles from "./index.module.scss";
import { DisclosureState } from "ariakit";
import useArtistDetailsData from "./useArtistDetailsData";
import { ArtistCover } from "./ArtistCover";
import { ArtistSong } from "./ArtistSong";
import { ArtistBio } from "./ArtistBio";

export function ArtistDetails({ dialog }: { dialog: DisclosureState }) {
  const { data, isSuccess } = useArtistDetailsData();

  function renderMetadata() {
    return (
      <dl className={styles.artistDialog__meta} data-testid="dialog-meta">
        {data.genres && (
          <div className={styles.artistDialog__meta__item}>
            <dt data-testid="dialog-genre-label">Genres</dt>
            <dd data-testid="dialog-genre-value">{data.genres}</dd>
          </div>
        )}
        {data.onTour && (
          <div className={styles.artistDialog__meta__item}>
            <dt data-testid="dialog-tour-label">On Tour</dt>
            <dd data-testid="dialog-tour-value">{data.onTour}</dd>
          </div>
        )}
        {data.popularityScore && (
          <div className={styles.artistDialog__meta__item}>
            <dt data-testid="dialog-popularity-label">Popularity Score</dt>
            <dd data-testid="dialog-popularity-label">{data.popularityScore}</dd>
          </div>
        )}
        {data.playCount && (
          <div className={styles.artistDialog__meta__item}>
            <dt data-testid="dialog-playcount-label">Play Count</dt>
            <dd data-testid="dialog-playcount-label">{data.playCount}</dd>
          </div>
        )}
      </dl>
    );
  }

  if (isSuccess && data) {
    return (
      <Dialog state={dialog} className={styles.artistDialog__dialog} data-testid="dialog">
        <DialogDismiss className={styles.artistDialog__dismiss} data-testid="dialog-dismiss">
          <span className="sr-only">Dismiss Dialog</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256l105.3-105.4z"></path>
          </svg>
        </DialogDismiss>
        <ArtistCover name={data.name} listeners={data.listeners} cover={data.cover} />
        <section className={styles.artistDialog__content}>
          <h2 className="sr-only">Metadata</h2>
          {renderMetadata()}
          {data.bio && <ArtistBio description={data.bio} />}
          <div className={styles.artistDialog__popular}>
            <h2>Popular tracks</h2>
            <ol className={styles.popularTracks}>
              <ArtistSong />
            </ol>
          </div>
        </section>
        <div></div>
      </Dialog>
    );
  }

  return null;
}
