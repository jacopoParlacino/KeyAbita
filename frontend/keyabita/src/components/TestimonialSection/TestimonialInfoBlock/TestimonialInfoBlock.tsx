import styles from "./TestimonialInfoBlock.module.scss";

interface InfoItem {
  value: string;
  label: string;
}

interface InfoBlockProps {
  items: InfoItem[];
}

/**
 * TestimonialInfoBlock component renders a set of info items (value + label).
 *
 * Useful for displaying statistics, highlights, or key numbers in testimonial sections.
 */
export default function TestimonialInfoBlock({ items }: InfoBlockProps) {
  return (
    <div className={styles.info}>
      {items.map((item, index) => (
        <div key={index} className={styles.infoItem}>
          <span className={styles.infoNumber}>{item.value}</span>
          <span className={styles.infoLabel}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
