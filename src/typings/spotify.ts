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
  type?: Type;
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
