import ChartBackground from "./ChartBackground";
import ResultsNetwork from "./ResultsNetwork";
import { useRaiderStore } from "@/containers/store";
import { isEmpty, isNil, isObject } from "@jtmdias/js-utilities";

function VisualizationArea() {
  const artist = useRaiderStore((state) => state.nodes.node);
  const hasCurrentArtist = !isNil(artist) && isObject(artist) && !isEmpty(artist);

  return hasCurrentArtist ? (
    <div id="main-content" className="visualization-area" tabIndex={-1}>
      <ChartBackground />
      <ResultsNetwork artist={artist} />
    </div>
  ) : null;
}

export default VisualizationArea;
