import { Group } from "@visx/group";
import ArtistPicture from "./ArtistPicture";
import { HierarchyPointNode } from "@visx/hierarchy/lib/types";
import styles from "./index.module.scss";
import { TreeNode } from "./Chart";
import { KeyboardEvent, memo, useCallback } from "react";
import { filterImagesBySize } from "@/helpers";

interface Props {
  id: string;
  node: HierarchyPointNode<TreeNode>;
  forceUpdate: () => void;
}

function ChartNode({ id, node, forceUpdate }: Props): JSX.Element {
  const width = 32;
  const height = 32;
  const top = node.x;
  const left = node.y;

  const handleOnKeyUp = useCallback(
    (event: KeyboardEvent<SVGGElement>) => {
      switch (event.key) {
        case "Enter":
        case " ":
        case "ArrowLeft":
        case "ArrowRight":
          node.data.isExpanded = !node.data.isExpanded;
          console.log(node);
          forceUpdate();
          break;

        default:
          break;
      }
    },
    [forceUpdate, node]
  );

  const handleOnClick = useCallback(() => {
    node.data.isExpanded = !node.data.isExpanded;
    console.log(node);
    forceUpdate();
  }, [forceUpdate, node]);

  return (
    <Group
      className={styles.node}
      role="button"
      aria-labelledby={id}
      aria-expanded={!node.data.isExpanded}
      tabIndex={0}
      top={top}
      left={left}
      onKeyUp={handleOnKeyUp}
      onClick={handleOnClick}
    >
      <circle className={styles.node__background} cx="0" cy="0" r="40" />
      {node.depth === 0 && (
        <ArtistPicture
          imageUrl={filterImagesBySize(node.data.node?.images)}
          width={width}
          height={height}
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
        dy="2rem"
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
