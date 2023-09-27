import { Group } from "@visx/group";
import ArtistPicture from "./ArtistPicture";
import { HierarchyPointNode } from "@visx/hierarchy/lib/types";
import { TreeNode } from "./Chart";
import { KeyboardEvent, memo, useCallback, useRef } from "react";
import { filterImagesBySize } from "@/helpers";
import { KEY } from "@jtmdias/js-utilities";
import styles from "./index.module.scss";
import { useRover, useFocus } from "@jtmdias/react-a11y-tools";
import { useRaiderStore } from "@/containers";

interface Props {
  id: string;
  node: HierarchyPointNode<TreeNode>;
  forceUpdate: () => void;
}

function ChartNode({ id, node, forceUpdate }: Props): JSX.Element | null {
  const { featuredArtist, setFeaturedArtist } = useRaiderStore((state) => ({
    featuredArtist: state.featuredArtist,
    setFeaturedArtist: state.setFeaturedArtist,
  }));

  const nodeRef = useRef<SVGGElement>(null);

  const [tabIndex, focused, handleOnRoverKeyUp, handleOnRoverClick] = useRover(nodeRef, false);

  const ariaExpanded = featuredArtist?.name === node.data.node?.name;

  useFocus(nodeRef, focused);

  const width = 32;
  const height = 32;
  const isRoot = node.depth === 0;
  const isParent = !!node.children;
  const top = node.y;
  const left = node.x;

  const handleOnKeyUp = useCallback(
    (event: KeyboardEvent<SVGGElement>) => {
      switch (event.key) {
        case KEY.HOME:
        case KEY.END:
        case KEY.ENTER:
        case KEY.SPACE:
        case KEY.ARROW_LEFT:
        case KEY.ARROW_UP:
        case KEY.ARROW_RIGHT:
        case KEY.ARROW_DOWN:
          forceUpdate();
          handleOnRoverKeyUp(event);
          break;

        default:
          break;
      }

      if ((event.key === KEY.ENTER || event.key === KEY.SPACE) && node.data.node && !ariaExpanded) {
        setFeaturedArtist?.(node.data.node);
      }
    },
    [ariaExpanded, forceUpdate, handleOnRoverKeyUp, node.data.node, setFeaturedArtist]
  );

  const handleOnClick = useCallback(() => {
    handleOnRoverClick();

    forceUpdate();

    if (node.data.node && !ariaExpanded) {
      setFeaturedArtist?.(node.data.node);
    }
  }, [ariaExpanded, forceUpdate, handleOnRoverClick, node.data.node, setFeaturedArtist]);

  const pictureProps = {
    imageUrl: filterImagesBySize(node.data.node?.images),
    width,
    height,
  };

  if (!node) {
    return null;
  }

  return (
    <Group
      innerRef={nodeRef}
      className={styles.node}
      role="button"
      top={top}
      left={left}
      aria-labelledby={id}
      aria-expanded={ariaExpanded}
      aria-controls="artist-details"
      aria-owns="artist-details"
      tabIndex={tabIndex}
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
