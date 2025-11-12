import api from '../lib/apiClient';
import type { Immobile } from './immobileService';

export interface Valutazione {
  id: number;
  valore: number;
  dataValutazione: string;
  immobile: Immobile;
}

export interface CreateValutazioneRequest {
  valore: number;
  immobileId: number;
}

const ValutazioneService = {
  async getAll(): Promise<Valutazione[]> {
    const { data } = await api.get('/valutazioni');
    return data;
  },

  async getById(id: number): Promise<Valutazione> {
    const { data } = await api.get(`/valutazioni/${id}`);
    return data;
  },

  async create(valutazione: CreateValutazioneRequest): Promise<Valutazione> {
    const { data } = await api.post('/valutazioni', valutazione);
    return data;
  },

  async getByImmobile(immobileId: number): Promise<Valutazione[]> {
    const { data } = await api.get(`/valutazioni/immobile/${immobileId}`);
    return data;
  },

  async getByRange(min: number, max: number): Promise<Valutazione[]> {
    const { data } = await api.get(`/valutazioni/range?min=${min}&max=${max}`);
    return data;
  }
};

export default ValutazioneService;