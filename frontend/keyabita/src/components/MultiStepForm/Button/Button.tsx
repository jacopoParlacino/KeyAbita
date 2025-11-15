import React from "react";

import styles from './Button.module.scss'


interface ButtonProps {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
    type?: 'button' | 'submit';
    disabled?: boolean;
    icon?: React.ElementType;
}

export default function Button({
    label,
    onClick,
    variant = 'primary',
    type = 'button',
    disabled = false,
    icon: Icon
}: ButtonProps) {

    return (

        <button 
        className={`${styles[variant]} ${Icon ? styles.withIcon : ''}`} 
        onClick={onClick} 
        type={type} 
        disabled={disabled}>
            {Icon && <Icon size={20} className={styles.icon} />}
            <span>{label}</span>
        </button>

    )
}
