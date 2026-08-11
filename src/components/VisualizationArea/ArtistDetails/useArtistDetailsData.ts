import { useQuery } from "@tanstack/react-query";
import { LastFMResponse } from "@/typings/last-fm";
import { useRaiderStore } from "@/containers";
import { isEmpty, isNil, isString, readableStringList, usePrevious } from "@jtmdias/js-utilities";
import { formatNumberWithCommas } from "./ArtistCover";
import { useEffect } from "react";
import { ArtistItem, ArtistTopTracks } from "@/typings/artist";
import { ArtistDetails, ArtistDetailsTrack } from "./types";
import { filterImagesBySize } from "@/helpers";


/**
 * Fetches Artists by their name
 */
async function getArtistDetails(
  artist?: ArtistItem,
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

  const sortedArtistImages = (artist.images ?? []).slice().sort((a, b) => {
    const left = a.height ?? 0;
    const right = b.height ?? 0;

    return left - right;
  });
  const largestArtistImage = sortedArtistImages[sortedArtistImages.length - 1];

  try {
    if (artist.name) {
      const request = await fetch(encodeURI(`/api/popular-tracks/${artist.name}`));

      if (request.ok) {
        const tracksResponse: ArtistTopTracks = await request.json();
        const { tracks } = tracksResponse;
        const artistsPopularTracks: ArtistDetails["popularTracks"] = tracks?.map((track) => {
          return {
            id: track.id || track.name || "",
            cover: track.album?.images?.length
              ? {
                  url: filterImagesBySize(track.album?.images),
                  height: 64,
                  width: 64,
                }
              : undefined,
            name: track.name || "",
            href: track.href
          } as ArtistDetailsTrack
        }).filter((track) => !!track.name);

        result = {
          ...result,
          popularTracks: artistsPopularTracks
        };
      } else {
        console.error(`Failed to fetch popular tracks: ${request.status} ${request.statusText}`);
      }
    }

    if (artist?.name) {
      const request = await fetch(encodeURI(`/api/artist-details/${artist.name}`));

      if (request.ok) {
        const detailsResponse: LastFMResponse = await request.json();

        const count = detailsResponse?.artist?.stats?.playcount;
        const listeners = detailsResponse?.artist?.stats?.listeners ? parseInt(detailsResponse?.artist?.stats?.listeners) : 0;

        result = {
          ...result,
          cover: largestArtistImage,
          listeners,
          bio: isString(detailsResponse?.artist?.bio?.content)
            ? detailsResponse?.artist?.bio?.content.split("Full Wikipedia article:")[0].split(` <a href="https://www.last.fm`)[0]
            : undefined,
          playCount: formatNumberWithCommas(
            count && isString(count) ? parseInt(count as string) : 0
          ),
          onTour: detailsResponse?.artist?.ontour === "1" ? "Yes" : "No",
        }
      } else {
        console.error(`Failed to fetch artist details: ${request.status} ${request.statusText}`);
      }
    }
  } catch (error) {
    console.error('Error fetching artist details:', error);
  }

  return result;
}

function useArtistDetailsData() {
  const featuredArtist = useRaiderStore((state) => state.featuredArtist);
  const PREVIOUS_CURRENT_ARTIST = usePrevious(featuredArtist.name);
  const SHOULD_FETCH = !isNil(featuredArtist) && !isNil(featuredArtist.name) && PREVIOUS_CURRENT_ARTIST !== featuredArtist.name;

  const { data, refetch, ...query } = useQuery<ArtistDetails | undefined>({
    queryKey: ["search-artist-details-by-name", featuredArtist.id],
    queryFn: () => getArtistDetails(featuredArtist),
    enabled: false,
    networkMode: "offlineFirst",
  });

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
