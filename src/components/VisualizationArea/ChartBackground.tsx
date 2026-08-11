import styles from "./index.module.scss";
import { useRaiderStore } from "@/containers/store";

function ChartBackground() {
  const itemImage = useRaiderStore((state) => state.featuredArtist.images);

  const image = Array.isArray(itemImage) ? itemImage[0]?.url : undefined;

  const style = {
    "--chart-background-image": `url("${image}")`,
  } as React.CSSProperties;

  return <div className={styles.chart__background} style={style} />;
}

export default ChartBackground;
