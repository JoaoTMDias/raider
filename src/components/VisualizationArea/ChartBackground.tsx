import { useSharedChosenResults } from "@/containers";
import styles from "./index.module.scss";

function ChartBackground(): JSX.Element {
  const { items } = useSharedChosenResults();

  const image = items.images && items.images[0]?.url;

  const style = {
    "--chart-background-image": `url("${image}")`,
  } as React.CSSProperties;

  return <div className={styles.chart__background} style={style} />;
}

export default ChartBackground;
