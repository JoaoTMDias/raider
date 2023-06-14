import { Header, VisualizationArea } from "@/components";
import { SkipLinks } from "@jtmdias/react-a11y-tools";
import ArtistDetails from "@/components/VisualizationArea/ArtistDetails";

function Home() {
  return (
    <>
      <SkipLinks
        items={[
          {
            target: "#main-content",
            text: "Go to Main content",
            as: "button",
          },
          {
            target: "#search-form",
            text: "Go to Search form",
            as: "button",
          },
          {
            target: "#authentication",
            text: "Go to Authentication",
            as: "button",
          },
          {
            target: "#artist-details",
            text: "Go to Artist Details",
            as: "button",
          },
        ]}
      />
      <Header />

      <main className="main">
        <VisualizationArea />
        <ArtistDetails />
      </main>
    </>
  );
}

export default Home;
