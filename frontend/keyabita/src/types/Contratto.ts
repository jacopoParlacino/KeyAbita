import type { StatoContratto } from "./StatoContratto";
import type { Richiesta } from "./Richiesta";

export interface Contratto {
  id: number;
  inizioContratto: string | null;
  fineContratto: string | null;
  statoContratto: StatoContratto | null;
  
  richiesta: Richiesta | null;
}
