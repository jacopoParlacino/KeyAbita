import styles from "./Header.module.scss";
import { Bell } from "lucide-react";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1>Dashboard</h1>
        <p className="header-subtitle">Bentornato, Admin. Ecco il riepilogo di valutazioni per te.</p>
      </div>

      <div className={styles.right}>
      <button className={styles.notificationBtn}>
      <Bell size={20}/>
      </button>
      </div>
    </header>
  );
};

export default Header;
