import { filterImagesBySize } from "@/helpers";
import { ArtistItem, SearchResults } from "@/typings/artist";
import { makeId } from "@jtmdias/react-a11y-tools";
import * as Ariakit from "@ariakit/react";


import Image from "next/image";
import { useCallback } from "react";
import styles from "./index.module.scss";
import { SearchResultsProps } from "./types";
import { callIfExists } from "@jtmdias/js-utilities";
import { useRaiderStore } from "@/containers/store";

/**
 * Displays the results from the search performed on the input
 */
function SearchResults({ category, query, onSelect }: SearchResultsProps): JSX.Element {
  const setSearchResults = useRaiderStore((state) => state.setSearchResults);
  const isGenre = category === "genre";
  const hasData = Array.isArray(query.data);

  const handleOnSelect = useCallback(
    (item: string | ArtistItem) => {
      callIfExists(onSelect, item);

      if (typeof item !== "string") {
        callIfExists(setSearchResults, item);
      }
    },
    [setSearchResults, onSelect]
  );

  const renderItems = (results: SearchResults["items"]) => {
    const list = results.map((item, index) => {
      function onSelectItem() {
        handleOnSelect(results[index]);
      }

      const isStringItem = typeof item === "string";
      const key = isStringItem ? makeId(item, index) : makeId((item as ArtistItem).name, index);

      if (isStringItem) {
        return (
          <Ariakit.ComboboxItem
            key={key}
            className={styles["search-results__item"]}
            value={item as string}
            onClick={onSelectItem}
          >
            <span className={styles["search-result__name"]}>{item as string}</span>
          </Ariakit.ComboboxItem>
        );
      }

      const artistItem = item as ArtistItem;

      const img = filterImagesBySize(artistItem.images);

      return (
        <Ariakit.ComboboxItem
          key={key}
          className={styles["search-results__item"]}
          value={artistItem.name!}
          onClick={onSelectItem}
        >
          {img && <Image src={img} width="24" height="24" alt="" />}
          <span className={styles["search-result__name"]}>{artistItem.name}</span>
        </Ariakit.ComboboxItem>
      );
    });

    return <>{list}</>;
  };

  if (query.isError) {
    return (
      <span className={styles["search-result__empty"]}>
        {isGenre ? "Error fetching genres" : "Unable to search artists right now."}
      </span>
    );
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

  return renderItems(query.data as SearchResults["items"]);
}
export default SearchResults;
