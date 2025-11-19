
export interface Ruolo {
  id: number;
  nome: string;
}

export interface Utente {
  id: number;
  nome?: string;
  cognome?: string;
  email?: string;
  telefono?: string;
  ruolo?: Ruolo;
  dataCreazione?: string;
}

export interface Immobile {
  id: number;
  titolo?: string;
  descrizione?: string;
  prezzo?: number;
  citta?: string;
  stanze?: number;
  numeroStanze?: number;
  numeroBagni?: number;
  indirizzo?: string;
  statoImmobile?: string;
}

export interface Valutazione {
  id: number;
  immobileId?: number;
  immobile?: ImmobileCompleto;
  valore?: number;
  valoreStimato?: number;
  valoreMinimo?: number;
  valoreMassimo?: number;
  data?: string;
  dataCreazione?: string;
}

export interface Citta {
  id: number;
  nome: string;
}

export interface StatoContratto {
  id: number;
  nome: string;
}

export interface ImmobileCompleto extends Immobile {
  citta?: Citta;
  piano?: number | null;
  annoCostruzione?: number;
  balcone?: boolean;
  garage?: boolean;
  giardino?: boolean;
}

export interface Richiesta {
  id: number;
  nome: string;
  cognome: string;
  email?: string;
  immobile?: ImmobileCompleto;
}

export interface Contratto {
  id: number;
  inizioContratto?: string;
  fineContratto?: string;
  dataInizio?: string;
  dataFine?: string;
  statoContratto?: StatoContratto;
  stato?: string;
  richiesta?: Richiesta;
}

interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

declare class ApiService {
  request(endpoint: string, options?: RequestOptions): Promise<any>;

  // Immobili endpoints
  getImmobili(): Promise<Immobile[]>;
  getImmobileById(id: number): Promise<Immobile>;
  createImmobile(immobile: Partial<Immobile>): Promise<Immobile>;
  getImmobiliPerCitta(nomeCitta: string): Promise<Immobile[]>;
  getImmobiliPerStato(nomeStato: string): Promise<Immobile[]>;
  getImmobiliPerStanze(numeroStanze: number): Promise<Immobile[]>;

  // Valutazioni endpoints
  getValutazioni(): Promise<Valutazione[]>;
  getValutazioneById(id: number): Promise<Valutazione>;
  getValutazioniPerImmobile(immobileId: number): Promise<Valutazione[]>;
  getValutazioniPerRange(min: number, max: number): Promise<Valutazione[]>;
  getValutazioniPerCitta(nomeCitta: string): Promise<Valutazione[]>;
  getValutazioniRecenti(numero?: number): Promise<Valutazione[]>;
  createValutazione(valutazione: Partial<Valutazione>): Promise<Valutazione>;
  updateValutazione(id: number, valutazione: Partial<Valutazione>): Promise<Valutazione>;
  deleteValutazione(id: number): Promise<void>;

  // Contratti endpoints
  getContratti(): Promise<Contratto[]>;
  getContrattoById(id: number): Promise<Contratto>;
  getContrattiByStato(nomeStato: string): Promise<Contratto[]>;
  getContrattiAttivi(): Promise<Contratto[]>;
  getContrattiInScadenza(giorni: number): Promise<Contratto[]>;
  getContrattiByPeriodo(dataInizio: string, dataFine: string): Promise<Contratto[]>;
  createContratto(contratto: Partial<Contratto>): Promise<Contratto>;
  updateContratto(id: number, contratto: Partial<Contratto>): Promise<Contratto>;
  deleteContratto(id: number): Promise<void>;
  getStatiContratto(): Promise<string[]>;

  // Città endpoints
  getCitta(): Promise<string[]>;

  // Stati immobile endpoints
  getStatiImmobile(): Promise<string[]>;

  // Utenti/Clienti endpoints
  getUtenti(): Promise<Utente[]>;
  getUtenteById(id: number): Promise<Utente>;
  getUtenteByEmail(email: string): Promise<Utente>;
  searchUtenti(searchTerm: string): Promise<Utente[]>;
  getUtentiByRuolo(ruolo: string): Promise<Utente[]>;
  createUtente(utente: Partial<Utente>): Promise<Utente>;
  updateUtente(id: number, utente: Partial<Utente>): Promise<Utente>;
  deleteUtente(id: number): Promise<void>;

  // Metodi admin
  getAllAgenti(): Promise<Utente[]>;
  resetPassword(utenteId: number, newPassword: string): Promise<void>;
  updateUtenteAdmin(id: number, utente: Partial<Utente>): Promise<Utente>;

  // Permessi agenti endpoints
  getPermessiAgente(idAgente: number): Promise<any>;
  getModuliAbilitatiAgente(idAgente: number): Promise<string[]>;
  checkPermessoAgente(idAgente: number, modulo: string, permesso: string): Promise<boolean>;
  updatePermessiAgente(idAgente: number, permessi: any): Promise<void>;
  initializePermessiAgente(idAgente: number): Promise<void>;
  updateSingoloPermesso(
    idAgente: number,
    modulo: string,
    permesso: string,
    abilitato: boolean
  ): Promise<void>;
}

declare const apiService: ApiService;
export default apiService;
