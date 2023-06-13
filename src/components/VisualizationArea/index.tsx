import ChartBackground from "./ChartBackground";
import ResultsNetwork from "./ResultsNetwork";
import { useRaiderStore } from "@/containers/store";
import { isEmpty, isNil, isObject } from "@jtmdias/js-utilities";

function VisualizationArea() {
  const currentArtist = useRaiderStore((state) => state.currentArtist);
  const hasCurrentArtist =
    !isNil(currentArtist) && isObject(currentArtist) && !isEmpty(currentArtist);

  return hasCurrentArtist ? (
    <div className="visualization-area">
      <ChartBackground />
      <ResultsNetwork artist={currentArtist} />
    </div>
  ) : null;
}

export default VisualizationArea;
