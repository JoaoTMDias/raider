import { hierarchy } from "@visx/hierarchy";
import { HierarchyNode } from "@visx/hierarchy/lib/types";
import { TreeNode } from "./Chart";

type RootHierarchyCallback<T> = (item: T) => T[] | null | undefined;

export function getRootHierarchy<T extends TreeNode>(
  data: T,
  children?: RootHierarchyCallback<T>
): HierarchyNode<T> {
  return hierarchy(data, children);
}

export function getRelatedArtists() {
  return "true";
}
