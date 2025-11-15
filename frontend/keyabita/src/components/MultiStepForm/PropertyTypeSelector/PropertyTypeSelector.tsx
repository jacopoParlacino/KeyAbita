import React from "react";
import styles from "./PropertyTypeSelector.module.scss";

interface PropertyTypeSelectorProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  isSelected: boolean;
}

export default function PropertyTypeSelector({
  icon: Icon,
  label,
  isSelected, 
  onClick}: PropertyTypeSelectorProps) {

  const buttonClasses = [
    styles.btn__property,
    !isSelected ? styles.not__selected : "" 
  ].join(" ");

  return (
    <button type="button" className={buttonClasses} onClick={onClick}>
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );
}
