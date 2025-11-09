export interface LastFMResponse {
  artist?: LastFMArtist;
}

export interface LastFMArtist {
  name?:       string;
  mbid?:       string;
  url?:        string;
  image?:      LastFMImage[];
  streamable?: string;
  ontour?:     "0" | "1";
  stats?:      LastFMStats;
  similar?:    LastFMSimilar;
  tags?:       LastFMTags;
  bio?:        LastFMBio;
}

export interface LastFMBio {
  links?:     LastFMLinks;
  published?: string;
  summary?:   string;
  content?:   string;
}

export interface LastFMLinks {
  link?: LastFMLink;
}

export interface LastFMLink {
  "#text"?: string;
  rel?:     string;
  href?:    string;
}

export interface LastFMImage {
  "#text"?: string;
  size?:    string;
}

export interface LastFMSimilar {
  artist?: LastFMArtistElement[];
}

export interface LastFMArtistElement {
  name?:  string;
  url?:   string;
  image?: LastFMImage[];
}

export interface LastFMStats {
  listeners?: string;
  playcount?: string;
}

export interface LastFMTags {
  tag?: LastFMTag[];
}

export interface LastFMTag {
  name?: string;
  url?:  string;
}

export interface LastFMSimilarArtistsResponse {
  similarartists?: {
    artist?: LastFMSimilarArtist[];
    "@attr"?: {
      artist?: string;
    };
  };
}

export interface LastFMSimilarArtist {
  name: string;
  mbid?: string;
  match?: string;
  url?: string;
  image?: LastFMImage[];
  streamable?: string;
}
