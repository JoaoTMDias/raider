import { useSharedChosenResults } from "@/containers";
import { SharedResultsNetworkProvider } from "@/containers/SharedResultsNetwork";
import ChartBackground from "./ChartBackground";
import ResultsNetwork from "./ResultsNetwork";
import ArtistDialogDetails from "./ArtistDialogDetails";

function VisualizationArea() {
  const { items } = useSharedChosenResults();
  const hasChosenItem = items && Object.keys(items).length > 0;

  return (
    <SharedResultsNetworkProvider>
      {hasChosenItem ? (
        <>
          <ChartBackground />
          <ResultsNetwork artist={items} />
          <ArtistDialogDetails />
        </>
      ) : null}
    </SharedResultsNetworkProvider>
  );
}

export default VisualizationArea;
