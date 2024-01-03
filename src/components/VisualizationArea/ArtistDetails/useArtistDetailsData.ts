import { useQuery } from "@tanstack/react-query";
import { LastFMResponse } from "@/typings/last-fm";
import { useRaiderStore } from "@/containers";
import { isEmpty, isNil, isString, readableStringList, usePrevious } from "@jtmdias/js-utilities";
import { formatNumberWithCommas } from "./ArtistCover";
import { useEffect } from "react";
import { SpotifyArtistItem, SpotifyArtistTopTracks } from "@/typings/spotify";
import { ArtistDetails, ArtistDetailsTrack } from "./types";
import { filterImagesBySize } from "@/helpers";


/**
 * Fetches Artists by their name
 */
async function getArtistDetails(
  artist?: SpotifyArtistItem,
): Promise<ArtistDetails | undefined> {
  if (isNil(artist)) {
    return Promise.resolve(undefined);
  }

  let result: ArtistDetails = {
    id: artist.id!,
    name: artist.name,
    genres: !isEmpty(artist.genres) && Array.isArray(artist.genres) ? readableStringList(artist.genres as string[]) : "-",
    popularityScore: artist.popularity ? `${artist.popularity}%` : undefined,
  }

  if (artist.id) {
    const request = await fetch(encodeURI(`/api/popular-tracks/${artist.id}`));
    const tracksResponse: SpotifyArtistTopTracks = await request.json();
    const { tracks } = tracksResponse;
    const playableTracks = tracks?.filter((track) => Boolean(track.is_playable));

    const artistsPopularTracks: ArtistDetails["popularTracks"] = playableTracks?.map((track) => {
      return {
        id: track.id,
        cover: {
          url: filterImagesBySize(track.album?.images),
          height: 64,
          width: 64,
        },
        source: track.preview_url,
        name: track.name,
        href: track.href
      } as ArtistDetailsTrack
    });

    result = {
      ...result,
      popularTracks: artistsPopularTracks
    };
  }

  if (artist?.name) {
    const request = await fetch(encodeURI(`/api/artist-details/${artist.name}`));
    const detailsResponse: LastFMResponse = await request.json();

    const count = detailsResponse?.artist?.stats?.playcount;
    const listeners = detailsResponse?.artist?.stats?.listeners ? parseInt(detailsResponse?.artist?.stats?.listeners) : 0;

    result = {
      ...result,
      cover: artist?.images?.[0],
      listeners,
      bio: isString(detailsResponse?.artist?.bio?.content)
        ? detailsResponse?.artist?.bio?.content.split("Full Wikipedia article:")[0].split(` <a href="https://www.last.fm`)[0]
        : undefined,
      playCount: formatNumberWithCommas(
        count && isString(count) ? parseInt(count as string) : 0
      ),
      onTour: detailsResponse?.artist?.ontour === "1" ? "Yes" : "No",
    }
  }

  return result;
}

function useArtistDetailsData() {
  const featuredArtist = useRaiderStore((state) => state.featuredArtist);
  const PREVIOUS_CURRENT_ARTIST = usePrevious(featuredArtist.name);
  const SHOULD_FETCH = !isNil(featuredArtist) && !isNil(featuredArtist.name) && PREVIOUS_CURRENT_ARTIST !== featuredArtist.name;

  const { data, refetch, ...query } = useQuery<ArtistDetails | undefined>(
    ["search-artist-details-by-name", featuredArtist.id],
    () => getArtistDetails(featuredArtist),
    { enabled: false, networkMode: "offlineFirst" }
  );

  useEffect(() => {
    if (SHOULD_FETCH) {
      refetch();
    }
  }, [SHOULD_FETCH, refetch]);

  return {
    data,
    ...query
  };
}

export default useArtistDetailsData;
