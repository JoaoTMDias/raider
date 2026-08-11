import type { SearchCategory, SearchResults } from "@/typings/artist";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "./useDebounce";

const DEBOUNCE_VALUE = 250;

/**
 * Fetches artists or genres by their name.
 */
async function getResultsByName(
  name: string,
  category: SearchCategory
): Promise<SearchResults["items"]> {
  let response: SearchResults["items"] = [];

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
      console.error("Error searching Last.fm:", error);
    }
  }

  return response;
}

function useArtistSearch(category: SearchCategory) {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useDebounce(
    () => {
      setSearchTerm(inputValue);
    },
    DEBOUNCE_VALUE,
    [inputValue]
  );

  const query = useQuery<SearchResults["items"]>(
    ["search-by-name", category, searchTerm],
    () => getResultsByName(searchTerm, category),
  );

  return {
    searchTerm: inputValue,
    setSearchTerm: setInputValue,
    query,
  };
}

export default useArtistSearch;
