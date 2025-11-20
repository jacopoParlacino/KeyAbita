import { http } from './http';
import type { Valutazione } from '../types/Valutazione';

export const ValutazioniApi = {
  getAll() {
    return http<Valutazione[]>('/valutazioni');
  },

  getById(id: number) {
    return http<Valutazione>(`/valutazioni/${id}`);
  },

  getByImmobile(id: number) {
    return http<Valutazione[]>(`/valutazioni/immobile/${id}`);
  },

  getRange(min: number, max: number) {
    return http<Valutazione[]>(`/valutazioni/range?min=${min}&max=${max}`);
  },

  getByCitta(nomeCitta: string) {
    return http<Valutazione[]>(`/valutazioni/citta/${encodeURIComponent(nomeCitta)}`);
  },

  getRecenti(n: number = 5) {
    return http<Valutazione[]>(`/valutazioni/recenti/${n}`);
  },

  create(data: Partial<Valutazione>) {
    return http<Valutazione>('/valutazioni', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update(id: number, data: Partial<Valutazione>) {
    return http<Valutazione>(`/valutazioni/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete(id: number) {
    return http<void>(`/valutazioni/${id}`, {
      method: 'DELETE',
    });
  }
};
