import React from "react";
import styles from "./PropertyTypeSelector.module.scss";

interface PropertyTypeSelectorProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}

export default function PropertyTypeSelector({icon: Icon, label, onClick}: PropertyTypeSelectorProps) {

  return (
    <button type="button" className={styles.btn__property} onClick={onClick}>
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );
}
