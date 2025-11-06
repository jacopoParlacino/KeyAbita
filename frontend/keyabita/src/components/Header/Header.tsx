import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Hamburger from "./Hamburger";


export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className={styles.header}>
<div className={styles.container}>
    <Link to="/" className={styles.logo}> </Link>

    <nav className={`${styles.nav} ${menuOpen ? styles.active : ""}`}>

    <Link to="/">Home</Link>
    <Link to="/Chi siamo">Chi siamo</Link>
    <Link to="/Servizi">Servizi</Link>
    <Link to="/Valutazione">Valutazione</Link>
    <Link to="/contatti">Contatti</Link>
</nav>
<Hamburger isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
</div>

        </header>
    );
}