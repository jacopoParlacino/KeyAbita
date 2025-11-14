import { useState } from "react";
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

const totalStep: number = 5;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\+?[0-9]{9,15}$/;

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

  const [errors, setErrors] = useState<any>({});

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
    if (errors.propertyType) {
      setErrors((prev: any) => ({ ...prev, propertyType: undefined }));
    }
  }
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, address: e.target.value }));
    if (errors.address) {
      setErrors((prev: any) => ({ ...prev, address: undefined }));
    }
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, nome: e.target.value }));
    if (errors.nome) {
      setErrors((prev: any) => ({ ...prev, nome: undefined }));
    }
  };
  const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, cognome: e.target.value }));
    if (errors.cognome) {
      setErrors((prev: any) => ({ ...prev, cognome: undefined }));
    }
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
    if (errors.email) {
      setErrors((prev: any) => ({ ...prev, email: undefined }));
    }
  };
  const handleTelephoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, numeroDiTelefono: e.target.value }));
    if (errors.numeroDiTelefono) {
      setErrors((prev: any) => ({ ...prev, numeroDiTelefono: undefined }));
    }
  };
  const handleConditionSelected = (type: string) => {
    setFormData((prev) => ({ ...prev, condition: type }))
    if (errors.condition) {
      setErrors((prev: any) => ({ ...prev, condition: undefined }));
    }
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

  const handleFormSubmit = () => {
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
    if (errors.metratura) {
      setErrors((prev: any) => ({ ...prev, metratura: undefined }));
    }
  };

  const validateStep = (): boolean => {
    const newErrors: any = {};

    if (currentStep === 1) {
      if (!formData.propertyType) {
        newErrors.propertyType = "Devi selezionare una tipologia";
      }
      if (!formData.address) {
        newErrors.address = "Devi inserire un indirizzo";
      }
    }

    if (currentStep === 2) {
      if (!formData.condition) {
        newErrors.condition = "Devi selezionare una condizione";
      }
      if (!formData.metratura) {
        newErrors.metratura = "Devi selezionare la metratura";
      }
      if (formData.stanze === 0) {
        newErrors.stanze = "Devi indicare almeno 1 stanza";
      }
    }

    if (currentStep === 4) {
      if (!formData.nome) {
        newErrors.nome = "Il campo Nome è obbligatorio";
      } else if (formData.nome.length < 2) {
        newErrors.nome = "Il nome è troppo corto";
      }
      if (!formData.cognome) {
        newErrors.cognome = "Il campo Cognome è obbligatorio";
      } else if (formData.cognome.length < 2) {
        newErrors.cognome = "Il cognome è troppo corto";
      }
      if (!formData.numeroDiTelefono) {
        newErrors.numeroDiTelefono = "Il campo Telefono è obbligatorio";
      } else if (!phoneRegex.test(formData.numeroDiTelefono)) {
        newErrors.numeroDiTelefono = "Numero di telefono non valido";
      }
      if (!formData.email) {
        newErrors.email = "Il campo Email è obbligatorio";
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = "Indirizzo email non valido";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
            {errors.propertyType && <p className={styles.errorMessage}>{errors.propertyType}</p>}

            <h2 className={styles.h2}>Indirizzo</h2>
            <AddressSearch
              value={formData.address}
              onChange={handleAddressChange}
              placeholder="Inserisci indirizzo"
            />
            {errors.address && <p className={styles.errorMessage}>{errors.address}</p>}
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
            {errors.condition && <p className={styles.errorMessage}>{errors.condition}</p>}

            <MetricRangeSelector
              label="Metratura"
              options={metratureOptions}
              value={formData.metratura}
              onChange={handleMetraturaChange}
            />
            {errors.metratura && <p className={styles.errorMessage}>{errors.metratura}</p>}

            <Counter label="Stanze"
              value={formData.stanze}
              onIncrement={() => handleCounterChange('stanze', 'increment')}
              onDecrement={() => handleCounterChange('stanze', 'decrement')}
            />
            {errors.stanze && <p className={styles.errorMessage}>{errors.stanze}</p>}

            <Counter label="Piano"
              value={formData.piano}
              onIncrement={() => handleCounterChange('piano', 'increment')}
              onDecrement={() => handleCounterChange('piano', 'decrement')} />
            <Counter label="Bagni"
              value={formData.bagni}
              onIncrement={() => handleCounterChange('bagni', 'increment')}
              onDecrement={() => handleCounterChange('bagni', 'decrement')}
            />
          </>
        );
      case 3:
        return (
          <>
            <h2 className={styles.h2}>Caratteristiche dell' immobile</h2>

            <Counter
              label="Ascensore"
              value={formData.ascensore}
              onIncrement={() => handleCounterChange('ascensore', 'increment')} onDecrement={() => handleCounterChange('ascensore', 'decrement')} />
            <Counter
              label="Parcheggio"
              value={formData.parcheggio}
              onIncrement={() => handleCounterChange('parcheggio', 'increment')} onDecrement={() => handleCounterChange('parcheggio', 'decrement')} />
            <Counter
              label="Garage"
              value={formData.garage}
              onIncrement={() => handleCounterChange('garage', 'increment')} onDecrement={() => handleCounterChange('garage', 'decrement')} />
            <Counter
              label="Giardino"
              value={formData.giardino}
              onIncrement={() => handleCounterChange('giardino', 'increment')} onDecrement={() => handleCounterChange('giardino', 'decrement')} />
            <Counter
              label="Terrazze"
              value={formData.terrazze}
              onIncrement={() => handleCounterChange('terrazze', 'increment')} onDecrement={() => handleCounterChange('terrazze', 'decrement')} />
            <Counter
              label="Balconi"
              value={formData.balconi}
              onIncrement={() => handleCounterChange('balconi', 'increment')} onDecrement={() => handleCounterChange('balconi', 'decrement')} />
          </>
        );
      case 4:
        return (
          <>
            <InputField
              label="Nome"
              value={formData.nome}
              onChange={handleNameChange}
              placeholder="Inserisci il tuo nome"
            />
            {errors.nome && <p className={styles.errorMessage}>{errors.nome}</p>}

            <InputField
              label="Cognome"
              value={formData.cognome}
              onChange={handleSurnameChange}
              placeholder="Inserisci il tuo cognome"
            />
            {errors.cognome && <p className={styles.errorMessage}>{errors.cognome}</p>}

            <InputField
              label="Numero di telefono "
              value={formData.numeroDiTelefono}
              onChange={handleTelephoneNumberChange}
              placeholder="Inserisci il tuo numero"
            />
            {errors.numeroDiTelefono && <p className={styles.errorMessage}>{errors.numeroDiTelefono}</p>}

            <InputField
              label="Email"
              value={formData.email}
              onChange={handleEmailChange}
              placeholder="Inserisci la tua email"
            />
            {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
          </>
        );
      case 5:
        return (
          <>
            <div className={styles.confirmation__container}>
              <h2 className={styles.h2}>Grazie per la tua richiesta!</h2>
              <p className={styles.text__confermation}>Il tuo report di valutazione immobiliare verrà analizzato dai nostri esperti certificati e inviato all’indirizzo email da te indicato entro 72 ore.</p>
              <p className={styles.text__confermation}>Ti contatteremo qualora fossero necessari ulteriori dettagli.</p>
            </div>
          </>
        )
    }
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className={styles.form__container}>
        <div className={styles.header__container}>
          <HeaderForm title="Valuta il tuo immobile" onBack={() => navigate('/')} currentStep={currentStep} totalSteps={totalStep} />
        </div>

        <div className={styles.step__content__container}>
          {renderStepContent()}
        </div>

        {currentStep !== totalStep && (
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
                const isStepValid = validateStep();

                if (isStepValid) {
                  if (currentStep === totalStep - 1) {
                    handleFormSubmit();
                    nextStep();

                  } else {
                    nextStep();
                  }
                }
              }}
              isNextDisabled={false}
              isLastStep={currentStep === totalStep - 1}
            />
          </div>
        )}

      </form>

    </>
  );
}