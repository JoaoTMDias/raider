import { UserComboBox, SearchForm, SpotifyLogo } from "@/components";
import styles from "./index.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>
        <SpotifyLogo />
        <span className="sr-only">Music Raider</span>
      </h1>
      <SearchForm />
      <UserComboBox />
    </header>
  );
}

export default Header;
