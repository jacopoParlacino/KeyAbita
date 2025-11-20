import type { FormData, FormErrors } from "./types";

export const totalSteps = 5;

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const phoneRegex = /^\+?[0-9]{9,15}$/;
export const capRegex = /^(1501[0-9]|1502[0-2]|151[0-1][0-9]|15122|1401[0-9]|140[2-9][0-9]|14100|1381[1-9]|138[2-9][0-9]|13900|1201[0-9]|12[1-9][0-9]{2}|13[0-1][0-9]{3}|16[0-9]{3}|17[0-9]{3}|1800[0-9]|1802[0-5]|2801[0-9]|28100|2880[1-9]|288[1-9][0-9]|2890[0-9]|2891[0-9]|2892[0-5]|1001[0-9]|101[0-5][0-6])$/;

export function validateStep(currentStep: number, formData: FormData): FormErrors {
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
      newErrors.email = "Indirizzo email non valido";
    }
  }

  return newErrors;
}
