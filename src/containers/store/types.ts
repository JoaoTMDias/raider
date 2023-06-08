import { SpotifyArtistItem } from "@/typings/spotify";

export interface ChartNodes {
  node?: SpotifyArtistItem;
  isExpanded?: boolean;
  relatedNodes?: ChartNodes[];
}

export interface RaiderStore {
  currentArtist: SpotifyArtistItem;
  nodes: ChartNodes;
  setSearchResults: (artist: SpotifyArtistItem) => void;
  resetCurrentArtist: () => void;
  updateRelatedArtists: (artist: SpotifyArtistItem, relatedNodes: ChartNodes[]) => void;
}
