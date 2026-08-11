import { SearchForm } from "@/components";
import styles from "./index.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>
        <span>Music Raider</span>
      </h1>
      <SearchForm />
    </header>
  );
}

export default Header;
