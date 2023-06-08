import ChartBackground from "./ChartBackground";
import ResultsNetwork from "./ResultsNetwork";
import { useRaiderStore } from "@/containers/store";
import { isEmpty, isNil, isObject } from "@jtmdias/js-utilities";

function VisualizationArea() {
  const currentArtist = useRaiderStore((state) => state.currentArtist);
  const hasCurrentArtist =
    !isNil(currentArtist) && isObject(currentArtist) && !isEmpty(currentArtist);

  return hasCurrentArtist ? (
    <>
      <ChartBackground />
      <ResultsNetwork artist={currentArtist} />
    </>
  ) : null;
}

export default VisualizationArea;
