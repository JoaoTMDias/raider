import { SharedState } from "@/containers/SharedChosenResults/types";
import { useSharedResultsNetwork } from "@/containers/SharedResultsNetwork";
import { useQuery } from "@tanstack/react-query";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { useEffect } from "react";
import { usePrevious } from "react-use";
import Chart from "./Chart";
import { getRelatedArtists } from "./helpers";

interface Props {
  artist: SharedState["items"];
}

function ResultsNetwork({ artist }: Props) {
  const previousArtistId = usePrevious(artist.id);
  const hasNewArtist = !!(artist.id !== previousArtistId);

  const { data, refetch, isError, isSuccess, isFetching, isPreviousData, isLoading } = useQuery(
    ["related-artists"],
    () => getRelatedArtists(artist.id),
    {
      enabled: false,
    }
  );
  const { items, dispatch } = useSharedResultsNetwork();
  const hasItems = items && Object.keys(items).length >= 0;

  useEffect(() => {
    if (hasNewArtist) {
      refetch();
    }
  }, [hasNewArtist, refetch]);

  useEffect(() => {
    if (data && !isPreviousData) {
      dispatch({
        type: "UPDATE_RELATED_ARTISTS",
        payload: {
          node: artist,
          relatedNodes: data,
        },
      });
    }
  }, [artist, data, dispatch, isSuccess, isPreviousData]);

  return hasItems ? (
    <ParentSize>
      {({ width, height }) => {
        if (isFetching) {
          return <p>Fetching...</p>;
        }

        if (isLoading) {
          return <p>Loading...</p>;
        }

        if (isError) {
          return <p>Error...</p>;
        }

        return <Chart items={items} width={width} height={height} />;
      }}
    </ParentSize>
  ) : null;
}

export default ResultsNetwork;
