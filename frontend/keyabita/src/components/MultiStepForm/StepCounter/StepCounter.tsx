import styles from './StepCounter.module.scss'

interface StepCounterProps {
    step : number;
}


export default function({step} : StepCounterProps){

    return(
        <p className={styles.step__counter}>Passaggio {step} di 4</p>
    )
}