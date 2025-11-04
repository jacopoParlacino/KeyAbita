import { useState } from "react";
import type { FormEvent } from "react";
import styles from "./MultiStepForm.module.scss";
import HeaderForm from "./HeaderForm/HeaderForm";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar/ProgressBar";

export default function MultiStepForm() {
  const [address, setAddress] = useState<string>("");
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted with address:", address);
  };

  return (
    <>
    <HeaderForm  title="Valuta il tuo immobile" onBack={() => navigate('/')}/>
      <ProgressBar step={1} total={4}/>
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Inserisci indirizzo"
        className={styles.input}
        required
      />
      <button type="submit" className={styles.button}>Ottieni la valutazione</button>
    </form>
    </>
  );
}