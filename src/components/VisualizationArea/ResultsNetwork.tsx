import { useQuery } from "@tanstack/react-query";
import { ParentSize } from "@visx/responsive";
import { useEffect } from "react";
import { usePrevious } from "react-use";
import Chart from "./Chart";
import { getRelatedArtists } from "./helpers";
import styles from "./index.module.scss";
import { useRaiderStore } from "@/containers";
import { isEmpty, isNil, isObject } from "@jtmdias/js-utilities";
import { ArtistItem } from "@/typings/artist";

interface Props {
  artist: ArtistItem;
}

function ResultsNetwork({ artist }: Props) {
  const items = useRaiderStore((state) => state.nodes);
  const updateRelatedArtists = useRaiderStore((state) => state.updateRelatedArtists);
  const previousArtistId = usePrevious(artist.id);
  const hasNewArtist = !!(artist.id !== previousArtistId);

  const { data, refetch, isError, isSuccess, isFetching, isPlaceholderData, isPending } = useQuery({
    queryKey: ["related-artists", artist.name],
    queryFn: () => getRelatedArtists(artist.name),
    enabled: false,
    retry: 1,
  });
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
    if (isError) {
      console.error('Failed to fetch related artists');
    }
  }, [isError]);

  useEffect(() => {
    const hasNewData = data && !isPlaceholderData;

    if (hasNewData) {
      updateRelatedArtists(artist, data);
    }
  }, [artist, data, updateRelatedArtists, isSuccess, isPlaceholderData]);

  return hasItems ? (
    <ParentSize className={styles.chart__container}>
      {({ width, height }: { width: number; height: number }) => {
        if (isFetching) {
          return <p>Fetching...</p>;
        }

        if (isPending) {
          return <p>Loading...</p>;
        }

        if (isError) {
          return (
            <div style={{ padding: '2rem', color: '#fff', textAlign: 'center' }}>
              <p>Unable to load related artists.</p>
            </div>
          );
        }

        return <Chart items={items} width={width} height={height} />;
      }}
    </ParentSize>
  ) : null;
}

export default ResultsNetwork;
