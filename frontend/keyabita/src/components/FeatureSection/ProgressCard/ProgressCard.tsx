import { useInView } from "../../../hooks/useInView";
import styles from "./ProgressCard.module.scss";

interface ProgressCardProps {
  label: string;
  value: string;
  progress?: number; // 0–100
  color?: string; // progress bar color
}

/**
 * Displays a card with a label, value, and animated progress bar.
 *
 * Uses the `useInView` hook to animate the progress bar when it scrolls into view.
 */
export default function ProgressCard({
  label,
  value,
  progress = 100,
  color = "#b3e6ff",
}: ProgressCardProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div className={styles.card} ref={ref}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
      </div>

      <div className={styles.progressBar}>
        <div
          className={`${styles.progress} ${isInView ? styles.animate : ""}`}
          style={{ width: `${progress}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
}
