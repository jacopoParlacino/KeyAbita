import { http } from './http';

export const ValutazioniApi = {
  getAll() {
    return http('/valutazioni');
  },

  getById(id: number) {
    return http(`/valutazioni/${id}`);
  },

  getByImmobile(id: number) {
    return http(`/valutazioni/immobile/${id}`);
  },

  getRange(min: number, max: number) {
    return http(`/valutazioni/range?min=${min}&max=${max}`);
  },

  getByCitta(nomeCitta: string) {
    return http(`/valutazioni/citta/${encodeURIComponent(nomeCitta)}`);
  },

  getRecenti(n: number = 5) {
    return http(`/valutazioni/recenti/${n}`);
  },

  create(data: unknown) {
    return http('/valutazioni', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update(id: number, data: unknown) {
    return http(`/valutazioni/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete(id: number) {
    return http(`/valutazioni/${id}`, {
      method: 'DELETE',
    });
  }
};
