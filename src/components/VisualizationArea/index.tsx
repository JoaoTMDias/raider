import { useSharedChosenResults } from "@/containers";
import { SharedResultsNetworkProvider } from "@/containers/SharedResultsNetwork";
import ChartBackground from "./ChartBackground";
import ResultsNetwork from "./ResultsNetwork";

function VisualizationArea() {
  const { items } = useSharedChosenResults();
  const hasChosenItem = items && Object.keys(items).length > 0;

  return (
    <SharedResultsNetworkProvider>
      {hasChosenItem ? (
        <>
          <ChartBackground />
          <ResultsNetwork artist={items} />
        </>
      ) : null}
    </SharedResultsNetworkProvider>
  );
}

export default VisualizationArea;
