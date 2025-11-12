import api from '../lib/apiClient';
import type { Citta } from './cittaService';
import type { StatoImmobile } from './statoImmobileService';

export interface Immobile {
  id: number;
  via: string;
  metratura: number;
  numeroStanze: number;
  piano: number;
  annoCostruzione: number;
  citta: Citta;
  statoImmobile: StatoImmobile;
}

export interface CreateImmobileRequest {
  via: string;
  metratura: number;
  numeroStanze: number;
  piano: number;
  annoCostruzione: number;
  cittaId: number;
  statoImmobileId: number;
}

const ImmobileService = {
  async getAll(): Promise<Immobile[]> {
    const { data } = await api.get('/immobili');
    return data;
  },

  async getById(id: number): Promise<Immobile> {
    const { data } = await api.get(`/immobili/${id}`);
    return data;
  },

  async create(immobile: CreateImmobileRequest): Promise<Immobile> {
    const { data } = await api.post('/immobili', immobile);
    return data;
  },

  async getByCitta(nomecitta: string): Promise<Immobile[]> {
    const { data } = await api.get(`/immobili/citta/${nomecitta}`);
    return data;
  },

  async getByStatoImmobile(nomeStato: string): Promise<Immobile[]> {
    const { data } = await api.get(`/immobili/stato-immobile/${nomeStato}`);
    return data;
  },

  async getByNumeroStanze(numeroStanze: number): Promise<Immobile[]> {
    const { data } = await api.get(`/immobili/stanze/${numeroStanze}`);
    return data;
  }
};

export default ImmobileService;