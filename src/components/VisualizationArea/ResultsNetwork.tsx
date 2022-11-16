import { SharedState } from "@/containers/SharedChosenResults/types";
import { useSharedResultsNetwork } from "@/containers/SharedResultsNetwork";
import { SpotifySearchResults } from "@/typings/spotify";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { useEffect } from "react";
import { usePrevious } from "react-use";
import Chart from "./Chart";

interface Props {
  artist: SharedState["items"];
}

function ResultsNetwork({ artist }: Props) {
  const { items, dispatch } = useSharedResultsNetwork();
  const hasItems = items && Object.keys(items).length >= 0;
  const hasSingleNode = !items.relatedNodes || Object.keys(items.relatedNodes).length === 0;
  const previousArtist = usePrevious(artist);

  useEffect(() => {
    const hasNewArtist = !!artist;
    const artistIsDifferent = hasNewArtist && artist.id !== previousArtist?.id;

    if (hasNewArtist || artistIsDifferent) {
      if (hasSingleNode) {
        dispatch({
          type: "FIRST_RESULT",
          payload: artist,
        });
      }
    }
  }, [artist, dispatch, hasSingleNode, previousArtist?.id]);

  console.log("hasRelatedNodes?", !!(items.relatedNodes && items.relatedNodes?.length > 0));

  return hasItems ? (
    <ParentSize>
      {({ width, height }) => <Chart items={items} width={width} height={height} />}
    </ParentSize>
  ) : null;
}

export default ResultsNetwork;
