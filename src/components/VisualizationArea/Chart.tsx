import { Group } from "@visx/group";
import { Cluster, hierarchy, Tree } from "@visx/hierarchy";
import { useUpdate } from "react-use";
import { LinkVertical } from "@visx/shape";
import { HierarchyPointNode } from "@visx/hierarchy/lib/types";
import styles from "./index.module.scss";
import { makeId } from "@feedzai/react-a11y-tools";
import ChartNode from "./ChartNode";
import { getRootHierarchy } from "./helpers";
import CircleTemplate from "./CircleTemplate";
import { SharedStateArtists } from "@/containers/SharedResultsNetwork/types";

export interface Props {
  items: SharedStateArtists;
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
}

const defaultMargin = { top: 24, left: 64, right: 64, bottom: 24 };

export type TreeNode = SharedStateArtists;

export default function Chart({
  items,
  width: totalWidth,
  height: totalHeight,
  margin = defaultMargin,
}: Props) {
  const forceUpdate = useUpdate();
  const sizeWidth = totalWidth - margin.left - margin.right;
  const sizeHeight = totalHeight - margin.top - margin.bottom;

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
    <svg
      className={styles.chart}
      xmlns="http://www.w3.org/2000/svg"
      width={totalWidth}
      height={totalHeight}
    >
      <CircleTemplate />
      <Cluster
        root={getRootHierarchy(items, (stateEntry) => {
          if (stateEntry.isExpanded) {
            return null;
          }

          return stateEntry.relatedNodes;
        })}
        size={[sizeWidth, sizeHeight]}
      >
        {(tree) => (
          <Group id="node-group-tree" top={margin.top} left={margin.left}>
            <>
              {renderChartLines(tree)}
              {renderChartNodes(tree)}
            </>
          </Group>
        )}
      </Cluster>
    </svg>
  );
}
