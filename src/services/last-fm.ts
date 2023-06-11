import { LastFMResponse } from "@/typings/last-fm";

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
