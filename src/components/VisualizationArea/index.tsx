import { useSharedChosenResults } from "@/containers";
import { SharedResultsNetworkProvider } from "@/containers/SharedResultsNetwork";
import ResultsNetwork from "./ResultsNetwork";

function VisualizationArea() {
  const { items } = useSharedChosenResults();
  const hasChosenItem = items && Object.keys(items).length > 0;

  return (
    <SharedResultsNetworkProvider>
      {hasChosenItem ? <ResultsNetwork artist={items} /> : null}
    </SharedResultsNetworkProvider>
  );
}

export default VisualizationArea;
