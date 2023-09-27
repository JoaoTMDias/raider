import { SpotifyArtistItem } from "@/typings/spotify";

export interface ChartNodes {
  node?: SpotifyArtistItem;
  relatedNodes?: ChartNodes[];
}

export interface RaiderStore {
  currentArtist: SpotifyArtistItem;
  featuredArtist: SpotifyArtistItem;
  nodes: ChartNodes;
  setFeaturedArtist: (artist: SpotifyArtistItem) => void;
  setSearchResults: (artist: SpotifyArtistItem) => void;
  resetCurrentArtist: () => void;
  updateRelatedArtists: (artist: SpotifyArtistItem, relatedNodes: ChartNodes[]) => void;
}
