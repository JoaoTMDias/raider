import { hierarchy } from "@visx/hierarchy";
import { HierarchyNode } from "@visx/hierarchy/lib/types";
import { TreeNode } from "./Chart";
import { SpotifyRelatedArtistsResults } from "@/typings/spotify";
import { ChartNodes } from "@/containers/store/types";

type RootHierarchyCallback<T> = (item: T) => T[] | null | undefined;

export function getRootHierarchy<T extends TreeNode>(
  data: T,
  children?: RootHierarchyCallback<T>
): HierarchyNode<T> {
  return hierarchy(data, children);
}

export const RELATED_ARTISTS_LIMIT = 12;

export async function getRelatedArtists(
  id?: string,
  limit: number = RELATED_ARTISTS_LIMIT
): Promise<ChartNodes[] | undefined> {
  let response: ChartNodes[] = [];

  try {
    if (id) {
      const request = await fetch(encodeURI(`/api/related-artists/${id}`));
      const { items }: SpotifyRelatedArtistsResults = await request.json();
      const hasResults = Array.isArray(items) && items.length > 0;

      const relatedNodes = hasResults
        ? items.slice(0, limit).map((artistItem) => {
            return {
              node: artistItem,
              relatedNodes: [],
            } as ChartNodes;
          })
        : undefined;

      return relatedNodes;
    }
  } catch (error) {
    console.error(error);
  }

  return response;
}
