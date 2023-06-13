import styles from "./index.module.scss";
import useArtistDetailsData from "./useArtistDetailsData";
import { ArtistCover } from "./ArtistCover";
import { ArtistSong } from "./ArtistSong";
import { ArtistBio } from "./ArtistBio";

function ArtistDetails() {
  const { data, isSuccess } = useArtistDetailsData();

  function renderMetadata() {
    return (
      <dl className={styles.artistDetails__meta} data-testid="dialog-meta">
        {data?.genres && (
          <div className={styles.artistDetails__meta__item}>
            <dt data-testid="dialog-genre-label">Genres</dt>
            <dd data-testid="dialog-genre-value">{data.genres}</dd>
          </div>
        )}
        {data?.onTour && (
          <div className={styles.artistDetails__meta__item}>
            <dt data-testid="dialog-tour-label">On Tour</dt>
            <dd data-testid="dialog-tour-value">{data.onTour}</dd>
          </div>
        )}
        {data?.popularityScore && (
          <div className={styles.artistDetails__meta__item}>
            <dt data-testid="dialog-popularity-label">Popularity Score</dt>
            <dd data-testid="dialog-popularity-label">{data.popularityScore}</dd>
          </div>
        )}
        {data?.playCount && (
          <div className={styles.artistDetails__meta__item}>
            <dt data-testid="dialog-playcount-label">Play Count</dt>
            <dd data-testid="dialog-playcount-label">{data.playCount}</dd>
          </div>
        )}
      </dl>
    );
  }

  if (isSuccess && data) {
    return (
      <aside className={styles.artistDetails__wrapper} data-testid="dialog">
        <ArtistCover name={data.name ?? ""} listeners={data.listeners ?? 0} cover={data.cover} />
        <section className={styles.artistDetails__content}>
          <h2 className="sr-only">Metadata</h2>
          {renderMetadata()}
          {data.bio && <ArtistBio description={data.bio} />}
          <div className={styles.artistDetails__popular}>
            <h2>Popular tracks</h2>
            {data.popularTracks && (
              <ol className={styles.popularTracks}>
                {data.popularTracks?.map((popularTrack) => (
                  <ArtistSong
                    key={popularTrack.id}
                    id={popularTrack.id}
                    name={popularTrack.name}
                    source={popularTrack.source}
                    cover={popularTrack.cover}
                    href={popularTrack.href}
                  />
                ))}
              </ol>
            )}
          </div>
        </section>
        <div></div>
      </aside>
    );
  }

  return null;
}

export default ArtistDetails;
