import styles from "./StatsCard.module.scss";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const StatsCard = ({ title, value, icon }: StatsCardProps) => {
  return (
    <div className={styles.card}>
      <div>{title}</div>
      <div className={styles.value}>{value}</div>
      <div className={styles.icon}>{icon}</div>
    </div>
  );
};

export default StatsCard;
