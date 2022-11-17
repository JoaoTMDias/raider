import { Group } from "@visx/group";
import { Tree } from "@visx/hierarchy";
import { useUpdate } from "react-use";
import { LinkHorizontal } from "@visx/shape";
import { HierarchyPointNode } from "@visx/hierarchy/lib/types";
import styles from "./index.module.scss";
import { makeId } from "@feedzai/react-a11y-tools";
import ChartNode from "./ChartNode";
import { getRootHierarchy } from "./helpers";
import CircleTemplate from "./CircleTemplate";
import ChartBackground from "./ChartBackground";
import { SharedStateArtists } from "@/containers/SharedResultsNetwork/types";

export interface Props {
  items: SharedStateArtists;
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
}

const defaultMargin = { top: 48, left: 48, right: 48, bottom: 72 };

export type TreeNode = SharedStateArtists;

export default function Chart({
  items,
  width: totalWidth,
  height: totalHeight,
  margin = defaultMargin,
}: Props) {
  const forceUpdate = useUpdate();

  const innerWidth = totalWidth - margin.left - margin.right;
  const innerHeight = totalHeight - margin.top - margin.bottom;

  const origin = { x: 0, y: 0 };
  const sizeWidth = innerHeight;
  const sizeHeight = innerWidth;

  /**
   * Renders the lines that connect each chart node
   */
  function renderChartLines(tree: HierarchyPointNode<TreeNode>) {
    return tree
      .links()
      .map((link, i) => (
        <LinkHorizontal
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
    <svg
      className={styles.chart}
      xmlns="http://www.w3.org/2000/svg"
      width={totalWidth}
      height={totalHeight}
    >
      <CircleTemplate />
      <ChartBackground width={totalWidth} height={totalHeight} />
      <Group id="node-group-wrapper" top={margin.top} left={margin.left}>
        <Tree
          root={getRootHierarchy(items, (stateEntry) => {
            if (stateEntry.isExpanded) {
              return null;
            }

            return stateEntry.relatedNodes;
          })}
          size={[sizeWidth, sizeHeight]}
          separation={(a, b) => (a.parent === b.parent ? 1 : 0) / a.depth}
        >
          {(tree) => (
            <Group id="node-group-tree" top={origin.y} left={origin.x}>
              <>
                {renderChartLines(tree)}
                {renderChartNodes(tree)}
              </>
            </Group>
          )}
        </Tree>
      </Group>
    </svg>
  );
}
