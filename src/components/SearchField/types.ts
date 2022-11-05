import { SpotifyArtistItem, SpotifySearchResults } from "@/typings/spotify";

export type Category = "artist" | "genre";

export interface SearchResultsProps {
  category: Category;
  results: SpotifySearchResults["items"];
  onSelect: (item: string | SpotifyArtistItem) => void;
}

export interface SearchInputProps {
  value: string;
  results: SpotifySearchResults["items"];
  category: Category;
  onClear: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
