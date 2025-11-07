import styles from './Button.module.scss'

interface ButtonProps {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
    type?: 'button' | 'submit';
    disabled?: boolean;
}

export default function Button({
    label,
    onClick,
    variant = 'primary',
    type = 'button',
    disabled = false
}: ButtonProps) {

    return (
        <button className={styles[variant]} onClick={onClick} type={type} disabled={disabled}>{label}</button>
    )
}