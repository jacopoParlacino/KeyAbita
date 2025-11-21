import { http } from './http';
import type { Citta } from '../types/Citta';

export const CittaApi = {
  getAll() {
    return http<Citta[]>('/citta');
  },

  getById(id: number) {
    return http<Citta>(`/citta/${id}`);
  },

  create(data: Partial<Citta>) {
    return http<Citta>('/citta', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update(id: number, data: Partial<Citta>) {
    return http<Citta>(`/citta/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete(id: number) {
    return http<void>(`/citta/${id}`, {
      method: 'DELETE',
    });
  }
};
