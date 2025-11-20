import styles from "../MultiStepForm.module.scss";
import ImmobileCondition from "../ImmobileCondition/ImmobileCondition";
import { Check } from "lucide-react";
import MetricRangeSelector from "../MetricRangeSelector/MetricRangeSelector";
import Counter from "../Counter/Counter";
import type { FormData, FormErrors, SelectOption } from "../types";

const metratureOptions: SelectOption[] = [
  { value: "", label: "Seleziona..." },
  { value: "25-50", label: "25-50 m²" },
  { value: "51-100", label: "51-100 m²" },
  { value: "101-150", label: "101-150 m²" },
  { value: "150+", label: "Oltre 150 m²" },
];

type Props = {
  formData: FormData;
  errors: FormErrors;
  setField: (field: keyof FormData, value: any) => void;
  handleCounterChange: (field: "stanze" | "piano" | "bagni", type: "increment" | "decrement") => void;
};

export default function Step2Condition({ formData, errors, setField, handleCounterChange }: Props) {
  return (
    <>
      <h2 className={styles.first__h2}>Condizione immobile</h2>
      <ImmobileCondition
        label="Ottimo stato"
        onClick={() => setField("condition", "Ottimo stato")}
        isSelected={formData.condition === "Ottimo stato"}
        icon={Check}
      />
      <ImmobileCondition
        label="Nuovo"
        onClick={() => setField("condition", "Nuovo")}
        isSelected={formData.condition === "Nuovo"}
        icon={Check}
      />
      <ImmobileCondition
        label="Buono stato"
        onClick={() => setField("condition", "Buono stato")}
        isSelected={formData.condition === "Buono stato"}
        icon={Check}
      />
      <ImmobileCondition
        label="Da ristrutturare"
        onClick={() => setField("condition", "Da ristrutturare")}
        isSelected={formData.condition === "Da ristrutturare"}
        icon={Check}
      />
      {errors.condition && <p className={styles.error__message}>{errors.condition}</p>}

      <MetricRangeSelector
        label="Metratura"
        options={metratureOptions}
        value={formData.metratura}
        onChange={(e) => setField("metratura", e.target.value)}
      />
      {errors.metratura && <p className={styles.error__message}>{errors.metratura}</p>}

      <Counter
        label="Stanze"
        value={formData.stanze}
        onIncrement={() => handleCounterChange("stanze", "increment")}
        onDecrement={() => handleCounterChange("stanze", "decrement")}
      />
      {errors.stanze && <p className={styles.error__message}>{errors.stanze}</p>}

      <Counter
        label="Piano"
        value={formData.piano}
        onIncrement={() => handleCounterChange("piano", "increment")}
        onDecrement={() => handleCounterChange("piano", "decrement")}
      />
      <Counter
        label="Bagni"
        value={formData.bagni}
        onIncrement={() => handleCounterChange("bagni", "increment")}
        onDecrement={() => handleCounterChange("bagni", "decrement")}
      />
    </>
  );
}
