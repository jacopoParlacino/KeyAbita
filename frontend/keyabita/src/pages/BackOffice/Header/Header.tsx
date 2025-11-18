import styles from "./Header.module.scss";

import { Bell } from "lucide-react";

const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <h1>Dashboard</h1>
        <p>Bentornato, Admin. Ecco il preview di valutazioni per te.</p>
      </div>
      <Bell />
    </header>
  );
};

export default Header;
