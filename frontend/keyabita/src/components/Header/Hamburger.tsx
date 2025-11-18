import styles from "./Header.module.scss";

type HamburgerProps = {
  isOpen: boolean;
  onClick: () => void;
};

/**
 * Hamburger component renders a button with three lines (hamburger menu).
 *
 * The button toggles the menu open/closed state.
 * Applies an "open" style when `isOpen` is true.
 */
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
  );
}
