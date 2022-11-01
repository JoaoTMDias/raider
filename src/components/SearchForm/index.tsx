import { useCallback } from "react";
import { SearchInput } from "@/components";
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
        Search Form
      </h2>
      <SearchInput />
    </form>
  );
}

export default SearchForm;
