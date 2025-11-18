import { http } from './http';

export const PermessiApi = {
  getByAgente(id: number) {
    return http(`/permessi/agente/${id}`);
  },

  getModuliByAgente(id: number) {
    return http(`/permessi/agente/${id}/moduli`);
  },

  check(id: number, modulo: string, permesso: string) {
    return http(`/permessi/agente/${id}/check/${modulo}/${permesso}`);
  },

  update(id: number, data: unknown) {
    return http(`/permessi/agente/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  initialize(id: number) {
    return http(`/permessi/agente/${id}/initialize`, {
      method: 'POST',
    });
  },

  updateSingle(id: number, modulo: string, permesso: string, abilitato: boolean) {
    return http(`/permessi/agente/${id}/${modulo}/${permesso}`, {
      method: 'PUT',
      body: JSON.stringify({ abilitato }),
    });
  }
};
