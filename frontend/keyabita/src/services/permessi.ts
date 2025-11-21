import { http } from './http';
import type { PermessoAgente } from '../types/PermessoAgente';

export const PermessiApi = {
  getPermessiAgente(id: number) {
    return http<PermessoAgente[]>(`/permessi/agente/${id}`);
  },

  getPermessoByModulo(id: number, modulo: string) {
    return http<PermessoAgente>(`/permessi/agente/${id}/modulo/${modulo}`);
  },

  checkPermesso(id: number, modulo: string, azione: string) {
    return http<boolean>(`/permessi/agente/${id}/check/${modulo}/${azione}`);
  },

  initializePermessi(id: number) {
    return http<void>(`/permessi/agente/${id}/initialize`, {
      method: 'POST',
    });
  },

  updatePermesso(id: number, modulo: string, data: PermessoAgente) {
    return http<PermessoAgente>(`/permessi/agente/${id}/modulo/${modulo}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deletePermessiAgente(id: number) {
    return http<void>(`/permessi/agente/${id}`, {
      method: 'DELETE',
    });
  }
};
