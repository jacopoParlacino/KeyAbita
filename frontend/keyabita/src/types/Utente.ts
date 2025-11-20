import type { Ruolo } from "./Ruolo";

export interface Utente {
    id: number;
    nome?: string;
    cognome?: string;
    email?: string;
    telefono?: string;
    ruolo?: Ruolo;
    dataCreazione?: string;
  }
