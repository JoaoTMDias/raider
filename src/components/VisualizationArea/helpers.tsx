import { hierarchy } from "@visx/hierarchy";
import { HierarchyNode } from "@visx/hierarchy/lib/types";
import { TreeNode } from "./Chart";
import { SpotifyRelatedArtistsResults } from "@/typings/spotify";
import { SharedStateArtists } from "@/containers/SharedResultsNetwork/types";

type RootHierarchyCallback<T> = (item: T) => T[] | null | undefined;

export function getRootHierarchy<T extends TreeNode>(
  data: T,
  children?: RootHierarchyCallback<T>
): HierarchyNode<T> {
  return hierarchy(data, children);
}

export async function getRelatedArtists(
  id?: string,
  limit: number = 6
): Promise<SharedStateArtists[] | undefined> {
  let response: SharedStateArtists[] = [];

  try {
    if (id) {
      const request = await fetch(encodeURI(`/api/related-artists/${id}`));
      const { items }: SpotifyRelatedArtistsResults = await request.json();
      const hasResults = Array.isArray(items) && items.length > 0;

      const relatedNodes = hasResults
        ? items.slice(0, limit).map((artistItem) => {
            return {
              node: artistItem,
              isExpanded: false,
              relatedNodes: [],
            } as SharedStateArtists;
          })
        : undefined;

      return relatedNodes;
    }
  } catch (error) {
    console.error(error);
  }

  return response;
}
