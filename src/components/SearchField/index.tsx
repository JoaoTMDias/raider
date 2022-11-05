import { useSpotifySearch } from "@/hooks";
import React, { useCallback, useState } from "react";
import CategoryType from "./CategoryType";
import styles from "./index.module.scss";
import { Category } from "./types";
import SearchInput from "./SearchInput";

function SearchField() {
  const [category, setCategory] = useState<Category>("artist");
  const { results, searchTerm, setSpotifySearch } = useSpotifySearch(category);

  const onSelectCategory = useCallback((category: Category) => {
    setCategory(category);
  }, []);

  const handleOnChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSpotifySearch(event.target.value);
    },
    [setSpotifySearch]
  );

  const handleOnClickOnClear = useCallback(() => {
    setSpotifySearch("");
  }, [setSpotifySearch]);

  /**
   * Renders the category select html element
   */
  const renderCategoryType = () => {
    return <CategoryType category={category} onSelectCategory={onSelectCategory} />;
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
      <SearchInput
        value={searchTerm}
        results={results}
        category={category}
        onClear={handleOnClickOnClear}
        onChange={handleOnChangeInput}
      />
      {renderCategoryType()}
      <input className="sr-only" type="submit" value="Search" />
    </div>
  );
}

export default SearchField;
