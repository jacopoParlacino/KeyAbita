import { useState } from "react";
import styles from "./MultiStepForm.module.scss";
import HeaderForm from "./HeaderForm/HeaderForm";
import { useNavigate } from "react-router-dom";
import PropertyTypeSelector from "./PropertyTypeSelector/PropertyTypeSelector";
import { Check, ChevronLeft, House } from "lucide-react";
import { Building } from "lucide-react";
import AddressSearch from "./AddressSearch/AddressSearch";
import StepperNavigation from "./StepperNavigation/StepperNavigation";
import ImmobileCondition from "./ImmobileCondition/ImmobileCondition";
import Counter from "./Counter/Counter";
import InputField from "./InputField/InputField";
import MetricRangeSelector, { type SelectOption } from "./MetricRangeSelector/MetricRangeSelector";
import VerticalSidebar from "./VerticalSidebar/VerticalSidebar";
import Button from "./Button/Button";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";

const totalStep: number = 5;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\+?[0-9]{9,15}$/;
const capRegex = /^(1501[0-9]|1502[0-2]|151[0-1][0-9]|15122|1401[0-9]|140[2-9][0-9]|14100|1381[1-9]|138[2-9][0-9]|13900|1201[0-9]|12[1-9][0-9]{2}|13[0-1][0-9]{3}|16[0-9]{3}|17[0-9]{3}|1800[0-9]|1802[0-5]|2801[0-9]|28100|2880[1-9]|288[1-9][0-9]|2890[0-9]|2891[0-9]|2892[0-5]|1001[0-9]|101[0-5][0-6])$/;


interface FormData {
  propertyType: string | null;
  citta: string;
  cap: string;
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
  stato_immobile: string;
}

