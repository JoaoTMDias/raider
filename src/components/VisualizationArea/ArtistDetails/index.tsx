import styles from "./index.module.scss";
import useArtistDetailsData from "./useArtistDetailsData";
import { ArtistCover } from "./ArtistCover";
import { ArtistSong } from "./ArtistSong";
import { ArtistBio } from "./ArtistBio";
import { makeId } from "@jtmdias/react-a11y-tools";
import { Skeleton } from "@/components/Skeleton";

function ArtistDetails() {
  const { data, isFetching, isSuccess } = useArtistDetailsData();

  const SHOW_CONTENT = !!(data && isSuccess && !isFetching);

  function renderMetadata() {
    if (!SHOW_CONTENT) {
      return (
        <div className={styles.artistDetails__meta}>
          <Skeleton width="424px" height="180px" hideBackground />
        </div>
      );
    }

    return (
      <dl className={styles.artistDetails__meta} data-testid="artist-details-meta">
        {data?.genres && (
          <div className={styles.artistDetails__meta__item}>
            <dt data-testid="artist-details-genre-label">Genres</dt>
            <dd data-testid="artist-details-genre-value">{data.genres}</dd>
          </div>
        )}
        {data?.onTour && (
          <div className={styles.artistDetails__meta__item}>
            <dt data-testid="artist-details-tour-label">On Tour</dt>
            <dd data-testid="artist-details-tour-value">{data.onTour}</dd>
          </div>
        )}
        {data?.popularityScore && (
          <div className={styles.artistDetails__meta__item}>
            <dt data-testid="artist-details-popularity-label">Popularity Score</dt>
            <dd data-testid="artist-details-popularity-value">{data.popularityScore}</dd>
          </div>
        )}
        {data?.playCount && (
          <div className={styles.artistDetails__meta__item}>
            <dt data-testid="artist-details-playcount-label">Play Count</dt>
            <dd data-testid="artist-details-playcount-value">{data.playCount}</dd>
          </div>
        )}
      </dl>
    );
  }

  return (
    <aside
      id="artist-details"
      className={styles.artistDetails__wrapper}
      tabIndex={-1}
      data-testid="artist-details"
    >
      <ArtistCover
        name={data?.name ?? ""}
        listeners={data?.listeners ?? 0}
        cover={data?.cover}
        isLoading={!SHOW_CONTENT}
      />
      <section className={styles.artistDetails__content}>
        <h2 className="sr-only">Metadata</h2>
        {renderMetadata()}
        {SHOW_CONTENT && data.bio ? (
          <ArtistBio description={data?.bio} />
        ) : (
          <Skeleton width="392px" height="136px" hideBackground />
        )}
        {SHOW_CONTENT && data.popularTracks ? (
          <div className={styles.artistDetails__popular} data-testid="artist-details-tracks">
            <h2 data-testid="artist-details-tracks-title">Popular tracks</h2>
            <ol className={styles.popularTracks} data-testid="artist-details-tracks-list">
              {data.popularTracks?.map((popularTrack, index) => {
                const id = makeId("artist-song", popularTrack.id, index);

                return (
                  <ArtistSong
                    key={id}
                    id={id}
                    name={popularTrack.name}
                    source={popularTrack.source}
                    cover={popularTrack.cover}
                    href={popularTrack.href}
                  />
                );
              })}
            </ol>
          </div>
        ) : null}
      </section>
      <div></div>
    </aside>
  );
}

export default ArtistDetails;
