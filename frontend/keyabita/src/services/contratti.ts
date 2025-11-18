import { http } from './http';

export const ContrattiApi = {
  getAll() {
    return http('/contratti');
  },

  getById(id: number) {
    return http(`/contratti/${id}`);
  },

  getByStato(nomeStato: string) {
    return http(`/contratti/stato/${encodeURIComponent(nomeStato)}`);
  },

  getAttivi() {
    return http('/contratti/attivi');
  },

  getInScadenza(giorni: number) {
    return http(`/contratti/scadenza/${giorni}`);
  },

  getByPeriodo(dataInizio: string, dataFine: string) {
    return http(`/contratti/periodo?dataInizio=${dataInizio}&dataFine=${dataFine}`);
  },

  create(data: unknown) {
    return http('/contratti', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update(id: number, data: unknown) {
    return http(`/contratti/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete(id: number) {
    return http(`/contratti/${id}`, {
      method: 'DELETE',
    });
  },

  getStati() {
    return http('/contratti/stati');
  }
};
