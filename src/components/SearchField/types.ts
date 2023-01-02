import { SpotifyArtistItem, SpotifySearchResults } from "@/typings/spotify";
import { UseQueryResult } from "@tanstack/react-query";

export type Category = "artist" | "genre";

export interface SearchResultsProps {
  category: Category;
  query: UseQueryResult<SpotifySearchResults["items"]>
  onSelect?: (item: string | SpotifyArtistItem) => void;
}

export interface SearchInputProps {
  category: Category;
  onClear?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
