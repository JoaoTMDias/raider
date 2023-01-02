import { SharedState } from "@/containers/SharedChosenResults/types";
import { useSharedResultsNetwork } from "@/containers/SharedResultsNetwork";
import { useQuery } from "@tanstack/react-query";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { useEffect } from "react";
import { usePrevious } from "react-use";
import Chart from "./Chart";
import { getRelatedArtists } from "./helpers";
import styles from "./index.module.scss";

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
  const hasSubItems =
    hasItems &&
    items.relatedNodes?.find(
      (node) => Array.isArray(node.relatedNodes) && node.relatedNodes.length > 0
    );

  useEffect(() => {
    if (hasNewArtist) {
      refetch();
    }
  }, [hasNewArtist, refetch]);

  useEffect(() => {
    const hasNewData = data && !isPreviousData;

    if (hasNewData) {
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
    <ParentSize className={styles.chart__container}>
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

        const parentWidth = hasSubItems ? width : width * 0.25;

        return <Chart items={items} width={parentWidth} height={height} />;
      }}
    </ParentSize>
  ) : null;
}

export default ResultsNetwork;
