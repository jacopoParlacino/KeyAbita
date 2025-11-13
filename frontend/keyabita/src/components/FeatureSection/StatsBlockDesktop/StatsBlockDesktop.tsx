
import { useInView } from "../../../hooks/useInView";
import styles from "./StatsBlockDesktop.module.scss";

interface StatItemDesktop {
    icon: React.ReactNode;
    title: string;
    label: string;
}

interface StatsBlockDesktopProps {
    items: StatItemDesktop[];
}

export default function StatsBlockDesktop({ items }: StatsBlockDesktopProps) {
    const { ref, isInView } = useInView<HTMLDivElement>();
    return (
        <div className={styles.stats_desktop} ref={ref}>
      {items.map((item, index) => (
        <div key={index} className={`${styles.statItem__desktop} ${isInView ? styles.animate : ""}`}>
          <span className={styles.statIcon__desktop}>{item.icon}</span>
          <span className={styles.statTitle__desktop}>{item.title}</span>
          <span className={styles.statLabel__desktop}>{item.label}</span>
        </div>
      ))}
    </div>
    );
}