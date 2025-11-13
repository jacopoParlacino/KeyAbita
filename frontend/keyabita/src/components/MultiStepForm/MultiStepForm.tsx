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
import Counter from "./Counter/Counter";
import InputField from "./InputField/InputField";
import MetricRangeSelector, { type SelectOption } from "./MetricRangeSelector/MetricRangeSelector";

const totalStep: number = 4;

interface FormData {
  propertyType: string | null;
  address: string;
  condition: string;
  metratura: string;
  stanze: number;
  piano: number;
  bagni: number;
  ascensore: number;
  parcheggio: number;
  garage: number;
  giardino: number;
  terrazze: number;
  balconi: number;
  nome: string;
  cognome: string;
  email: string;
  numeroDiTelefono: string;
}

export default function MultiStepForm() {

  const navigate = useNavigate()

  const [currentStep, setCurrentStep] = useState<number>(1)
  const [formData, setFormData] = useState<FormData>({
    propertyType: null,
    address: "",
    condition: "",
    metratura: "",
    stanze: 0,
    piano: 0,
    bagni: 0,
    ascensore: 0,
    parcheggio: 0,
    garage: 0,
    giardino: 0,
    terrazze: 0,
    balconi: 0,
    nome: "",
    cognome: "",
    email: "",
    numeroDiTelefono: "",
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
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, nome: e.target.value }));
  };
  const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, cognome: e.target.value }));
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
  };
  const handleTelephoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, numeroDiTelefono: e.target.value }));
  };

  const handleConditionSelected = (type: string) => {
    setFormData((prev) => ({ ...prev, condition: type }))
  }

  type CounterField = 'stanze' | 'piano' | 'bagni' | 'ascensore' | 'parcheggio' | 'garage' | 'giardino' | 'terrazze' | 'balconi';

  const handleCounterChange = (
    field: CounterField,
    type: 'increment' | 'decrement'
  ) => {
    setFormData(prev => {
      const currentValue = prev[field];
      if (type === 'increment') {
        return { ...prev, [field]: currentValue + 1 };
      }

      if (type === 'decrement' && currentValue > 0) {
        return { ...prev, [field]: currentValue - 1 };
      }
      return prev;
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with data:", JSON.stringify(formData, null, 2));
  };

  const metratureOptions: SelectOption[] = [
    { value: '', label: 'Seleziona...' },
    { value: '0-50', label: '0-50 m²' },
    { value: '51-100', label: '51-100 m²' },
    { value: '101-150', label: '101-150 m²' },
    { value: '150+', label: 'Oltre 150 m²' },
  ];

  const handleMetraturaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, metratura: e.target.value }));
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
    if (currentStep === 4 && !formData.nome) {
      return true;
    }
    if (currentStep === 4 && !formData.cognome) {
      return true;
    }
    if (currentStep === 4 && !formData.numeroDiTelefono) {
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
              icon={Check} />

            <ImmobileCondition
              label="Abitabile"
              onClick={() => handleConditionSelected("Abitabile")}
              isSelected={formData.condition === "Abitabile"}
              icon={Check} />

            <ImmobileCondition
              label="Da ristrutturare"
              onClick={() => handleConditionSelected("Da ristrutturare")}
              isSelected={formData.condition === "Da ristrutturare"}
              icon={Check} />

            <Counter label="Stanze"
              value={formData.stanze}
              onIncrement={() => handleCounterChange('stanze', 'increment')}
              onDecrement={() => handleCounterChange('stanze', 'decrement')}
            />

            <Counter label="Piano"
              value={formData.piano}
              onIncrement={() => handleCounterChange('piano', 'increment')}
              onDecrement={() => handleCounterChange('piano', 'decrement')} />

            <Counter label="Bagni"
              value={formData.bagni}
              onIncrement={() => handleCounterChange('bagni', 'increment')}
              onDecrement={() => handleCounterChange('bagni', 'decrement')}
            />

            <MetricRangeSelector
              label="Metratura"
              options={metratureOptions}
              value={formData.metratura}
              onChange={handleMetraturaChange}
            />

          </>
        );

      case 3:
        return (
          <>

            <h2 className={styles.h2}>Caratteristiche dell' immobile</h2>

            <Counter label="Ascensore"
              value={formData.ascensore}
              onIncrement={() => handleCounterChange('ascensore', 'increment')}
              onDecrement={() => handleCounterChange('ascensore', 'decrement')}
            />

            <Counter label="Parcheggio"
              value={formData.parcheggio}
              onIncrement={() => handleCounterChange('parcheggio', 'increment')}
              onDecrement={() => handleCounterChange('parcheggio', 'decrement')}
            />

            <Counter label="Garage"
              value={formData.garage}
              onIncrement={() => handleCounterChange('garage', 'increment')}
              onDecrement={() => handleCounterChange('garage', 'decrement')}
            />

            <Counter label="Giardino"
              value={formData.giardino}
              onIncrement={() => handleCounterChange('giardino', 'increment')}
              onDecrement={() => handleCounterChange('giardino', 'decrement')}
            />

            <Counter label="Terrazze"
              value={formData.terrazze}
              onIncrement={() => handleCounterChange('terrazze', 'increment')}
              onDecrement={() => handleCounterChange('terrazze', 'decrement')}
            />

            <Counter label="Balconi"
              value={formData.balconi}
              onIncrement={() => handleCounterChange('balconi', 'increment')}
              onDecrement={() => handleCounterChange('balconi', 'decrement')}
            />
          </>
        );

      case 4:
        return (
          <>

            <InputField
              label="Nome"
              value={formData.nome}
              onChange={handleNameChange}
              placeholder="Inserisci indirizzo"
            />

            <InputField
              label="Cognome"
              value={formData.cognome}
              onChange={handleSurnameChange}
              placeholder="Inserisci indirizzo"
            />

            <InputField
              label="Numero di telefono "
              value={formData.numeroDiTelefono}
              onChange={handleTelephoneNumberChange}
              placeholder="Inserisci indirizzo"
            />

            <InputField
              label="Email (opzionale)"
              value={formData.email}
              onChange={handleEmailChange}
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
        <div className={styles.stepper__navigation}>
          <StepperNavigation
            onBack={() => {
              if (currentStep === 1) {
                navigate("/");
              } else {
                prevStep();
              }
            }}

            onNext={() => {
              if (currentStep === 4) {
                navigate("/form-success")
              } else {
                nextStep();
              }
            }}

            isNextDisabled={isNextDisabled()}
            isLastStep={currentStep === totalStep}
          />
        </div>

      </form>

    </>
  );
}