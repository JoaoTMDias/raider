import type { NextApiRequest, NextApiResponse } from "next";
import { searchSpotifyByName } from "@/services";
import { getServerSession } from "next-auth/next";
import { SpotifyArtistItem, SpotifySearchResponse, SpotifySearchResults } from "@/typings/spotify";
import { Category } from "@/components/SearchField/types";
import { SPOTIFY_GENRES } from "@/data";
import { AUTH_OPTIONS } from "../auth/[...nextauth]";

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const session = await getServerSession(req, res, AUTH_OPTIONS);
  const category = req.query["type"] as Category;

  let result: SpotifySearchResults = {
    items: [],
  };

  switch (category) {
    case "artist":
      if (!session || !(session as any).accessToken) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const sessionAccessToken = (session as any).accessToken;

      try {
        const response = await searchSpotifyByName(
          req.query["category"] as string,
          sessionAccessToken
        );
        const { artists }: SpotifySearchResponse = await response.json();

        result = {
          items: artists?.items as SpotifyArtistItem[],
        };
      } catch (error) {
        console.error("Error searching Spotify:", error);
        return res.status(500).json({ error: "Failed to search Spotify" });
      }
      break;

    case "genre":
      result = {
        items: SPOTIFY_GENRES,
      };
      break;

    default:
      break;
  }

  return res.status(200).json(result);
}

export default handler;
