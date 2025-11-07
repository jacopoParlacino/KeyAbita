import styles from "./Header.module.scss";

type HamburgerProps = {
  isOpen: boolean;
  onClick: () => void;
  
};

export default function Hamburger({ isOpen, onClick }: HamburgerProps) {
  return (
    <button 
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