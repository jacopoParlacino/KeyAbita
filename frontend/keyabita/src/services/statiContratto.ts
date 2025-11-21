import { http } from './http';
import type { StatoContratto } from '../types/StatoContratto';

export const StatiContrattoApi = {
  getAll() {
    return http<StatoContratto[]>('/statocontratto');
  }
};
