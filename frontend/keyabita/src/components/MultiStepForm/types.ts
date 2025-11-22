export type SelectOption = {
  value: string;
  label: string;
};

export interface FormData {
  propertyType: string | null;
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
  statoImmobileId: number;
  privacy: boolean;
}

export type FormErrors = {
  [K in keyof FormData]?: string;
};
