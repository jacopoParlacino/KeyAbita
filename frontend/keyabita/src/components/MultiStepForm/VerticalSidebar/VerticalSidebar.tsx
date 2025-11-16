import styles from './VerticalSidebar.module.scss'

interface VerticalSidebarProps {
    steps: string[];
    currentStep: number;
}

export default function VerticalSidebar({ steps, currentStep }: VerticalSidebarProps) {

    const activeIndex = currentStep - 1;

    return (
        <>
            <div className={styles.stepperContainer}>
                <ul className={styles.stepList}>
                    {steps.map((label, index) => {

                        const isActive = index === activeIndex;
                        const isCompleted = index < activeIndex;


                        const itemClasses = [
                            styles.stepItem,
                            isActive ? styles.active : '',
                            isCompleted ? styles.completed : ''
                        ].join(' ');

                        return (
                            <li key={label} className={itemClasses}>
                                <span className={styles.dot}></span>
                                <span className={styles.label}>{label}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    )
}