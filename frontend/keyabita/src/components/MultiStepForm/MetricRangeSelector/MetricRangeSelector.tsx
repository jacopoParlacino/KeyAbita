import styles from './MetricRangeSelector.module.scss';

export interface SelectOption {
    value: string;
    label: string;
}

export interface MetricRangeSelectorProps {
    label: string;
    options: SelectOption[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function MetricRangeSelector ({ label, options, value, onChange }: MetricRangeSelectorProps) {
    return (
        <>
            <div className={styles.metric__container}>

                <span className={styles.label}>{label}</span>


                <div className={styles.dropdown}>
                    <select
                        className={styles.select}
                        value={value}
                        onChange={onChange}
                    >
                        {options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}>

                                {option.label}

                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    )
}