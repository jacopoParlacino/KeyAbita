import styles from './InputField.module.scss';

interface InputFieldProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    label: string;
}

export default function InputField({ label, value, onChange, placeholder }: InputFieldProps) {
    return (
        <>
            <div className={styles.input__wrapper}>
                <div className={styles.h2}>
                    {label}

                </div>
                <div className={styles.input__container}>

                    <input
                        type="text"
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className={styles.input}
                        required />
                </div>

            </div>
        </>
    )
}