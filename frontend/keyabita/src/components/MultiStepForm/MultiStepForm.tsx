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
import Button from "./Button/Button";


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

      <h2 className={styles.h2}>Tipologia</h2>
      <div className={styles.div__property__selection}>
        <PropertyTypeSelector icon={House} label="Casa" onClick={() => handlePropertySelect('casa')} />
        <PropertyTypeSelector icon={Building} label="Appartamento" onClick={() => handlePropertySelect('appartamento')} />
      </div>

      <h2 className={styles.h2}>Indirizzo</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <AddressSearch
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Inserisci indirizzo"
        />
      </form>

      <div className={styles.stepper__navigation}>
      <Button label="Indietro" onClick={() => navigate('/')} variant="secondary"/>
      <Button label="Avanti" onClick={() => navigate('/')}/>
      </div>

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