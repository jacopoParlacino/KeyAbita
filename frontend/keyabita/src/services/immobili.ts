import { http } from './http';
import type { Immobile } from '../types/Immobile';

export const ImmobiliApi = {
  getAll() {
    return http<Immobile[]>('/immobili');
  },

  getById(id: number) {
    return http<Immobile>(`/immobili/${id}`);
  },

  create(data: Partial<Immobile>) {
    return http<Immobile>('/immobili', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getByCitta(nomeCitta: string) {
    return http<Immobile[]>(`/immobili/citta/${encodeURIComponent(nomeCitta)}`);
  },

  getByStato(nomeStato: string) {
    return http<Immobile[]>(`/immobili/stato-immobile/${encodeURIComponent(nomeStato)}`);
  },

  getByStanze(numeroStanze: number) {
    return http<Immobile[]>(`/immobili/stanze/${numeroStanze}`);
  },
};
