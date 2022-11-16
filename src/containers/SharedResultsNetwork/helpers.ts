import { SpotifyRelatedArtistsResults } from "@/typings/spotify";
import { SharedStateArtists } from "./types";

export function getRelatedArtists(id: string): SharedStateArtists[] | undefined {
  let response: SharedStateArtists[] = [];

  try {
    fetch(encodeURI(`/api/related-artists/${id}`)).then((serverResponse) => serverResponse.json()).then(({ items }: SpotifyRelatedArtistsResults) => {
      const hasResults = Array.isArray(items) && items.length > 0;

      const relatedNodes = hasResults
        ? items.map((artistItem) => {
          return {
            node: artistItem,
            isExpanded: false,
            relatedNodes: [],
          } as SharedStateArtists;
        })
        : undefined;

      return relatedNodes;
    });
  } catch (error) {
    console.error(error);
  }

  return response;
}
