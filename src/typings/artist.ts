export type SearchCategory = "artist" | "genre";

export interface ArtistImage {
  height?: number;
  url?: string;
  width?: number;
}

export interface ArtistFollowers {
  href?: null;
  total?: number;
}

export interface ArtistItem {
  id?: string;
  name?: string;
  href?: string;
  images?: ArtistImage[];
  genres?: string[];
  popularity?: number;
  followers?: ArtistFollowers;
  externalUrl?: string;
}

export interface SearchResults {
  items: string[] | ArtistItem[];
}

export interface RelatedArtistsResults {
  items: ArtistItem[];
}

export interface ArtistTrack {
  id?: string;
  href?: string;
  name?: string;
  preview_url?: string;
  is_playable?: boolean;
  album?: {
    images?: ArtistImage[];
  };
}

export interface ArtistTopTracks {
  tracks?: ArtistTrack[];
}
