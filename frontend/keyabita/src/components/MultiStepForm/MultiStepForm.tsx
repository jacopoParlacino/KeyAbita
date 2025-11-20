import styles from "./MultiStepForm.module.scss";
import HeaderForm from "./HeaderForm/HeaderForm";
import { useNavigate } from "react-router-dom";
import StepperNavigation from "./StepperNavigation/StepperNavigation";
import VerticalSidebar from "./VerticalSidebar/VerticalSidebar";
import useMultiStepForm from "./hooks/useMultiStepForm";
import Step1Property from "./steps/Step1Property";
import Step2Condition from "./steps/Step2Condition";
import Step3Dotazioni from "./steps/Step3Dotazioni";
import Step4UserData from "./steps/Step4UserData";
import Step5Confirmation from "./steps/Step5Confirmation";

const stepperSteps = ["Indirizzo", "Caratteristiche", "Dotazioni", "Dati Personali"];

export default function MultiStepForm() {
  const navigate = useNavigate();
  const {
    currentStep,
    totalSteps,
    formData,
    errors,
    setField,
    handleCounterChange,
    handleToggle,
    nextStep,
    prevStep,
    validateCurrentStep,
    handleSubmit,
  } = useMultiStepForm();

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1Property formData={formData} errors={errors} setField={setField} />;
      case 2:
        return (
          <Step2Condition
            formData={formData}
            errors={errors}
            setField={setField}
            handleCounterChange={handleCounterChange}
          />
        );
      case 3:
        return <Step3Dotazioni formData={formData} errors={errors} handleToggle={handleToggle} />;
      case 4:
        return <Step4UserData formData={formData} errors={errors} setField={setField} />;
      case 5:
        return <Step5Confirmation />;
      default:
        return null;
    }
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className={styles.form__container}>
        <div className={styles.header__container}>
          <HeaderForm title="Valuta il tuo immobile" onBack={() => navigate("/")} currentStep={currentStep} totalSteps={totalSteps} />
        </div>

        <div className={styles.main__content__wrapper}>
          <div className={styles.vertical__sidebar}>
            <VerticalSidebar steps={stepperSteps} currentStep={currentStep} />
          </div>

          <div className={styles.step__content__container}>
            {renderStepContent()}

            {currentStep !== totalSteps && (
              <div className={styles.stepper__navigation__container}>
                <StepperNavigation
                  onBack={() => {
                    if (currentStep === 1) {
                      navigate("/");
                    } else {
                      prevStep();
                    }
                  }}
                  onNext={async () => {
                    const isValid = validateCurrentStep();
                    if (!isValid) return;
                    if (currentStep === totalSteps - 1) {
                      await handleSubmit();
                    } else {
                      nextStep();
                    }
                  }}
                  isNextDisabled={false}
                  isLastStep={currentStep === totalSteps - 1}
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
