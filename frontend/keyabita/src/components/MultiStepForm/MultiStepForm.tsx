import { useState } from "react";
import type { FormEvent } from "react";
import styles from "./MultiStepForm.module.scss";
import HeaderForm from "./HeaderForm/HeaderForm";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar/ProgressBar";
import StepCounter from "./StepCounter/StepCounter";
import PropertyTypeSelector from "./PropertyTypeSelector/PropertyTypeSelector";
import { House } from "lucide-react";
import { Building } from "lucide-react";
import AddressSearch from "./AddressSearch/AddressSearch";


export default function MultiStepForm() {
  const [address, setAddress] = useState<string>("");
  const navigate = useNavigate()
  const [propertyType, setPropertyType] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted with address:", address);
    console.log("And property type:", propertyType);
  };

  const handlePropertySelect = (type: string) => {
    setPropertyType(type);
  };

  return (
    <>
      <HeaderForm title="Valuta il tuo immobile" onBack={() => navigate('/')} />
      <ProgressBar step={1} total={4} />
      <StepCounter step={1} />
      <div className={styles.div__property__selection}>
        <PropertyTypeSelector icon={House} label="Casa" onClick={() => handlePropertySelect('casa')} />
        <PropertyTypeSelector icon={Building} label="Appartamento" onClick={() => handlePropertySelect('appartamento')} />
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>

        {/* 3. Passa lo stato e l'updater, non una stringa vuota */}
        <AddressSearch
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Inserisci indirizzo"
        />
      </form>
        {/* <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Inserisci indirizzo"
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>Ottieni la valutazione</button>
      </form> */}
    </>
  );
}