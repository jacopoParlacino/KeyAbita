import styles from "./TestimonialInfoBlockDesktop.module.scss";

interface InfoItem {
  value: string;
  label: string;
}

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
