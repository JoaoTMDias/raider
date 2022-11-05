import { callIfExists } from "@feedzai/react-a11y-tools";
import { useCallback } from "react";
import styles from "./index.module.scss";
import { Category } from "./types";

interface Props {
  category: Category;
  onSelectCategory: (category: Category) => void;
}

function CategoryType({ category, onSelectCategory }: Props): JSX.Element {
  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      callIfExists(onSelectCategory, event.target.value as Category);
    },
    [onSelectCategory]
  );
  return (
    <div className={styles.search__category} role="radiogroup" aria-label="Type of music category">
      <label
        htmlFor="artist"
        className={styles.search__category__label}
        data-checked={category === "artist"}
      >
        <input
          id="artist"
          type="radio"
          name="category-type"
          value="artist"
          className={styles.search__category__input}
          onChange={handleOnChange}
        />
        <span className={styles.search__category__item}>Artist</span>
      </label>
      <label
        htmlFor="genre"
        className={styles.search__category__label}
        data-checked={category === "genre"}
      >
        <input
          id="genre"
          type="radio"
          name="category-type"
          value="genre"
          className={styles.search__category__input}
          onChange={handleOnChange}
        />
        <span className={styles.search__category__item}>Genre</span>
      </label>
    </div>
  );
}

export default CategoryType;
