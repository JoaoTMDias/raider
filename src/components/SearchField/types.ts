import { ArtistItem, SearchResults } from "@/typings/artist";
import { UseQueryResult } from "@tanstack/react-query";

export type Category = "artist" | "genre";

export interface SearchResultsProps {
  category: Category;
  query: UseQueryResult<SearchResults["items"]>
  onSelect?: (item: string | ArtistItem) => void;
}

export interface SearchInputProps {
  category: Category;
  onClear?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
