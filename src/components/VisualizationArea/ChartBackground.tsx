import styles from "./index.module.scss";
import { useRaiderStore } from "@/containers/store";

function ChartBackground(): JSX.Element {
  const itemImage = useRaiderStore((state) => state.featuredArtist.images);

  const image = itemImage && itemImage[0]?.url;

  const style = {
    "--chart-background-image": `url("${image}")`,
  } as React.CSSProperties;

  return <div className={styles.chart__background} style={style} />;
}

export default ChartBackground;
