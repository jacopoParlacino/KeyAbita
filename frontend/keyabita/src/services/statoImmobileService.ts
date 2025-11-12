import api from '../lib/apiClient';

export interface StatoImmobile {
  id: number;
  nome: string;
}

const StatoImmobileService = {
  async getAll(): Promise<StatoImmobile[]> {
    const { data } = await api.get('/stati-immobile');
    return data;
  },

  async getById(id: number): Promise<StatoImmobile> {
    const { data } = await api.get(`/stati-immobile/${id}`);
    return data;
  },

  async getByNome(nome: string): Promise<StatoImmobile> {
    const { data } = await api.get(`/stati-immobile/nome/${nome}`);
    return data;
  },

  async create(statoImmobile: Omit<StatoImmobile, 'id'>): Promise<StatoImmobile> {
    const { data } = await api.post('/stati-immobile', statoImmobile);
    return data;
  }
};

export default StatoImmobileService;