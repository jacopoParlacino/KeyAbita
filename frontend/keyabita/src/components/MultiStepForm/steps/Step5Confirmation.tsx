import styles from "../MultiStepForm.module.scss";
import Button from "../Button/Button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Step5Confirmation() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.confirmation__container}>
        <h2 className={styles.confirmation__title}>Grazie per aver inviato la richiesta di valutazione!</h2>
        <p className={styles.text__confirmation}>
          Il tuo report di valutazione immobiliare verrà analizzato dai nostri esperti certificati e inviato
          all’indirizzo email da te indicato entro 72 ore.
        </p>
        <p className={styles.text__confirmation}>Ti contatteremo qualora fossero necessari ulteriori dettagli.</p>
      </div>
      <div className={styles.button__confirmation__container}>
        <Button label={"Home"} onClick={() => navigate("/")} variant="secondary" type="button" icon={ChevronLeft} />
      </div>
    </>
  );
}
