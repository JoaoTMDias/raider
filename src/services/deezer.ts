import { ArtistImage, ArtistItem, ArtistTrack } from "@/typings/artist";
import { isPlaceholderImageUrl } from "@/helpers";

const DEEZER_API_BASE = "https://api.deezer.com";

interface DeezerArtist {
  id: number;
  name?: string;
  picture_small?: string;
  picture_medium?: string;
  picture_big?: string;
  picture_xl?: string;
}

interface DeezerTrack {
  artist?: {
    name?: string;
  };
  album?: {
    cover_small?: string;
    cover_medium?: string;
    cover_big?: string;
    cover_xl?: string;
  };
}

interface DeezerSearchArtistResponse {
  data?: DeezerArtist[];
}

interface DeezerSearchTrackResponse {
  data?: DeezerTrack[];
}

function normalize(value?: string): string {
  return (value ?? "").trim().toLowerCase();
}

function isValidDeezerImageUrl(url?: string): boolean {
  if (!url) {
    return false;
  }

  const isEmptyPath = url.includes("/images/artist//") || url.includes("/images/cover//");

  return !isEmptyPath;
}

function artistToImages(artist: DeezerArtist): ArtistImage[] {
  const candidates: Array<{ url?: string; size: number }> = [
    { url: artist.picture_xl, size: 1000 },
    { url: artist.picture_big, size: 500 },
    { url: artist.picture_medium, size: 250 },
    { url: artist.picture_small, size: 56 },
  ];

  return candidates
    .filter((item) => isValidDeezerImageUrl(item.url))
    .map((item) => ({
      url: item.url,
      width: item.size,
      height: item.size,
    }));
}

function trackToImages(track: DeezerTrack): ArtistImage[] {
  const candidates: Array<{ url?: string; size: number }> = [
    { url: track.album?.cover_xl, size: 1000 },
    { url: track.album?.cover_big, size: 500 },
    { url: track.album?.cover_medium, size: 250 },
    { url: track.album?.cover_small, size: 56 },
  ];

  return candidates
    .filter((item) => isValidDeezerImageUrl(item.url))
    .map((item) => ({
      url: item.url,
      width: item.size,
      height: item.size,
    }));
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Deezer request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export async function getDeezerArtistImagesByName(name: string): Promise<ArtistImage[]> {
  if (!name) {
    return [];
  }

  try {
    const query = encodeURIComponent(name);
    const url = `${DEEZER_API_BASE}/search/artist?q=${query}`;
    const response = await fetchJson<DeezerSearchArtistResponse>(url);
    const artists = response.data ?? [];

    if (!artists.length) {
      return [];
    }

    const expected = normalize(name);
    const exactMatch = artists.find((artist) => normalize(artist.name) === expected);
    const fuzzyMatch = artists.find((artist) => normalize(artist.name).includes(expected));
    const selected = exactMatch ?? fuzzyMatch ?? artists[0];

    return artistToImages(selected);
  } catch (error) {
    console.error("Failed to enrich artist image with Deezer:", error);
    return [];
  }
}

export async function enrichArtistsWithDeezerImages(items: ArtistItem[]): Promise<ArtistItem[]> {
  const enriched = await Promise.all(
    items.map(async (item) => {
      const hasUsableImage =
        Array.isArray(item.images) &&
        item.images.some((image) => image.url && !isPlaceholderImageUrl(image.url));

      if (hasUsableImage) {
        return item;
      }

      const deezerImages = await getDeezerArtistImagesByName(item.name ?? "");

      if (!deezerImages.length) {
        return item;
      }

      return {
        ...item,
        images: deezerImages,
      };
    })
  );

  return enriched;
}

export async function enrichTrackWithDeezerCover(
  track: ArtistTrack,
  artistName: string
): Promise<ArtistTrack> {
  const hasUsableImage =
    Array.isArray(track.album?.images) &&
    track.album?.images.some((image) => image.url && !isPlaceholderImageUrl(image.url));

  if (hasUsableImage || !track.name) {
    return track;
  }

  try {
    const query = encodeURIComponent(`artist:\"${artistName}\" track:\"${track.name}\"`);
    const url = `${DEEZER_API_BASE}/search/track?q=${query}`;
    const response = await fetchJson<DeezerSearchTrackResponse>(url);
    const tracks = response.data ?? [];

    if (!tracks.length) {
      return track;
    }

    const expectedArtist = normalize(artistName);
    const exactArtistTrack = tracks.find(
      (entry) => normalize(entry.artist?.name) === expectedArtist
    );
    const selectedTrack = exactArtistTrack ?? tracks[0];
    const coverImages = trackToImages(selectedTrack);

    if (!coverImages.length) {
      return track;
    }

    return {
      ...track,
      album: {
        ...(track.album ?? {}),
        images: coverImages,
      },
    };
  } catch (error) {
    console.error("Failed to enrich track cover with Deezer:", error);
    return track;
  }
}
