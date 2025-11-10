import { useState } from "react";
import type { FormEvent } from "react";
import styles from "./MultiStepForm.module.scss";
import HeaderForm from "./HeaderForm/HeaderForm";
import { useNavigate } from "react-router-dom";
import PropertyTypeSelector from "./PropertyTypeSelector/PropertyTypeSelector";
import { Check, House } from "lucide-react";
import { Building } from "lucide-react";
import AddressSearch from "./AddressSearch/AddressSearch";
import StepperNavigation from "./StepperNavigation/StepperNavigation";
import ImmobileCondition from "./ImmobileCondition/ImmobileCondition";

const totalStep: number = 4;

interface FormData {
  propertyType: string | null;
  address: string;
  condition: string;
}

export default function MultiStepForm() {

  const navigate = useNavigate()

  const [currentStep, setCurrentStep] = useState<number>(1)
  const [formData, setFormData] = useState<FormData>({
    propertyType: null,
    address: "",
    condition: "",
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

  const handleConditionSelected = (type: string) => {
    setFormData((prev) => ({ ...prev, condition: type }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with data:", JSON.stringify(formData, null, 2));
  };

  const isNextDisabled = () => {
    if (currentStep === 1 && !formData.propertyType) {
      return true;
    }
    if (currentStep === 1 && !formData.address) {
      return true;
    }
    if (currentStep === 2 && !formData.condition) {
      return true;
    }
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
                isSelected={formData.propertyType === "casa"}
              />
              <PropertyTypeSelector
                icon={Building}
                label="Appartamento"
                onClick={() => handlePropertySelect("appartamento")}
                isSelected={formData.propertyType === "appartamento"}
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
          <h2 className={styles.h2}>Condizione immobile</h2>
            <ImmobileCondition 
            label="Ottimo" 
            onClick={() => handleConditionSelected("Ottimo")} 
            isSelected={formData.condition === "Ottimo"} 
            icon={Check}/>

            <ImmobileCondition 
            label="Abitabile" 
            onClick={() => handleConditionSelected("Abitabile")} 
            isSelected={formData.condition === "Abitabile"} 
            icon={Check}/>

            <ImmobileCondition 
            label="Da ristrutturare" 
            onClick={() => handleConditionSelected("Da ristrutturare")} 
            isSelected={formData.condition === "Da ristrutturare"} 
            icon={Check}/>

            <h2 className={styles.h2}>Superfice ( m<sup>2</sup> )</h2>

            <h2 className={styles.h2}>Stanze</h2>

            <h2 className={styles.h2}>Piano</h2>

            <h2 className={styles.h2}>Bagni</h2>

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
            <h2 className={styles.h2}>Indirizzo</h2>
            <AddressSearch
              value={formData.address}
              onChange={handleAddressChange}
              placeholder="Inserisci indirizzo"
            />
            <h2 className={styles.h2}>Indirizzo</h2>
            <AddressSearch
              value={formData.address}
              onChange={handleAddressChange}
              placeholder="Inserisci indirizzo"
            />
            <h2 className={styles.h2}>Indirizzo</h2>
            <AddressSearch
              value={formData.address}
              onChange={handleAddressChange}
              placeholder="Inserisci indirizzo"
            />
            <h2 className={styles.h2}>Indirizzo</h2>
            <AddressSearch
              value={formData.address}
              onChange={handleAddressChange}
              placeholder="Inserisci indirizzo"
            />
          </>
        );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form__container}>
        <div className={styles.header__container}>
          <HeaderForm title="Valuta il tuo immobile" onBack={() => navigate('/')} currentStep={currentStep} totalSteps={totalStep} />
        </div>
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