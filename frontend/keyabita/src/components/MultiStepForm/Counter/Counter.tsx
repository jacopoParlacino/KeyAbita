import { Minus, Plus } from 'lucide-react';
import styles from './Counter.module.scss'

interface CounterProps {
    label: string;
    onIncrement: () => void;
    onDecrement: () => void;
    value: number;

}

export default function Counter({ label, onIncrement, onDecrement, value }: CounterProps) {

    return (
        <>
            <div className={styles.counter__container}>
                <div className={styles.label}>
                    {label}
                </div>
                <div className={styles.increment__decrement__wrapper}>

                    <div
                    className={styles.icon__wrapper__minus}
                    onClick={onDecrement}>
                        <Minus size={15} />
                    </div>

                    {value}

                    <div
                    className={styles.icon__wrapper__plus}
                    onClick={onIncrement}>
                        <Plus size={15} />
                    </div>
                </div>
            </div>
        </>
    )
}