export default function MultiStepForm() {

  const navigate = useNavigate()

  const [currentStep, setCurrentStep] = useState<number>(1)
  const [formData, setFormData] = useState<FormData>({
    propertyType: null,
    citta: "",
    cap: "",
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
    stato_immobile: "",
  });

  type FormErrors = {
    [key in keyof FormData]?: string;
  };

  const [errors, setErrors] = useState<FormErrors>({});

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
      setErrors((prev) => ({ ...prev, propertyType: undefined }));
    }
  }
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, cap: e.target.value }));
    if (errors.cap) {
      setErrors((prev) => ({ ...prev, cap: undefined }));
    }
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, nome: e.target.value }));
    if (errors.nome) {
      setErrors((prev) => ({ ...prev, nome: undefined }));
    }
  };
  const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, cognome: e.target.value }));
    if (errors.cognome) {
      setErrors((prev) => ({ ...prev, cognome: undefined }));
    }
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };
  const handleTelephoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, numeroDiTelefono: e.target.value }));
    if (errors.numeroDiTelefono) {
      setErrors((prev) => ({ ...prev, numeroDiTelefono: undefined }));
    }
  };
  const handleConditionSelected = (type: string) => {
    setFormData((prev) => ({ ...prev, condition: type }))
    if (errors.condition) {
      setErrors((prev) => ({ ...prev, condition: undefined }));
    }
  }

  type CounterField = 'stanze' | 'piano' | 'bagni';
  type ToggleField = 'ascensore' | 'parcheggio' | 'garage' | 'giardino' | 'terrazze' | 'balconi';

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

  const handleFormSubmit = async () => {
    console.log("Form submitted with data:", JSON.stringify(formData, null, 2));

    const {
      nome,
      cognome,
      email,
      numeroDiTelefono,
      stanze,
      bagni,
      citta,
      stato_immobile,
      ...datiImmobile
    } = formData;


    try {
      const immobilePayload = {
        ...datiImmobile,

        numeroStanze: stanze,
        numeroBagni: bagni,
        citta: { id: parseInt(citta) || null },
        statoImmobile: { id: parseInt(stato_immobile) || null }
      };

      const immobileResponse = await fetch("http://localhost:8080/api/immobili", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(immobilePayload),
      });

      if (!immobileResponse.ok) throw new Error("Errore creazione immobile");

      const immobile = await immobileResponse.json();

      const valutazionePayload = {
        id_immobiliare: immobile.id,
        nome: nome,
        cognome: cognome,
        email: email,
        numeroDiTelefono: numeroDiTelefono
      };

      const valutazioneResponse = await fetch("http://localhost:8080/api/valutazioni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(valutazionePayload),
      });

      if (!valutazioneResponse.ok) throw new Error("Errore creazione valutazione");

      console.error("Valutazione inviata con successo!");
    } catch (err) {
      console.error(err);
      console.error("Errore nell'invio della valutazione");
    }
  };

  const metratureOptions: SelectOption[] = [
    { value: '', label: 'Seleziona...' },
    { value: '25-50', label: '25-50 m²' },
    { value: '51-100', label: '51-100 m²' },
    { value: '101-150', label: '101-150 m²' },
    { value: '150+', label: 'Oltre 150 m²' },
  ];

  const handleMetraturaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, metratura: e.target.value }));
    if (errors.metratura) {
      setErrors((prev) => ({ ...prev, metratura: undefined }));
    }
  };

  const validateStep = (): boolean => {
    const newErrors: FormErrors = {};

    if (currentStep === 1) {
      if (!formData.propertyType) {
        newErrors.propertyType = "Devi selezionare una tipologia";
      }
      if (!formData.cap) {
        newErrors.cap = "Devi inserire un CAP";
      } else if (!capRegex.test(formData.cap)) {
        newErrors.cap = "Il CAP inserito non è valido o non è coperto dal servizio";
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
        newErrors.email = "cap email non valido";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const stepperSteps = [
    'Indirizzo',
    'Caratteristiche',
    'Dotazioni',
    'Dati Personali'
  ];

  const handleToggleChange = (
    field: ToggleField,
    newValue: number
  ) => {
    setFormData(prev => ({ ...prev, [field]: newValue }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className={[styles.h2, styles.margin__top__auto].join(' ')}>Tipologia</h2>
            <div className={styles.div__property__selection}>
              <PropertyTypeSelector
                icon={House}
                label="Villa"
                onClick={() => handlePropertySelect("villa")}
                isSelected={formData.propertyType === "villa"}
              />
              <PropertyTypeSelector
                icon={Building}
                label="Appartamento"
                onClick={() => handlePropertySelect("appartamento")}
                isSelected={formData.propertyType === "appartamento"}
              />
            </div>
            {errors.propertyType && <p className={styles.error__message}>{errors.propertyType}</p>}

            <div className={styles.cap__container}>
              <h2 className={styles.h2}>Cap</h2>
              <AddressSearch
                value={formData.cap}
                onChange={handleAddressChange}
                placeholder="Inserisci un CAP valido per le province supportate"

              />
              {errors.cap && <p className={styles.error__message}>{errors.cap}</p>}
            </div>

          </>
        );
      case 2:
        return (
          <>
            <h2 className={styles.first__h2}>Condizione immobile</h2>
            <ImmobileCondition
              label="Ottimo stato"
              onClick={() => handleConditionSelected("Ottimo stato")}
              isSelected={formData.condition === "Ottimo stato"}
              icon={Check} />

            <ImmobileCondition
              label="Nuovo"
              onClick={() => handleConditionSelected("Nuovo")}
              isSelected={formData.condition === "Nuovo"}
              icon={Check} />

            <ImmobileCondition
              label="Buono stato"
              onClick={() => handleConditionSelected("Buono stato")}
              isSelected={formData.condition === "Buono stato"}
              icon={Check} />

            <ImmobileCondition
              label="Da ristrutturare"
              onClick={() => handleConditionSelected("Da ristrutturare")}
              isSelected={formData.condition === "Da ristrutturare"}
              icon={Check} />
            {errors.condition && <p className={styles.error__message}>{errors.condition}</p>}

            <MetricRangeSelector
              label="Metratura"
              options={metratureOptions}
              value={formData.metratura}
              onChange={handleMetraturaChange}
            />
            {errors.metratura && <p className={styles.error__message}>{errors.metratura}</p>}

            <Counter label="Stanze"
              value={formData.stanze}
              onIncrement={() => handleCounterChange('stanze', 'increment')}
              onDecrement={() => handleCounterChange('stanze', 'decrement')}
            />
            {errors.stanze && <p className={styles.error__message}>{errors.stanze}</p>}

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
            <h2 className={styles.first__h2}>Dotazioni dell' immobile</h2>

            <ToggleSwitch
              label="Ascensore"
              value={formData.ascensore}
              onChange={(newValue) => handleToggleChange('ascensore', newValue)}
            />
            <ToggleSwitch
              label="Parcheggio"
              value={formData.parcheggio}
              onChange={(newValue) => handleToggleChange('parcheggio', newValue)}
            />
            <ToggleSwitch
              label="Garage"
              value={formData.garage}
              onChange={(newValue) => handleToggleChange('garage', newValue)}
            />
            <ToggleSwitch
              label="Giardino"
              value={formData.giardino}
              onChange={(newValue) => handleToggleChange('giardino', newValue)}
            />
            <ToggleSwitch
              label="Terrazze"
              value={formData.terrazze}
              onChange={(newValue) => handleToggleChange('terrazze', newValue)}
            />
            <ToggleSwitch
              label="Balconi"
              value={formData.balconi}
              onChange={(newValue) => handleToggleChange('balconi', newValue)}
            />

          </>
        );
      case 4:
        return (
          <>
            <div className={styles.margin__top__auto}>
              <InputField
                label="Nome"
                value={formData.nome}
                onChange={handleNameChange}
                placeholder="Inserisci il tuo nome"
              />
              {errors.nome && <p className={styles.error__message}>{errors.nome}</p>}
            </div>

            <InputField
              label="Cognome"
              value={formData.cognome}
              onChange={handleSurnameChange}
              placeholder="Inserisci il tuo cognome"
            />
            {errors.cognome && <p className={styles.error__message}>{errors.cognome}</p>}

            <InputField
              label="Numero di telefono "
              value={formData.numeroDiTelefono}
              onChange={handleTelephoneNumberChange}
              placeholder="Inserisci il tuo numero"
            />
            {errors.numeroDiTelefono && <p className={styles.error__message}>{errors.numeroDiTelefono}</p>}

            <InputField
              label="Email"
              value={formData.email}
              onChange={handleEmailChange}
              placeholder="Inserisci la tua email"
            />
            {errors.email && <p className={styles.error__message}>{errors.email}</p>}
          </>
        );
      case 5:
        return (
          <>
            <div className={styles.confirmation__container}>
              <h2 className={styles.confirmation__title}>Grazie per aver inviato la richiesta di valutazione!</h2>
              <p className={styles.text__confirmation}>Il tuo report di valutazione immobiliare verrà analizzato dai nostri esperti certificati e inviato all’cap email da te indicato entro 72 ore.</p>
              <p className={styles.text__confirmation}>Ti contatteremo qualora fossero necessari ulteriori dettagli.</p>
            </div>
            <div className={styles.button__confirmation__container}>
              <Button
                label={"Home"}
                onClick={() => { navigate("/"); }}
                variant="secondary"
                type="button"
                icon={ChevronLeft}
              />
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

        <div className={styles.main__content__wrapper}>

          <div className={styles.vertical__sidebar}>
            <VerticalSidebar
              steps={stepperSteps}
              currentStep={currentStep}
            />
          </div>

          <div className={styles.step__content__container}>
            {renderStepContent()}


            {currentStep !== totalStep && (
              <div className={styles.stepper__navigation__container}>
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
          </div>

        </div>

      </form>

    </>
  );
}