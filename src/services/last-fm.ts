import {
  LastFMArtistSearchResponse,
  LastFMResponse,
  LastFMSimilarArtistsResponse,
  LastFMTagSearchResponse,
  LastFMTagTopArtistsResponse,
  LastFMTopTracksResponse,
} from "@/typings/last-fm";

const BASE_URL = "https://ws.audioscrobbler.com/2.0/";
const LASTFM_API_KEY = process.env.LASTFM_API_KEY;

function buildUrl(params: Record<string, string | number | undefined>): string {
  const searchParams = new URLSearchParams({
    api_key: LASTFM_API_KEY ?? "",
    format: "json",
  });

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  return `${BASE_URL}?${searchParams.toString()}`;
}

/**
 * Queries the Last FM API with the info from
 * @param artist
 * @returns
 */
export async function getArtistDetails(artist: string): Promise<LastFMResponse> {
  const url = buildUrl({
    method: "artist.getinfo",
    artist,
    autocorrect: 1,
  });

  const response = await fetch(url);
  const data: LastFMResponse = await response.json();

  return data;
}

/**
 * Gets similar artists from Last.fm API
 * @param artist - The artist name
 * @param limit - Number of similar artists to return (optional)
 * @returns
 */
export async function getSimilarArtists(
  artist: string,
  limit: number = 20
): Promise<LastFMSimilarArtistsResponse> {
  const url = buildUrl({
    method: "artist.getsimilar",
    artist,
    limit,
    autocorrect: 1,
  });

  const response = await fetch(url);
  const data: LastFMSimilarArtistsResponse = await response.json();

  return data;
}

export async function searchArtists(
  artist: string,
  limit: number = 30,
  page: number = 1
): Promise<LastFMArtistSearchResponse> {
  const url = buildUrl({
    method: "artist.search",
    artist,
    limit,
    page,
  });

  const response = await fetch(url);
  const data: LastFMArtistSearchResponse = await response.json();

  return data;
}

export async function getArtistTopTracks(
  artist: string,
  limit: number = 10,
): Promise<LastFMTopTracksResponse> {
  const url = buildUrl({
    method: "artist.gettoptracks",
    artist,
    limit,
    autocorrect: 1,
  });

  const response = await fetch(url);
  const data: LastFMTopTracksResponse = await response.json();

  return data;
}

export async function searchTags(tag: string, limit: number = 30): Promise<LastFMTagSearchResponse> {
  const url = buildUrl({
    method: "tag.search",
    tag,
    limit,
  });

  const response = await fetch(url);
  const data: LastFMTagSearchResponse = await response.json();

  return data;
}

export async function getTopArtistsByTag(
  tag: string,
  limit: number = 30,
): Promise<LastFMTagTopArtistsResponse> {
  const url = buildUrl({
    method: "tag.gettopartists",
    tag,
    limit,
  });

  const response = await fetch(url);
  const data: LastFMTagTopArtistsResponse = await response.json();

  return data;
}
