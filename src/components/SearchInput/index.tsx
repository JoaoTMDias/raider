import { useSpotifySearch } from "@/hooks";
import React, { useCallback, useState } from "react";
import CategoryType from "./CategoryType";
import styles from "./index.module.scss";
import SearchResults from "./SearchResults";
import { Category } from "./types";

function SearchInput() {
  const [category, setCategory] = useState<Category>("artist");
  const { results, searchTerm, setSpotifySearch } = useSpotifySearch(category);

  const handleOnChangeCategory = useCallback((category: Category) => {
    setCategory(category);
  }, []);

  const handleOnChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSpotifySearch(event.target.value);
    },
    [setSpotifySearch]
  );

  /**
   * Rendres the Clear button on the input
   */
  const renderRemoveButton = () => {
    return (
      <button type="reset" className={styles.search__clear}>
        <span className="sr-only">Clear input</span>
        <svg
          className={styles.search__remove}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="white"
            d="M0 12C0 5.372 5.372 0 12 0s12 5.372 12 12-5.372 12-12 12S0 18.628 0 12Zm8.203-2.245 2.208 2.203-2.208 2.245c-.436.44-.436 1.153 0 1.552.44.478 1.153.478 1.552 0l2.203-2.166 2.245 2.166c.44.478 1.153.478 1.552 0 .478-.399.478-1.111 0-1.552l-2.166-2.245 2.166-2.203c.478-.399.478-1.111 0-1.552-.399-.436-1.111-.436-1.552 0l-2.245 2.208-2.203-2.208c-.399-.436-1.111-.436-1.552 0-.436.44-.436 1.153 0 1.552Z"
          />
        </svg>
      </button>
    );
  };

  const renderSearchInput = () => {
    const hasTextWritten = searchTerm && searchTerm.length >= 1;
    const hasResults = results.length > 0;
    const searchLabel = `Search for ${category}`;
    const searchPlaceholder = category === "artist" ? `Eg. Black Sabbath` : `Eg. Rock`;

    return (
      <div className={styles.search__input}>
        <label id="search-label" className="sr-only" htmlFor="search-input">
          {searchLabel}
        </label>
        <div className={styles.search__input__container}>
          <input
            aria-autocomplete="list"
            aria-expanded="false"
            aria-controls="raider-search-results"
            aria-owns="raider-search-results"
            autoComplete="off"
            className={styles.search__text}
            id="search-input"
            name="input-autocomplete"
            placeholder={searchPlaceholder}
            role="combobox"
            type="text"
            onChange={handleOnChangeInput}
          />
          {hasTextWritten && hasResults ? <SearchResults /> : null}
        </div>
        {hasTextWritten ? renderRemoveButton() : null}
      </div>
    );
  };

  /**
   * Renders the category select html element
   */
  const renderCategoryType = () => {
    return <CategoryType category={category} onSelectCategory={handleOnChangeCategory} />;
  };

  return (
    <div className={styles.search__container}>
      <svg
        className={styles.search__icon}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 25"
      >
        <path
          fill="#fff"
          d="m23.451 20.798-5.61-5.61a9.747 9.747 0 0 0 1.568-6.783c-.575-4.29-4.09-7.78-8.384-8.324A9.758 9.758 0 0 0 .08 11.025c.544 4.296 4.035 7.814 8.325 8.386a9.745 9.745 0 0 0 6.783-1.569l5.61 5.611a1.875 1.875 0 1 0 2.652-2.655ZM3.709 9.75c0-3.308 2.691-6 6-6 3.308 0 6 2.692 6 6s-2.692 6-6 6c-3.309 0-6-2.69-6-6Z"
        />
      </svg>
      {renderSearchInput()}
      {renderCategoryType()}
      <input className="sr-only" type="submit" value="Search" />
    </div>
  );
}

export default SearchInput;
