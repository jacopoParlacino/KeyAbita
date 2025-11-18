import { useInView } from "../../../hooks/useInView";
import styles from "./AnalysisList.module.scss";

interface Item {
  icon: React.ReactNode;
  text: string;
}

interface AnalysisListProps {
  items: Item[];
}

/**
 * Renders a list of items with icons and text that animates when scrolled into view.
 *
 * Uses the `useInView` hook to detect when the list enters the viewport and applies
 * a staggered animation to each item.
 */
export default function AnalysisList({ items }: AnalysisListProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div className={styles.list} ref={ref}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`${styles.item} ${isInView ? styles.visible : ""}`}
          style={{ transitionDelay: `${idx * 150}ms` }} // one by one
        >
          <div className={styles.icon}>{item.icon}</div>
          <span className={styles.text}>{item.text}</span>
        </div>
      ))}
    </div>
  );
}
