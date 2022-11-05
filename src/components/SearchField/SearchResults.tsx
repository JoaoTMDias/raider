import { SpotifyArtistImage, SpotifyArtistItem } from "@/typings/spotify";
import { makeId } from "@feedzai/react-a11y-tools";
import { ComboboxItem } from "ariakit/combobox";

import Image from "next/image";
import styles from "./index.module.scss";
import { SearchResultsProps } from "./types";

const FALLBACK_IMAGE =
  "data:image/svg+xml;base64,PHN2ZwogICAgICB2aWV3Qm94PSIwIDAgMjQgMjQiCiAgICAgIHdpZHRoPSIyNCIKICAgICAgaGVpZ2h0PSIyNCIKICAgICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICAgPgogICAgICA8Y2lyY2xlIGZpbGw9IiMyYTJhMmEiIGN4PSIxMiIgY3k9IjEyIiByPSIxMiIgLz4KICAgIDwvc3ZnPg==";

function filterImagesBySize(images: SpotifyArtistImage[]) {
  const smallestSize = Math.min.apply(
    Math,
    images.map((image) => image.height!)
  );
  const image = images.filter((image) => image.height! === smallestSize)[0].url;

  return image || FALLBACK_IMAGE;
}

/**
 * Displays the results from the search performed on the input
 */
function SearchResults({ category, results, onSelect }: SearchResultsProps): JSX.Element {
  const isGenre = category === "genre";
  const hasResults = Array.isArray(results) && results.length > 0;

  const renderItems = () => {
    const list = results.map((item, index) => {
      function onSelectItem() {
        onSelect(results[index]);
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

      const img =
        Array.isArray(artistItem.images) && artistItem.images.length >= 1
          ? filterImagesBySize(artistItem.images)
          : FALLBACK_IMAGE;

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

  return hasResults ? (
    renderItems()
  ) : (
    <span className={styles["search-result__empty"]}>No results found</span>
  );
}

SearchResults.displayName = "SearchResults";

export default SearchResults;
