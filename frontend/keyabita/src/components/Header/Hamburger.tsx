import styles from "./Header.module.scss";

type HamburgerProps = {
  isOpen: boolean;
  onClick: () => void;
<<<<<<< HEAD
  
=======

>>>>>>> origin/frontend/mobile_homepage
};

export default function Hamburger({ isOpen, onClick }: HamburgerProps) {
  return (
<<<<<<< HEAD
    <button 
=======
    <button
>>>>>>> origin/frontend/mobile_homepage
    className={`${styles.hamburger} ${isOpen ? styles.open : ""}`}
    onClick={onClick}
    aria-label="Toggle menu"
    >
        <span />
        <span />
        <span />
    </button>

  )
}