import { useInView } from "../../../hooks/useInView";
import styles from "./AnalysisListDesktop.module.scss";

interface Item {
  icon: React.ReactNode;
  text: string;
}

interface AnalysisListDesktopProps {
  items: Item[];
}

export default function AnalysisListDesktop({ items }: AnalysisListDesktopProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div className={styles.list} ref={ref}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`${styles.item} ${isInView ? styles.visible : ""}`}
          style={{ transitionDelay: `${idx * 150}ms` }}
        >
          <div className={styles.icon}>{item.icon}</div>
          <span className={styles.text}>{item.text}</span>
        </div>
      ))}
    </div>
  );
}