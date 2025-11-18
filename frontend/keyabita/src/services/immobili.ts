import { http } from './http';

export const ImmobiliApi = {
  getAll() {
    return http('/immobili');
  },

  getById(id: number) {
    return http(`/immobili/${id}`);
  },

  create(data: unknown) {
    return http('/immobili', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getByCitta(nomeCitta: string) {
    return http(`/immobili/citta/${encodeURIComponent(nomeCitta)}`);
  },

  getByStato(nomeStato: string) {
    return http(`/immobili/stato-immobile/${encodeURIComponent(nomeStato)}`);
  },

  getByStanze(numeroStanze: number) {
    return http(`/immobili/stanze/${numeroStanze}`);
  },
};
