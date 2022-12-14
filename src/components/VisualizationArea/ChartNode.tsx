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
  const isRoot = node.depth === 0;
  const isParent = !!node.children;
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
          console.log("keyboard on node: ", node);
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
    console.log("clicked on node: ", node);
    forceUpdate();
  }, [forceUpdate, node]);

  const pictureProps = {
    imageUrl: filterImagesBySize(node.data.node?.images),
    width,
    height,
  };

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
      <ArtistPicture {...pictureProps} />
      <text
        id={id}
        className={styles.artist__text}
        dy="2rem"
        fontSize={14}
        fontFamily="sans-serif"
        textAnchor="middle"
        style={{ pointerEvents: "none" }}
        fill={
          isRoot
            ? "var(--raider-text-color)"
            : isParent
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
