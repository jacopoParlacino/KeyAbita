import React from "react";
import styles from "./PropertyTypeSelector.module.scss";

interface PropertyTypeSelectorProps {
  icon: React.ElementType;
  label: string;
}

export default function PropertyTypeSelector({icon: Icon,label,}: PropertyTypeSelectorProps) {
    
  return (
    <button type="button" className={styles.btn__property}>
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );
}
