import { ArtistImage } from "@/typings/artist";

export interface ArtistDetailsTrack {
  id: string;
  cover?: ArtistImage;
  name: string;
  href?: string;
}

export interface ArtistDetails {
  id: string;
  name?: string;
  listeners?: number;
  cover?: ArtistImage;
  bio?: string;
  genres?: string;
  playCount?: string;
  popularityScore?: string;
  onTour?: "Yes" | "No",
  popularTracks?: ArtistDetailsTrack[];
}
