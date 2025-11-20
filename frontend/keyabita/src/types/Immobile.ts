import type { Citta } from './Citta';

type StatoImmobileRef = {
  id: number;
  nome?: string;
} | null;

export interface Immobile {
  id?: number;
  indirizzo?: string;
  cap?: string;
  propertyType?: string | null;
  citta?: Citta | null;
  statoImmobile?: StatoImmobileRef;
  stato_immobile?: string;
  condition?: string | null;
  metratura?: string | null;
  numeroStanze?: number | null;
  stanze?: number | null;
  numeroBagni?: number | null;
  bagni?: number | null;
  piano?: number | null;
  ascensore?: boolean;
  parcheggio?: boolean;
  balcone?: boolean;
  balconi?: boolean;
  garage?: boolean;
  giardino?: boolean;
  annoCostruzione?: number | null;
}
