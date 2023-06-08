import styles from "./index.module.scss";
import { Combobox, ComboboxPopover, useComboboxState } from "ariakit/combobox";
import SearchResults from "./SearchResults";
import { SearchInputProps } from "./types";
import { useCallback } from "react";
import { callIfExists } from "@jtmdias/js-utilities";
import { useSpotifySearch } from "@/hooks";

function SearchInput({ category, onClear, onChange }: SearchInputProps): JSX.Element {
  const { searchTerm, setSearchTerm, query } = useSpotifySearch(category);
  const combobox = useComboboxState({
    gutter: 4,
    sameWidth: true,
    animated: true,
  });

  const searchLabel = `Search for ${category}`;
  const searchPlaceholder = category === "artist" ? `Eg. Black Sabbath` : `Eg. Rock`;
  const hasTextWritten = searchTerm && searchTerm.length >= 1;

  const handleOnChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      callIfExists(onChange, event);
      setSearchTerm(event.target.value.toString());
    },
    [onChange, setSearchTerm]
  );

  const handleOnClear = useCallback(() => {
    callIfExists(onClear);
    callIfExists(combobox.setValue, "");
  }, [combobox.setValue, onClear]);

  /**
   * Renders the Clear button on the input
   */
  function renderRemoveButton() {
    return (
      <button type="reset" className={styles.search__clear} onClick={handleOnClear}>
        <span className="sr-only">Clear input</span>
        <svg
          className={styles.search__remove}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="white"
            d="M0 12C0 5.372 5.372 0 12 0s12 5.372 12 12-5.372 12-12 12S0 18.628 0 12Zm8.203-2.245 2.208 2.203-2.208 2.245c-.436.44-.436 1.153 0 1.552.44.478 1.153.478 1.552 0l2.203-2.166 2.245 2.166c.44.478 1.153.478 1.552 0 .478-.399.478-1.111 0-1.552l-2.166-2.245 2.166-2.203c.478-.399.478-1.111 0-1.552-.399-.436-1.111-.436-1.552 0l-2.245 2.208-2.203-2.208c-.399-.436-1.111-.436-1.552 0-.436.44-.436 1.153 0 1.552Z"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className={styles.search__input} aria-label={searchLabel}>
      <div className={styles.search__input__container}>
        <Combobox
          state={combobox}
          className={styles.search__text}
          placeholder={searchPlaceholder}
          onChange={handleOnChangeInput}
        />
        {query && hasTextWritten ? (
          <ComboboxPopover state={combobox} className={styles["search-results"]}>
            <SearchResults category={category} query={query} />
          </ComboboxPopover>
        ) : null}
      </div>
      {hasTextWritten ? renderRemoveButton() : null}
    </div>
  );
}

export default SearchInput;
