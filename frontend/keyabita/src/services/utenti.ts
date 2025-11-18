import { http } from './http';

export const UtentiApi = {
  getAll() {
    return http('/utenti');
  },

  getById(id: number) {
    return http(`/utenti/${id}`);
  },

  getByEmail(email: string) {
    return http(`/utenti/email/${encodeURIComponent(email)}`);
  },

  search(term: string) {
    return http(`/utenti/search?q=${encodeURIComponent(term)}`);
  },

  getByRuolo(ruolo: string) {
    return http(`/utenti/ruolo/${encodeURIComponent(ruolo)}`);
  },

  create(data: unknown) {
    return http('/utenti', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update(id: number, data: unknown) {
    return http(`/utenti/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete(id: number) {
    return http(`/utenti/${id}`, {
      method: 'DELETE',
    });
  },

  getAgenti() {
    return http('/utenti/agenti');
  },

  resetPassword(id: number, newPassword: string) {
    return http(`/utenti/${id}/reset-password`, {
      method: 'POST',
      body: JSON.stringify({ newPassword }),
    });
  },

  updateAdmin(id: number, data: unknown) {
    return http(`/utenti/${id}/admin`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
};
