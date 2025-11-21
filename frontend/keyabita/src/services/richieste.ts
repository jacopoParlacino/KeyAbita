import { http } from './http';
import type { Richiesta } from '../types/Richiesta';

export const RichiesteApi = {
  getAll() {
    return http<Richiesta[]>('/richieste');
  },

  getById(id: number) {
    return http<Richiesta>(`/richieste/${id}`);
  },

  getByImmobile(id: number) {
    return http<Richiesta[]>(`/richieste/immobile/${id}`);
  },

  getByStato(nomeStato: string) {
    return http<Richiesta[]>(`/richieste/stato/${encodeURIComponent(nomeStato)}`);
  },

  create(data: Partial<Richiesta>) {
    return http<Richiesta>('/richieste', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update(id: number, data: Partial<Richiesta>) {
    return http<Richiesta>(`/richieste/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete(id: number) {
    return http<void>(`/richieste/${id}`, {
      method: 'DELETE',
    });
  }
};
