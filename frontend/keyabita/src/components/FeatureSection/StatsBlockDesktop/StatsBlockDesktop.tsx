
//NOT CHANGED

import { useInView } from "../../../hooks/useInView";
import styles from "./StatsBlockDesktop.module.scss";

interface StatItem {
    value: string;
    label: string;
}

interface StatsBlockProps {
    items: StatItem[];
}

export default function StatsBlock({ items }: StatsBlockProps) {
    const { ref, isInView } = useInView<HTMLDivElement>();
    return (
        <div className={styles.stats} ref={ref}>
      {items.map((item, index) => (
        <div key={index} className={`${styles.statItem} ${isInView ? styles.animate : ""}`}>
          <span className={styles.statNumber}>{item.value}</span>
          <span className={styles.statLabel}>{item.label}</span>
        </div>
      ))}
    </div>
    );
}