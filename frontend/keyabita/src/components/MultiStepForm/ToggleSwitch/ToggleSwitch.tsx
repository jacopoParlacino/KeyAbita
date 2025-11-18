import styles from './ToggleSwitch.module.scss';

interface ToggleSwitchProps {
  label: string;
  value: boolean; 
  onChange: (newValue: boolean) => void;
}

export default function ToggleSwitch({ label, value, onChange }: ToggleSwitchProps) {
  
  const handleSelectYes = () => {
    if (value !== true) {
      onChange(true);
    }
  };

  const handleSelectNo = () => {
    if (value !== false) {
      onChange(false);
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      <div className={styles.switch__wrapper}>
        <button
          type="button"
          className={`${styles.button} ${value === true ? styles.active : ''}`}
          onClick={handleSelectYes}
        >
          Sì
        </button>
        <button
          type="button"
          className={`${styles.button} ${value === false ? styles.active : ''}`}
          onClick={handleSelectNo}
        >
          No
        </button>
      </div>
    </div>
  );
}