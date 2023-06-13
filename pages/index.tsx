import { Header, VisualizationArea } from "@/components";
import ArtistDetails from "@/components/VisualizationArea/ArtistDetails";

function Home() {
  return (
    <>
      <Header />

      <main className="main">
        <VisualizationArea />
        <ArtistDetails />
      </main>
    </>
  );
}

export default Home;
