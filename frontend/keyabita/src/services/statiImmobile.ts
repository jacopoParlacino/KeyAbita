import { http } from './http';
import type { StatoImmobile } from '../types/StatoImmobile';

export const StatiImmobileApi = {
  getAll() {
    return http<StatoImmobile[]>('/stati-immobile');
  }
};
