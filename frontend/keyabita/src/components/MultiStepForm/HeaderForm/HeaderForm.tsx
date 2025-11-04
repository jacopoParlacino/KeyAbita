import styles from './HeaderForm.module.scss'
import {ArrowLeft} from "lucide-react"

interface StepHeaderProps {
    title: string;
    onBack: () => void;
}

export default function HeaderForm ({ title, onBack } : StepHeaderProps) {



    return (
        <header className={styles.header__form}>

            <button 
            type="button"
            onClick = {onBack}
            className = {styles.back__btn}
            aria-label="torna alla pagina precedente"><ArrowLeft size={20} strokeWidth={2.5}/></button>
            <h2>{title}</h2>
        </header>
    )
}

