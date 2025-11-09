export type SearchCategory = "artist" | "genre";

interface SpotifySession {
  user: {
    name: string;
    email: string;
    image: string;
  };
  expires: string;
}

interface SpotifyToken {
  accessToken: string;
  email: string;
  exp: number;
  iat: number;
  jti: number;
  name: string;
  picture: string;
  sub: string;
}

export interface SpotifyResponse {
  session: SpotifySession;
  token: SpotifyToken;
}

export interface SpotifySearchResponse {
  artists?: Artists;
}

export interface Artists {
  href?: string;
  items?: SpotifyArtistItem[];
  limit?: number;
  next?: string;
  offset?: number;
  previous?: null;
  total?: number;
}

export interface SpotifyArtistItem {
  external_urls?: ExternalUrls;
  followers?: Followers;
  genres?: string[];
  href?: string;
  id?: string;
  images?: SpotifyArtistImage[];
  name?: string;
  popularity?: number;
  type?: string;
  uri?: string;
}

export interface ExternalUrls {
  spotify?: string;
}

export interface Followers {
  href?: null;
  total?: number;
}

export interface SpotifyArtistImage {
  height?: number;
  url?: string;
  width?: number;
}

export enum Type {
  Artist = "artist",
}

export interface SpotifySearchResults {
  items: string[] | SpotifyArtistItem[]
}

export interface SpotifyRelatedArtistsResults {
  items: SpotifyArtistItem[]
}

export interface SpotifyRelatedArtistsResponse {
  artists: SpotifyArtistItem[]
}


export interface SpotifyArtistTopTracks {
  tracks?: SpotifyArtistTrack[];
}

export interface SpotifyArtistTrack {
  album?:         Album;
  artists?:       Artist[];
  disc_number?:   number;
  duration_ms?:   number;
  explicit?:      boolean;
  external_ids?:  ExternalIDS;
  external_urls?: ExternalUrls;
  href?:          string;
  id?:            string;
  is_playable?:   boolean;
  name?:          string;
  popularity?:    number;
  preview_url?:   string;
  track_number?:  number;
  type?:          TrackType;
  uri?:           string;
  is_local?:      boolean;
}

export interface Album {
  album_type?:             AlbumTypeEnum;
  total_tracks?:           number;
  external_urls?:          ExternalUrls;
  href?:                   string;
  id?:                     string;
  images?:                 Image[];
  name?:                   string;
  release_date?:           string;
  release_date_precision?: ReleaseDatePrecision;
  type?:                   AlbumTypeEnum;
  uri?:                    string;
  artists?:                Artist[];
  is_playable?:            boolean;
}

export type AlbumTypeEnum = "album";

export interface Artist {
  external_urls?: ExternalUrls;
  href?:          string;
  id?:            string;
  name?:          string;
  type?:          ArtistType;
  uri?:           string;
}

export interface ExternalUrls {
  spotify?: string;
}

export type ArtistType = "artist";

export interface Image {
  url?:    string;
  height?: number;
  width?:  number;
}

export type ReleaseDatePrecision = "year" | "day";

export interface ExternalIDS {
  isrc?: string;
}

export type TrackType = "track";

