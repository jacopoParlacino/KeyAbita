import styles from "../MultiStepForm.module.scss";
import PropertyTypeSelector from "../PropertyTypeSelector/PropertyTypeSelector";
import { House, Building } from "lucide-react";
import AddressSearch from "../AddressSearch/AddressSearch";
import type { FormData, FormErrors } from "../types";

type Props = {
  formData: FormData;
  errors: FormErrors;
  setField: (field: keyof FormData, value: any) => void;
};

export default function Step1Property({ formData, errors, setField }: Props) {
  return (
    <>
      <h2 className={[styles.h2, styles.margin__top__auto].join(" ")}>Tipologia</h2>
      <div className={styles.div__property__selection}>
        <PropertyTypeSelector
          icon={House}
          label="Villa"
          onClick={() => setField("propertyType", "villa")}
          isSelected={formData.propertyType === "villa"}
        />
        <PropertyTypeSelector
          icon={Building}
          label="Appartamento"
          onClick={() => setField("propertyType", "appartamento")}
          isSelected={formData.propertyType === "appartamento"}
        />
      </div>
      {errors.propertyType && <p className={styles.error__message}>{errors.propertyType}</p>}

      <h2 className={styles.h2}>Cap</h2>
      <AddressSearch
        value={formData.cap}
        onChange={(e) => setField("cap", e.target.value)}
        placeholder="Inserisci un CAP valido per le province supportate"
      />
      {errors.cap && <p className={styles.error__message}>{errors.cap}</p>}
    </>
  );
}
