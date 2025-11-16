import styles from "./QuickAccess.module.scss";

const QuickAccess = () => {
  return (
    <div className={styles.quick}>
      <button className={styles.add}>+ Aggiungi valutazione</button>
      <button className={styles.download}>Scarica report</button>
      <button className={styles.stats}>Visualizza statistiche</button>
    </div>
  );
};

export default QuickAccess;
