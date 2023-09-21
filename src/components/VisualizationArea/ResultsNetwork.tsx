import { useQuery } from "@tanstack/react-query";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { useEffect } from "react";
import { usePrevious } from "react-use";
import Chart from "./Chart";
import { getRelatedArtists } from "./helpers";
import styles from "./index.module.scss";
import { useRaiderStore } from "@/containers";
import { isEmpty, isNil, isObject } from "@jtmdias/js-utilities";
import { SpotifyArtistItem } from "@/typings/spotify";

interface Props {
  artist: SpotifyArtistItem;
}

function ResultsNetwork({ artist }: Props) {
  const { items, updateRelatedArtists } = useRaiderStore((state) => ({
    items: state.nodes,
    updateRelatedArtists: state.updateRelatedArtists,
  }));
  const previousArtistId = usePrevious(artist.id);
  const hasNewArtist = !!(artist.id !== previousArtistId);

  const { data, refetch, isError, isSuccess, isFetching, isPreviousData, isLoading } = useQuery(
    ["related-artists"],
    () => getRelatedArtists(artist.id),
    {
      enabled: false,
    }
  );
  const hasItems = !isNil(items) && isObject(items) && !isEmpty(items);
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
      updateRelatedArtists(artist, data);
    }
  }, [artist, data, updateRelatedArtists, isSuccess, isPreviousData]);

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

        return <Chart items={items} width={width} height={height} />;
      }}
    </ParentSize>
  ) : null;
}

export default ResultsNetwork;
