import { ArtistItem } from "@/typings/artist";

export interface ChartNodes {
  node?: ArtistItem;
  relatedNodes?: ChartNodes[];
}

export interface RaiderStore {
  currentArtist: ArtistItem;
  featuredArtist: ArtistItem;
  nodes: ChartNodes;
  setFeaturedArtist: (artist: ArtistItem) => void;
  setSearchResults: (artist: ArtistItem) => void;
  resetCurrentArtist: () => void;
  updateRelatedArtists: (artist: ArtistItem, relatedNodes: ChartNodes[]) => void;
}
