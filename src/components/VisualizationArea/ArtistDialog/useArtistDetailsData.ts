import { useQuery } from "@tanstack/react-query";
import { LastFMResponse } from "@/typings/last-fm";
import { useRaiderStore } from "@/containers";
import { isEmpty, isNil, isString, readableStringList, usePrevious } from "@jtmdias/js-utilities";
import { formatNumberWithCommas } from "./ArtistCover";
import { useEffect } from "react";

/**
 * Fetches Artists by their name
 */
async function getResultsByName(
  name?: string,
): Promise<LastFMResponse | undefined> {
  if (name) {
    const request = await fetch(encodeURI(`/api/artist-details/${name}`));
    const response: LastFMResponse = await request.json();

    return response;
  }

  return undefined
}

function useArtistDetailsData() {
  const currentArtist = useRaiderStore((state) => state.currentArtist);
  const PREVIOUS_CURRENT_ARTIST = usePrevious(currentArtist.name);
  const SHOULD_FETCH = !isNil(currentArtist) && !isNil(currentArtist.name) && PREVIOUS_CURRENT_ARTIST !== currentArtist.name;

  const { data, refetch, ...query } = useQuery<LastFMResponse | undefined>(
    ["search-artist-details-by-name", currentArtist.name],
    () => getResultsByName(currentArtist.name),
    { enabled: false, networkMode: "offlineFirst" }
  );

  useEffect(() => {
    if (SHOULD_FETCH) {
      refetch();
    }
  }, [SHOULD_FETCH, refetch])

  const genres = data?.artist?.tags?.tag?.map((tag) => tag.name);
  const count = data?.artist?.stats?.playcount;
  const playCount = formatNumberWithCommas(
    count && isString(count) ? parseInt(count as string) : 0
  );


  const ARTIST_DATA = {
    name: data?.artist?.name ?? "",
    listeners: data?.artist?.stats?.listeners ?? 0,
    cover: currentArtist.images?.[0],
    bio: isString(data?.artist?.bio?.content)
    ? data?.artist?.bio?.content.split("Full Wikipedia article:")[0].split(` <a href="https://www.last.fm`)[0]
    : undefined,
    genres: !isEmpty(genres) && Array.isArray(genres) ? readableStringList(genres as string[]) : "-",
    playCount,
    popularityScore: currentArtist.popularity ? `${currentArtist.popularity}%` : undefined,
    onTour: data?.artist?.ontour === "1" ? "Yes" : "No",

  }

  return {
    data: ARTIST_DATA,
    ...query
  };
}

export default useArtistDetailsData;
