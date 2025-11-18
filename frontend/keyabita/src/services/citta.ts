import { http } from './http';

export const CittaApi = {
  getAll() {
    return http('/citta');
  }
};
