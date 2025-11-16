import styles from './StepCounter.module.scss'

interface StepCounterProps {
    step : number;
}


export default function StepCounter({step} : StepCounterProps){

    return(
        <p className={styles.step__counter}>Passaggio {step} di 5</p>
    )
}