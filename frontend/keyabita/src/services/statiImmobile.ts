import { http } from './http';

export const StatiImmobileApi = {
  getAll() {
    return http('/stati-immobile');
  }
};
