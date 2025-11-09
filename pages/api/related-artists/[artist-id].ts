import type { NextApiRequest, NextApiResponse } from "next";
import { searchSpotifyByName } from "@/services/spotify";
import { getSimilarArtists } from "@/services/last-fm";
import { getServerSession } from "next-auth/next";
import { SpotifySearchResults, SpotifyArtistItem, SpotifySearchResponse } from "@/typings/spotify";
import { AUTH_OPTIONS } from "../auth/[...nextauth]";

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const session = await getServerSession(req, res, AUTH_OPTIONS);

  if (!session || !(session as any).accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const sessionAccessToken = (session as any).accessToken;
  const artistName = req.query["artist-id"] as string;

  try {
    // Get similar artists from Last.fm
    const lastFmResponse = await getSimilarArtists(artistName, 12);
    const similarArtists = lastFmResponse.similarartists?.artist ?? [];

    if (similarArtists.length === 0) {
      return res.status(200).json({ items: [] });
    }

    // For each similar artist, search Spotify to get full artist data
    const spotifyArtistsPromises = similarArtists.map(async (artist) => {
      try {
        const searchResponse = await searchSpotifyByName(artist.name, sessionAccessToken);

        if (!searchResponse.ok) {
          console.error(`Failed to search Spotify for ${artist.name}`);
          return null;
        }

        const searchData: SpotifySearchResponse = await searchResponse.json();
        const spotifyArtists = searchData.artists?.items ?? [];

        // Return the first match (usually the most relevant)
        return spotifyArtists[0] || null;
      } catch (error) {
        console.error(`Error searching for ${artist.name}:`, error);
        return null;
      }
    });

    const spotifyArtists = await Promise.all(spotifyArtistsPromises);

    // Filter out null results
    const validArtists = spotifyArtists.filter(
      (artist): artist is SpotifyArtistItem => artist !== null
    );

    const result: SpotifySearchResults = {
      items: validArtists,
    };

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching similar artists:", error);
    return res.status(500).json({ error: "Failed to fetch similar artists" });
  }
}

export default handler;
