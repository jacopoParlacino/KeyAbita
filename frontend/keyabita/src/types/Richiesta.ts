import type { Immobile } from "./Immobile";

export interface Richiesta {
  nome: string;
  cognome: string;
  email: string;
  numeroDiTelefono: string;
  immobile: Immobile | null;
}
