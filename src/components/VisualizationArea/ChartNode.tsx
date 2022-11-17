import { Group } from "@visx/group";
import ArtistPicture from "./ArtistPicture";
import { HierarchyPointNode } from "@visx/hierarchy/lib/types";
import styles from "./index.module.scss";
import { TreeNode } from "./Chart";
import { memo } from "react";
import { filterImagesBySize } from "@/helpers";

interface Props {
  id: string;
  node: HierarchyPointNode<TreeNode>;
  forceUpdate: () => void;
}

function ChartNode({ id, node, forceUpdate }: Props): JSX.Element {
  const width = 48;
  const height = 48;
  const top = node.x;
  const left = node.y;

  return (
    <Group
      className={styles.node}
      role="button"
      aria-labelledby={id}
      aria-expanded={!node.data.isExpanded}
      tabIndex={0}
      top={top}
      left={left}
    >
      {node.depth === 0 && (
        <ArtistPicture
          imageUrl={filterImagesBySize(node.data.node?.images)}
          width={width}
          height={height}
          onClick={() => {
            node.data.isExpanded = !node.data.isExpanded;
            console.log(node);
            forceUpdate();
          }}
        />
      )}
      {node.depth !== 0 && (
        <ArtistPicture
          imageUrl={filterImagesBySize(node.data.node?.images)}
          width={width}
          height={height}
          onClick={() => {
            node.data.isExpanded = !node.data.isExpanded;
            console.log(node);
            forceUpdate();
          }}
        />
      )}
      <text
        id={id}
        className={styles.artist__text}
        dy="3rem"
        fontSize={14}
        fontFamily="sans-serif"
        textAnchor="middle"
        style={{ pointerEvents: "none" }}
        fill={
          node.depth === 0
            ? "var(--raider-text-color)"
            : node.children
            ? "var(--raider-selected-item)"
            : "var(--raider-text-color)"
        }
      >
        {node.data.node?.name}
      </text>
    </Group>
  );
}

export default memo(ChartNode);
