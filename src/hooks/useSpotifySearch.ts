import type { SearchCategory, SpotifyArtistItems, SpotifySearchResults } from "@/typings/spotify";
import { useEffect, useState } from "react";



function useSpotifySearch(category: SearchCategory) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SpotifyArtistItems[]>([]);

  useEffect(() => {
    async function getArtistsByName(name: string): Promise<SpotifySearchResults> {
      const res = await fetch(encodeURI(`/api/artist-by-name/${name}`));
      const response: SpotifySearchResults = await res.json();

      console.log(response);

      return response;

    };

    console.log("category: ", category);

    const hasSearchTerm = searchTerm && searchTerm.length >= 2;

    if (hasSearchTerm) {
      getArtistsByName(searchTerm).then((value) => {
        if (Array.isArray(value.items)) {
          setResults(value.items);
        }
      }).catch((error) => console.warn(error));
    }
  }, [searchTerm, category]);

  return {
    results,
    searchTerm,
    setSpotifySearch: setSearchTerm
  }
}

export default useSpotifySearch;
