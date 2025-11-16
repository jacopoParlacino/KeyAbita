import styles from './ImmobileCondition.module.scss'
import React from 'react';

interface ImmobileConditionProps {
    label: string;
    onClick: () => void;
    isSelected: boolean;
    icon: React.ElementType;
}

export default function ImmobileCondition({
    label,
    onClick,
    isSelected,
    icon: Icon
} : ImmobileConditionProps){

    const buttonClasses = [
    styles.btn__property,
    !isSelected ? styles.not__selected : ""
  ].join(" ");

    return(
        <>

        <button className={buttonClasses} onClick={onClick} type="button">
            {label}
            <Icon size={20} className={styles.check__icon}/>
        </button>
        </>
    )
}