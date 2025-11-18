import { useInView } from "../../../hooks/useInView";
import styles from "./AnalysisListDesktop.module.scss";

interface Item {
  icon: React.ReactNode;
  title: string;
  text?: string;
}

interface AnalysisListDesktopProps {
  items: Item[];
}

/**
 * Renders a desktop-style list of items with icons, titles, and optional text.
 *
 * Uses the `useInView` hook to animate items when the list scrolls into view.
 * Each item appears with a staggered delay for a smooth entrance animation.
 */
export default function AnalysisListDesktop({
  items,
}: AnalysisListDesktopProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div className={styles.analysislist__desktop} ref={ref}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`${styles.analysislistD__item} ${
            isInView ? styles.visible : ""
          }`}
          style={{ transitionDelay: `${idx * 150}ms` }}
        >
          <div className={styles.analysislistD__icon}>{item.icon}</div>

          <div className={styles.analysislistD__content}>
            {item.title && (
              <span className={styles.analysislistD__title}>{item.title}</span>
            )}
            {item.text && (
              <span className={styles.analysislistD__text}>{item.text}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
