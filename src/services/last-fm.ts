import { LastFMResponse, LastFMSimilarArtistsResponse } from "@/typings/last-fm";

const BASE_URL = "https://ws.audioscrobbler.com/2.0/";
const LASTFM_API_KEY = process.env.LASTFM_API_KEY;

/**
 * Queries the Last FM API with the info from
 * @param artist
 * @returns
 */
export async function getArtistDetails(artist: string): Promise<LastFMResponse> {
  const url = `${BASE_URL}?method=artist.getinfo&artist=${encodeURIComponent(artist)}&api_key=${LASTFM_API_KEY}&format=json`;

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
  const url = `${BASE_URL}?method=artist.getSimilar&artist=${encodeURIComponent(artist)}&api_key=${LASTFM_API_KEY}&limit=${limit}&format=json`;

  const response = await fetch(url);
  const data: LastFMSimilarArtistsResponse = await response.json();

  return data;
}
