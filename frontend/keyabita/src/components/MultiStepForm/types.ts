export type SelectOption = {
  value: string;
  label: string;
};

export interface FormData {
  propertyType: string | null;
  citta: string;
  cap: string;
  condition: string;
  metratura: string;
  stanze: number;
  piano: number;
  bagni: number;
  ascensore: boolean;
  parcheggio: boolean;
  garage: boolean;
  giardino: boolean;
  balconi: boolean;
  nome: string;
  cognome: string;
  email: string;
  numeroDiTelefono: string;
  stato_immobile: string;
}

export type FormErrors = {
  [K in keyof FormData]?: string;
};
