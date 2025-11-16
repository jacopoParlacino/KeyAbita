import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Hamburger from "./Hamburger";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (targetId?: string) => {
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={(e) => { e.preventDefault(); handleScroll(); }}>
          <img src="/KeyAbita_Logo.svg" alt="KeyAbita logo" />
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.active : ""}`}>
          <Link to="/" >
            Home
          </Link>
          <Link to="/">Chi siamo</Link>
          <Link to="/valutazione">Valutazione</Link>
          <Link to="/login">Amministrazione</Link>
          <Link to="/" onClick={(e) => { e.preventDefault(); handleScroll("contatti"); }}>
            Contatti
          </Link>
        </nav>

        <Hamburger isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
      </div>
    </header>
  );
}
