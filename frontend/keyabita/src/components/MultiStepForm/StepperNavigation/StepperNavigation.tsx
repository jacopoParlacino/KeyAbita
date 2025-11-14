import styles from './StepperNavigation.module.scss'

import Button from '../Button/Button'
import { ChevronLeft } from 'lucide-react';

interface StepperNavigationProps {
    onNext: () => void;
    onBack: () => void;
    isNextDisabled?: boolean;
    isLastStep?: boolean;
    type?: 'button' | 'submit';
    disabled?: boolean;
}


export default function StepperNavigation({
    onNext,
    onBack,
    isNextDisabled = false,
    isLastStep = false,
}: StepperNavigationProps) {

    return (
        <>
            <div className={styles.stepper__navigation}>

                <Button
                    label={isLastStep ? "Home" : "Indietro"}
                    onClick={onBack}
                    variant="secondary"
                    type="button"
                    icon={ChevronLeft}
                />

                <Button
                    label="Avanti"
                    onClick={onNext}
                    disabled={isNextDisabled}
                    type={isLastStep ? "submit" : "button"}
                />

            </div>
        </>
    )
}