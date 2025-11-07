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
import StepperNavigation from "./StepperNavigation/StepperNavigation";

const totalStep: number = 4;

interface FormData {
  propertyType: string | null;
  address: string;
}

export default function MultiStepForm() {

  const navigate = useNavigate()

  const [currentStep, setCurrentStep] = useState<number>(1)
  const [formData, setFormData] = useState<FormData>({
    propertyType: null,
    address: "",
  });

  const nextStep = () => {
    if (currentStep < totalStep) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handlePropertySelect = (type: string) => {
    setFormData((prev) => ({ ...prev, propertyType: type }))
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, address: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with data:", JSON.stringify(formData, null, 2));
    // Qui puoi inviare i dati e poi navigare
    // Esempio: navigate('/success');
    navigate('/form-success')
  };

  const isNextDisabled = () => {
    if (currentStep === 1 && !formData.propertyType) {
      return true; // Disabilitato se tipo non selezionato
    }
    if (currentStep === 2 && !formData.address) {
      return true; // Disabilitato se indirizzo è vuoto
    }
    // Aggiungi logica per step 3, 4...
    return false;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className={styles.h2}>Tipologia</h2>
            <div className={styles.div__property__selection}>
              <PropertyTypeSelector
                icon={House}
                label="Casa"
                onClick={() => handlePropertySelect("casa")}
              />
              <PropertyTypeSelector
                icon={Building}
                label="Appartamento"
                onClick={() => handlePropertySelect("appartamento")}
              />
            </div>

            <h2 className={styles.h2}>Indirizzo</h2>
            <AddressSearch
              value={formData.address}
              onChange={handleAddressChange}
              placeholder="Inserisci indirizzo"
            />
          </>
        );
      case 2:
        return (
          <>
          </>
        );

      case 3:
        return (
          <>
          </>
        );

      case 4:
        return (
          <>
          </>
        );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form__container}>
        <HeaderForm title="Valuta il tuo immobile" onBack={() => navigate('/')} currentStep={currentStep} totalSteps={totalStep} />

        <div className={styles.step__content__container}>
          {renderStepContent()}
        </div>

        <StepperNavigation
          onBack={() => {
            if (currentStep === 1) {
              navigate("/");
            } else {
              prevStep();
            }
          }}

          onNext={nextStep}
          isNextDisabled={isNextDisabled()}
          isLastStep={currentStep === totalStep}
        />

      </form>

    </>
  );
}