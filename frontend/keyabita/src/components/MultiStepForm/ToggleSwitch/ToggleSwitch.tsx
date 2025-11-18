import styles from './ToggleSwitch.module.scss';

interface ToggleSwitchProps {
  label: string;
  value: number;
  onChange: (newValue: number) => void;
}

export default function ToggleSwitch({ label, value, onChange }: ToggleSwitchProps) {

  const handleSelectYes = () => {
    if (value !== 1) {
      onChange(1);
    }
  };

  const handleSelectNo = () => {
    if (value !== 0) {
      onChange(0);
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      <div className={styles.switch__wrapper}>
        <button
          type="button"
          className={`${styles.button} ${value === 1 ? styles.active : ''}`}
          onClick={handleSelectYes}
        >
          Sì
        </button>
        <button
          type="button"
          className={`${styles.button} ${value === 0 ? styles.active : ''}`}
          onClick={handleSelectNo}
        >
          No
        </button>
      </div>
    </div>
  );
}