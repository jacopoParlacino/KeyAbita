import type { Immobile } from "./Immobile";
import type { StatoRichiesta } from "./StatoRichiesta";

export interface Richiesta {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  numero: string;
  immobile: Immobile | null;
  statoRichiesta?: StatoRichiesta | null;
  data?: string | null;
}
