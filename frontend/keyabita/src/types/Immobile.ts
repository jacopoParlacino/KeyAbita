import type { Citta } from './Citta';
import type { StatoImmobile } from './StatoImmobile';

export interface Immobile {
  id?: number;
  indirizzo?: string;
  citta?: Citta | null;
  statoImmobile?: StatoImmobile | null;
  piano?: number | null;
  numeroStanze?: number | null;
  numeroBagni?: number | null;
  balcone?: boolean;
  garage?: boolean;
  giardino?: boolean;
  annoCostruzione?: number | null;
}
