const API_BASE_URL = '/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Immobili endpoints
  async getImmobili() {
    return this.request('/immobili');
  }

  async getImmobileById(id) {
    return this.request(`/immobili/${id}`);
  }

  async createImmobile(immobile) {
    return this.request('/immobili', {
      method: 'POST',
      body: JSON.stringify(immobile),
    });
  }

  async getImmobiliPerCitta(nomeCitta) {
    return this.request(`/immobili/citta/${encodeURIComponent(nomeCitta)}`);
  }

  async getImmobiliPerStato(nomeStato) {
    return this.request(`/immobili/stato-immobile/${encodeURIComponent(nomeStato)}`);
  }

  async getImmobiliPerStanze(numeroStanze) {
    return this.request(`/immobili/stanze/${numeroStanze}`);
  }

  // Valutazioni endpoints
  async getValutazioni() {
    return this.request('/valutazioni');
  }

  async getValutazioneById(id) {
    return this.request(`/valutazioni/${id}`);
  }

  async getValutazioniPerImmobile(immobileId) {
    return this.request(`/valutazioni/immobile/${immobileId}`);
  }

  async getValutazioniPerRange(min, max) {
    return this.request(`/valutazioni/range?min=${min}&max=${max}`);
  }

  async createValutazione(valutazione) {
    return this.request('/valutazioni', {
      method: 'POST',
      body: JSON.stringify(valutazione),
    });
  }

  // Città endpoints
  async getCitta() {
    return this.request('/citta');
  }

  // Stati immobile endpoints
  async getStatiImmobile() {
    return this.request('/stati-immobile');
  }
}

export default new ApiService();