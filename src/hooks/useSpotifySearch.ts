import type { SearchCategory, SpotifySearchResults } from "@/typings/spotify";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "./useDebounce";

const DEBOUNCE_VALUE = 250;

/**
 * Fetches Artists by their name
 */
async function getResultsByName(
  name: string,
  category: SearchCategory
): Promise<SpotifySearchResults["items"]> {
  let response = [];

  const hasName = typeof name === "string" && name.length >= 1;
  const hasCategory = typeof category === "string" && category.length >= 1;
  const hasTerms = hasName && hasCategory;

  if (hasTerms) {
    try {
      const request = await fetch(encodeURI(`/api/search-by-name/${name}?type=${category}`));

      if (!request.ok) {
        console.error(`Failed to search: ${request.status} ${request.statusText}`);
        return response;
      }

      const res = await request.json();

      if (Array.isArray(res.items)) {
        response = res.items;
      }
    } catch (error) {
      console.error('Error searching Spotify:', error);
    }
  }

  return response;
}

function useSpotifySearch(category: SearchCategory) {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * This enables a waiting period between the last keystroke
   * of the user on the input and the actual fetch, thus
   * avoiding multiple fetches to the API.
   */
  useDebounce(
    () => {
      setSearchTerm(inputValue);
    },
    DEBOUNCE_VALUE,
    [inputValue]
  );

  const query = useQuery<SpotifySearchResults["items"]>(
    ["search-artist-by-name", searchTerm],
    () => getResultsByName(searchTerm, category),
  );

  return {
    searchTerm: inputValue,
    setSearchTerm: setInputValue,
    query
  };
}

export default useSpotifySearch;
