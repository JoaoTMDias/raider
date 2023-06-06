import { Group } from "@visx/group";
import { Cluster, hierarchy, Tree } from "@visx/hierarchy";
import { useUpdate } from "react-use";
import { Zoom } from "@visx/zoom";
import { LinkVertical } from "@visx/shape";
import { HierarchyPointNode } from "@visx/hierarchy/lib/types";
import styles from "./index.module.scss";
import { makeId } from "@feedzai/react-a11y-tools";
import ChartNode from "./ChartNode";
import { getRootHierarchy } from "./helpers";
import CircleTemplate from "./CircleTemplate";
import { SharedStateArtists } from "@/containers/SharedResultsNetwork/types";
import ZoomToolbar from "./ZoomToolbar";
import { useCallback } from "react";

export interface Props {
  items: SharedStateArtists;
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
}

const DEFAULT_MARGIN = {
  top: 64,
  left: 24,
  right: 24,
  bottom: 64,
};

const INITIAL_TRANSFORM = {
  scaleX: 1.0,
  scaleY: 1.0,
  translateX: 0,
  translateY: 64,
  skewX: 0,
  skewY: 0,
};

export type TreeNode = SharedStateArtists;

export default function Chart({
  items,
  width: totalWidth,
  height: totalHeight,
  margin = DEFAULT_MARGIN,
}: Props) {
  const forceUpdate = useUpdate();
  const sizeWidth = totalWidth - margin.left - margin.right;
  const sizeHeight = totalHeight - margin.top - margin.bottom;

  const onClear = () => console.log("clear");

  /**
   * Renders the lines that connect each chart node
   */
  function renderChartLines(tree: HierarchyPointNode<TreeNode>) {
    return tree
      .links()
      .map((link, i) => (
        <LinkVertical
          key={i}
          data={link}
          stroke="var(--raider-viz-stroke)"
          strokeWidth="2"
          fill="none"
        />
      ));
  }

  /**
   * Renders a collection of chart nodes
   */
  function renderChartNodes(tree: HierarchyPointNode<TreeNode>) {
    return tree.descendants().map((node, key) => {
      const id = makeId("raider-chart-node", key);
      return <ChartNode key={id} id={id} node={node} forceUpdate={forceUpdate} />;
    });
  }

  return (
    <Zoom<SVGSVGElement>
      width={totalWidth}
      height={totalHeight}
      scaleXMin={1 / 2}
      scaleXMax={4}
      scaleYMin={1 / 2}
      scaleYMax={4}
      initialTransformMatrix={INITIAL_TRANSFORM}
    >
      {(zoom) => {
        function handleOnZoom(type: "in" | "out") {
          switch (type) {
            case "in":
              zoom.scale({ scaleX: 1.2, scaleY: 1.2 });
              break;

            case "out":
              zoom.scale({ scaleX: 0.8, scaleY: 0.8 });
              break;

            default:
              break;
          }
        }

        return (
          <>
            <svg
              className={styles.chart}
              xmlns="http://www.w3.org/2000/svg"
              width={totalWidth}
              height={totalHeight}
              style={{ cursor: zoom.isDragging ? "grabbing" : "grab", touchAction: "none" }}
              ref={zoom.containerRef}
            >
              <CircleTemplate />
              <Tree
                root={getRootHierarchy(items, (stateEntry) => {
                  if (stateEntry.isExpanded) {
                    return null;
                  }

                  return stateEntry.relatedNodes;
                })}
                size={[sizeWidth, sizeHeight]}
                separation={(a, b) => (a.parent === b.parent ? 1 : 0.5) / a.depth}
              >
                {(tree) => (
                  <Group
                    id="node-group-tree"
                    top={margin.top}
                    left={margin.left}
                    transform={zoom.toString()}
                  >
                    <>
                      {renderChartLines(tree)}
                      {renderChartNodes(tree)}
                    </>
                  </Group>
                )}
              </Tree>
            </svg>

            <ZoomToolbar
              onZoom={handleOnZoom}
              onClear={zoom.clear}
              onCenter={zoom.center}
              onReset={zoom.reset}
            />
          </>
        );
      }}
    </Zoom>
  );
}
