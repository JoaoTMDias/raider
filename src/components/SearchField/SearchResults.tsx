import { useSharedChosenResults } from "@/containers";
import { FALLBACK_IMAGE, filterImagesBySize } from "@/helpers";
import { SpotifyArtistItem, SpotifySearchResults } from "@/typings/spotify";
import { callIfExists, makeId } from "@feedzai/react-a11y-tools";
import { ComboboxItem } from "ariakit/combobox";

import Image from "next/image";
import { useCallback } from "react";
import styles from "./index.module.scss";
import { SearchResultsProps } from "./types";

/**
 * Displays the results from the search performed on the input
 */
function SearchResults({ category, query, onSelect }: SearchResultsProps): JSX.Element {
  const { dispatch } = useSharedChosenResults();

  const isGenre = category === "genre";
  const hasData = Array.isArray(query.data);

  const handleOnSelect = useCallback(
    (item: string | SpotifyArtistItem) => {
      callIfExists(onSelect, item);
      dispatch({
        type: "SET_CHOSEN_RESULT",
        payload: item,
      });
    },
    [dispatch, onSelect]
  );

  const renderItems = (results: SpotifySearchResults["items"]) => {
    const list = results.map((item, index) => {
      function onSelectItem() {
        handleOnSelect(results[index]);
      }

      const key = isGenre
        ? makeId(item as string, index)
        : makeId((item as SpotifyArtistItem).name, index);

      if (isGenre) {
        return (
          <ComboboxItem
            key={key}
            className={styles["search-results__item"]}
            value={item as string}
            onClick={onSelectItem}
          >
            <span className={styles["search-result__name"]}>{item as string}</span>
          </ComboboxItem>
        );
      }

      const artistItem = item as SpotifyArtistItem;

      const img = filterImagesBySize(artistItem.images);

      return (
        <ComboboxItem
          key={key}
          className={styles["search-results__item"]}
          value={artistItem.name!}
          onClick={onSelectItem}
        >
          {img && <Image src={img} width="24" height="24" alt="" />}
          <span className={styles["search-result__name"]}>{artistItem.name}</span>
        </ComboboxItem>
      );
    });

    return <>{list}</>;
  };

  if (query.isError) {
    return <span className={styles["search-result__empty"]}>Error fetching data</span>;
  }

  if (query.isFetching) {
    return <span className={styles["search-result__empty"]}>Searching...</span>;
  }

  if (query.isLoading) {
    return <span className={styles["search-result__empty"]}>Loading data...</span>;
  }

  const hasResults = hasData && query.data.length > 0;

  if (!hasResults) {
    return <span className={styles["search-result__empty"]}>No results to display</span>;
  }

  return renderItems(query.data as SpotifySearchResults["items"]);
}

SearchResults.displayName = "SearchResults";

export default SearchResults;
