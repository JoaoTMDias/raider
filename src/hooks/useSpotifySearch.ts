import type { SearchCategory, SpotifySearchResults } from "@/typings/spotify";
import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

const DEBOUNCE_VALUE = 500;

function useSpotifySearch(category: SearchCategory) {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SpotifySearchResults["items"]>([]);

  useDebounce(
    () => {
      setSearchTerm(inputValue);
    },
    DEBOUNCE_VALUE,
    [inputValue]
  );

  useEffect(() => {
    async function getResultsByName(name: string): Promise<SpotifySearchResults> {
      const res = await fetch(encodeURI(`/api/search-by-name/${name}?type=${category}`));
      const response: SpotifySearchResults = await res.json();

      return response;
    };

    const hasSearchTerm = searchTerm && searchTerm.length >= 2;

    if (hasSearchTerm) {
      getResultsByName(searchTerm).then((value) => {
        if (Array.isArray(value.items)) {
          setResults(value.items);
        }
      }).catch((error) => console.warn(error));
    }
  }, [searchTerm, category]);

  return {
    results,
    searchTerm,
    setSpotifySearch: setInputValue
  }
}

export default useSpotifySearch;
