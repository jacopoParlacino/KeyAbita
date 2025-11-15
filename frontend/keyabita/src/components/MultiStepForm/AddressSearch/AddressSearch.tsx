import styles from './AddressSearch.module.scss'
import { Search } from 'lucide-react';

interface AddressSearchProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export default function AddressSearch({ value, onChange, placeholder }: AddressSearchProps) {
    return (

        <div className={styles.search__container}>
            <input
                type="text"
                value={value}         
                onChange={onChange}     
                placeholder={placeholder}
                className={styles.input}
                required />

            <Search size={20} className={styles.search__icon} />
        </div>

    )
}