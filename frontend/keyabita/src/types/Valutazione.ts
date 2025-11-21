import type { Immobile } from "./Immobile";

export interface Valutazione {
    id: number;
    immobile?: Immobile;
    valoreMinimo: number;
    valoreStimato: number;
    valoreMassimo: number;
}