import { Header, VisualizationArea } from "@/components";
import { SharedChosenResultsProvider } from "@/containers";

function Home() {
  return (
    <SharedChosenResultsProvider>
      <Header />

      <main className="main">
        <VisualizationArea />
      </main>
    </SharedChosenResultsProvider>
  );
}

export default Home;
