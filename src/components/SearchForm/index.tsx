import { useCallback } from "react";
import { SearchField } from "@/components";
import styles from "./index.module.scss";

function SearchForm(): JSX.Element {
  const onSubmitSearch = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }, []);

  return (
    <form
      className={styles.search}
      role="search"
      aria-labelledby="search-form-title"
      onSubmit={onSubmitSearch}
    >
      <h2 id="search-form-title" className="sr-only">
        Music Search Form
      </h2>
      <SearchField />
    </form>
  );
}

export default SearchForm;
