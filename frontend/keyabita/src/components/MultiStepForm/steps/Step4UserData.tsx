import InputField from "../InputField/InputField";
import styles from "../MultiStepForm.module.scss";
import type { FormData, FormErrors } from "../types";

type Props = {
  formData: FormData;
  errors: FormErrors;
  setField: (field: keyof FormData, value: any) => void;
};

export default function Step4UserData({ formData, errors, setField }: Props) {
  return (
    <>
      <div className={styles.margin__top__auto}>
        <InputField
          label="Nome"
          value={formData.nome}
          onChange={(e) => setField("nome", e.target.value)}
          placeholder="Inserisci il tuo nome"
        />
        {errors.nome && <p className={styles.error__message}>{errors.nome}</p>}
      </div>

      <InputField
        label="Cognome"
        value={formData.cognome}
        onChange={(e) => setField("cognome", e.target.value)}
        placeholder="Inserisci il tuo cognome"
      />
      {errors.cognome && <p className={styles.error__message}>{errors.cognome}</p>}

      <InputField
        label="Numero di telefono"
        value={formData.numeroDiTelefono}
        onChange={(e) => setField("numeroDiTelefono", e.target.value)}
        placeholder="Inserisci il tuo numero"
      />
      {errors.numeroDiTelefono && <p className={styles.error__message}>{errors.numeroDiTelefono}</p>}

      <InputField
        label="Email"
        value={formData.email}
        onChange={(e) => setField("email", e.target.value)}
        placeholder="Inserisci la tua email"
      />
      {errors.email && <p className={styles.error__message}>{errors.email}</p>}

      <label className={styles.checkbox__wrapper}>
        <input
          type="checkbox"
          checked={formData.privacy}
          onChange={(e) => setField("privacy", e.target.checked)}
          className={styles.checkbox}
        />
        <span className={styles.custom__checkbox}></span>
        Accetto l’informativa privacy
      </label>

      {errors.privacy && (
        <p className={styles.error__message}>{errors.privacy}</p>
      )}

    </>
  );
}
