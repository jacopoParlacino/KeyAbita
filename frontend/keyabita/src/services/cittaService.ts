import api from '../lib/apiClient';

export interface Citta {
  id: number;
  nome: string;
}

const CittaService = {
  async getAll(): Promise<Citta[]> {
    const { data } = await api.get('/citta');
    return data;
  },

  async getById(id: number): Promise<Citta> {
    const { data } = await api.get(`/citta/${id}`);
    return data;
  },

  async getByNome(nome: string): Promise<Citta> {
    const { data } = await api.get(`/citta/nome/${nome}`);
    return data;
  },

  async create(citta: Omit<Citta, 'id'>): Promise<Citta> {
    const { data } = await api.post('/citta', citta);
    return data;
  }
};

export default CittaService;