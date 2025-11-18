import styles from "./TestimonialInfoBlockDesktop.module.scss";

interface InfoItem {
  value: string;
  label: string;
}

/**
 * TestimonialInfoBlockDesktop component renders a horizontal set of info items (value + label) for desktop view.
 *
 * Useful for displaying statistics, highlights, or key numbers in testimonial sections in a desktop layout.
 */
export default function TestimonialInfoBlockDesktop({ items }: { items: InfoItem[] }) {
  return (
    <div className={styles.infoDesktop}>
      {items.map((item, i) => (
        <div key={i} className={styles.infoItem}>
          <span className={styles.value}>{item.value}</span>
          <span className={styles.label}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
