import styles from './ProgressBar.module.scss'

interface ProgressBarProps {
    step: number;
    total: number;
}


export default function ProgressBar  ({step, total} : ProgressBarProps){

    const progress = ( step / total) * 100;

    return (

        <div className={styles.bar__container}>
            <div className={styles.bar} style={{width: `${progress}%`}}></div>
        </div>

    )
}