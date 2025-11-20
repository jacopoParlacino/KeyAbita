import { http } from './http';
import type { Contratto } from '../types/Contratto';

export const ContrattiApi = {
  getAll() {
    return http<Contratto[]>('/contratti');
  },

  getById(id: number) {
    return http<Contratto>(`/contratti/${id}`);
  },

  getByStato(nomeStato: string) {
    return http<Contratto[]>(`/contratti/stato/${encodeURIComponent(nomeStato)}`);
  },

  getAttivi() {
    return http<Contratto[]>('/contratti/attivi');
  },

  getInScadenza(giorni: number) {
    return http<Contratto[]>(`/contratti/scadenza/${giorni}`);
  },

  getByPeriodo(dataInizio: string, dataFine: string) {
    return http<Contratto[]>(`/contratti/periodo?dataInizio=${dataInizio}&dataFine=${dataFine}`);
  },

  create(data: unknown) {
    return http<Contratto>('/contratti', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update(id: number, data: unknown) {
    return http<Contratto>(`/contratti/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete(id: number) {
    return http<void>(`/contratti/${id}`, {
      method: 'DELETE',
    });
  },

  getStati() {
    return http<string[]>('/contratti/stati');
  }
};
