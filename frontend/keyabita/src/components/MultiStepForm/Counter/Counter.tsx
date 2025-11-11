import { Minus, Plus } from 'lucide-react';
import styles from './Counter.module.scss'

interface CounterProps {
    label: string;

}

export default function Counter({ label }: CounterProps) {

    return (
        <>
            <div className={styles.counter__container}>
                <div className={styles.h2}>
                    {label}
                </div>
                <div className={styles.increment__decrement__wrapper}>

                    <div className={styles.icon__wrapper__plus}>
                        <Plus size={15} />
                    </div>
                    0
                    <div className={styles.icon__wrapper__minus}>
                        <Minus size={15} />
                    </div>
                </div>
            </div>
        </>
    )
}