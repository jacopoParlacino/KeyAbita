import styles from "../MultiStepForm.module.scss";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import type { FormData, FormErrors } from "../types";

type Props = {
  formData: FormData;
  errors: FormErrors;
  handleToggle: (field: "ascensore" | "parcheggio" | "garage" | "giardino" | "balconi", value: boolean) => void;
};

export default function Step3Dotazioni({ formData, errors, handleToggle }: Props) {
  return (
    <>
      <h2 className={styles.first__h2}>Dotazioni dell' immobile</h2>

      <ToggleSwitch label="Ascensore" value={formData.ascensore} onChange={(v) => handleToggle("ascensore", v)} />
      <ToggleSwitch label="Parcheggio" value={formData.parcheggio} onChange={(v) => handleToggle("parcheggio", v)} />
      <ToggleSwitch label="Garage" value={formData.garage} onChange={(v) => handleToggle("garage", v)} />
      <ToggleSwitch label="Giardino" value={formData.giardino} onChange={(v) => handleToggle("giardino", v)} />
      <ToggleSwitch label="Balconi" value={formData.balconi} onChange={(v) => handleToggle("balconi", v)} />

      {errors.ascensore && <p className={styles.error__message}>{errors.ascensore}</p>}
    </>
  );
}
