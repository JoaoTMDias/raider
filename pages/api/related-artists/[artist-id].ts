import type { NextApiRequest, NextApiResponse } from "next";
import { getSimilarArtists } from "@/services/last-fm";
import { SpotifySearchResults, SpotifyArtistItem } from "@/typings/spotify";
import { LastFMImage, LastFMSimilarArtist } from "@/typings/last-fm";

function mapLastFmImage(image: LastFMImage) {
  const sizeMap: Record<string, number> = {
    small: 34,
    medium: 64,
    large: 126,
    extralarge: 252,
    mega: 500,
  };
  const size = image.size ?? "medium";
  const dimension = sizeMap[size] ?? 64;

  return {
    height: dimension,
    width: dimension,
    url: image["#text"] ?? "",
  };
}

function mapSimilarArtist(artist: LastFMSimilarArtist): SpotifyArtistItem {
  const name = artist.name ?? "";

  return {
    id: encodeURIComponent(name.toLowerCase()),
    name,
    href: artist.url,
    external_urls: {
      spotify: artist.url,
    },
    images: (artist.image ?? [])
      .filter((image) => !!image["#text"])
      .map((image) => mapLastFmImage(image)),
    type: "artist",
    uri: artist.url,
  };
}

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const artistName = req.query["artist-id"] as string;

  try {
    const lastFmResponse = await getSimilarArtists(artistName, 12);
    const similarArtists = lastFmResponse.similarartists?.artist ?? [];

    if (similarArtists.length === 0) {
      return res.status(200).json({ items: [] });
    }

    const validArtists: SpotifyArtistItem[] = similarArtists
      .filter((artist) => !!artist.name)
      .map((artist) => mapSimilarArtist(artist));

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
