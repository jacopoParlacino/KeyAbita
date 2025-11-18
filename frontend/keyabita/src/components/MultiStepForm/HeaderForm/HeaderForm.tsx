import styles from './HeaderForm.module.scss'
import { ArrowLeft } from "lucide-react"
import ProgressBar from '../ProgressBar/ProgressBar';
import StepCounter from '../StepCounter/StepCounter';

interface StepHeaderProps {
    title: string;
    onBack: () => void;
    currentStep: number;
    totalSteps: number;
}

export default function HeaderForm({ title, onBack, currentStep, totalSteps }: StepHeaderProps) {



    return (
        <>
            <header>
                <div className={styles.header__form}>
                    <button
                        type="button"
                        onClick={onBack}
                        className={styles.back__btn}
                        aria-label="torna alla pagina precedente"><ArrowLeft size={20} strokeWidth={2.5} /></button>
                    <h1>{title}</h1>
                </div>
                <div className={styles.progress__container}>
                    <ProgressBar step={currentStep} total={totalSteps} />
                    <StepCounter step={currentStep} />
                </div>

            </header>




        </>

    )
}
