import { http } from './http';
import type { Utente } from '../types/Utente';

export type UtenteCreatePayload = Omit<Utente, 'id' | 'dataCreazione'> & {
  password?: string;
};

export type UtenteUpdatePayload = Partial<Omit<Utente, 'id'>>;

export interface ResetPasswordResponse {
  success: boolean;
  message?: string;
}

export interface DeleteUtenteResponse {
  success: boolean;
  message?: string;
}

export interface PermessiModulo {
  visualizza: boolean;
  [permesso: string]: boolean;
}

export interface PermessiAgente {
  [modulo: string]: PermessiModulo;
}

export const UtentiApi = {
  getAll(): Promise<Utente[]> {
    return http<Utente[]>('/utenti');
  },

  getAgenti(): Promise<Utente[]> {
    return http<Utente[]>('/utenti/agenti');
  },

  getById(id: number): Promise<Utente> {
    return http<Utente>(`/utenti/${id}`);
  },

  getPermessiAgente(id: number): Promise<PermessiAgente> {
    return http<PermessiAgente>(`/utenti/${id}/permessi`);
  },

  updatePermessiAgente(id: number, permessi: PermessiAgente): Promise<PermessiAgente> {
    return http<PermessiAgente>(`/utenti/${id}/permessi`, {
      method: 'PUT',
      body: JSON.stringify(permessi),
    });
  },

  resetPassword(id: number, newPassword: string): Promise<ResetPasswordResponse> {
    return http<ResetPasswordResponse>(`/utenti/${id}/reset-password`, {
      method: 'POST',
      body: JSON.stringify({ newPassword }),
    });
  },

  create(data: UtenteCreatePayload): Promise<Utente> {
    return http<Utente>('/utenti', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update(id: number, data: UtenteUpdatePayload): Promise<Utente> {
    return http<Utente>(`/utenti/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete(id: number): Promise<DeleteUtenteResponse> {
    return http<DeleteUtenteResponse>(`/utenti/${id}`, {
      method: 'DELETE',
    });
  },
};
