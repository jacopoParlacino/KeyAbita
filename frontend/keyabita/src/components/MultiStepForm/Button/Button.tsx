import styles from './Button.module.scss'

interface ButtonProps{
    label : string;
    onClick : () => void;
    variant?: 'primary' | 'secondary';
}

export default function Button({label, onClick, variant = 'primary',} : ButtonProps){

    return(
        <button className={styles[variant]} onClick={onClick}>{label}</button>
    )
}