import { SpotifyArtistImage } from "@/typings/spotify";

export interface ArtistDetailsTrack {
  id: string;
  cover: SpotifyArtistImage;
  source: string;
  name: string;
  href: string;
}

export interface ArtistDetails {
  id: string;
  name?: string;
  listeners?: number;
  cover?: SpotifyArtistImage;
  bio?: string;
  genres?: string;
  playCount?: string;
  popularityScore?: string;
  onTour?: "Yes" | "No",
  popularTracks?: ArtistDetailsTrack[];
}
