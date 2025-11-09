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
  artistName?: string,
  limit: number = RELATED_ARTISTS_LIMIT
): Promise<ChartNodes[]> {
  const defaultResponse: ChartNodes[] = [];

  try {
    if (!artistName) {
      return defaultResponse;
    }

    const request = await fetch(encodeURI(`/api/related-artists/${artistName}`));

    if (!request.ok) {
      console.error(`Failed to fetch related artists: ${request.status} ${request.statusText}`);
      return defaultResponse;
    }

    const { items }: SpotifyRelatedArtistsResults = await request.json();
    const hasResults = Array.isArray(items) && items.length > 0;

    if (!hasResults) {
      return defaultResponse;
    }

    const relatedNodes = items.slice(0, limit).map((artistItem) => {
      return {
        node: artistItem,
        relatedNodes: [],
      } as ChartNodes;
    });

    return relatedNodes;
  } catch (error) {
    console.error('Error fetching related artists:', error);
    return defaultResponse;
  }
}
