import type { NextApiRequest, NextApiResponse } from "next";
import { searchArtists, searchTags } from "@/services";
import { SpotifyArtistItem, SpotifySearchResults } from "@/typings/spotify";
import { LastFMArtistMatch, LastFMImage, LastFMTagMatch } from "@/typings/last-fm";
import { Category } from "@/components/SearchField/types";

function toArray<T>(value: T | T[] | undefined): T[] {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

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

function mapLastFmArtistToSearchItem(artist: LastFMArtistMatch): SpotifyArtistItem {
  const name = artist.name ?? "";
  const id = encodeURIComponent(name.toLowerCase());

  return {
    id,
    name,
    href: artist.url,
    external_urls: {
      spotify: artist.url,
    },
    images: toArray(artist.image)
      .filter((image) => !!image["#text"])
      .map((image) => mapLastFmImage(image)),
    followers: artist.listeners
      ? {
          href: null,
          total: parseInt(artist.listeners, 10),
        }
      : undefined,
    type: "artist",
    uri: artist.url,
  };
}

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const category = req.query["type"] as Category;
  const term = req.query["category"] as string;

  let result: SpotifySearchResults = {
    items: [],
  };

  switch (category) {
    case "artist":
      try {
        const response = await searchArtists(term);
        const artists = toArray(response.results?.artistmatches?.artist);

        result = {
          items: artists.map((artist) => mapLastFmArtistToSearchItem(artist)),
        };
      } catch (error) {
        console.error("Error searching artists on Last.fm:", error);
        return res.status(500).json({ error: "Failed to search artists" });
      }
      break;

    case "genre":
      try {
        const response = await searchTags(term);
        const tags = toArray(response.results?.tagmatches?.tag);

        result = {
          items: tags
            .map((tag: LastFMTagMatch) => tag.name)
            .filter((tag): tag is string => typeof tag === "string" && tag.length > 0),
        };
      } catch (error) {
        console.error("Error searching genres on Last.fm:", error);
        return res.status(500).json({ error: "Failed to search genres" });
      }

      break;

    default:
      result = {
        items: [],
      };
      break;
  }

  return res.status(200).json(result);
}

export default handler;
