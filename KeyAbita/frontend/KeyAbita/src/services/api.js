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

  async getValutazioniPerCitta(nomeCitta) {
    return this.request(`/valutazioni/citta/${encodeURIComponent(nomeCitta)}`);
  }

  async getValutazioniRecenti(numero = 5) {
    return this.request(`/valutazioni/recenti/${numero}`);
  }

  async createValutazione(valutazione) {
    return this.request('/valutazioni', {
      method: 'POST',
      body: JSON.stringify(valutazione),
    });
  }

  async updateValutazione(id, valutazione) {
    return this.request(`/valutazioni/${id}`, {
      method: 'PUT',
      body: JSON.stringify(valutazione),
    });
  }

  async deleteValutazione(id) {
    return this.request(`/valutazioni/${id}`, {
      method: 'DELETE',
    });
  }

  // Contratti endpoints
  async getContratti() {
    return this.request('/contratti');
  }

  async getContrattoById(id) {
    return this.request(`/contratti/${id}`);
  }

  async getContrattiByStato(nomeStato) {
    return this.request(`/contratti/stato/${encodeURIComponent(nomeStato)}`);
  }

  async getContrattiAttivi() {
    return this.request('/contratti/attivi');
  }

  async getContrattiInScadenza(giorni) {
    return this.request(`/contratti/scadenza/${giorni}`);
  }

  async getContrattiByPeriodo(dataInizio, dataFine) {
    return this.request(`/contratti/periodo?dataInizio=${dataInizio}&dataFine=${dataFine}`);
  }

  async createContratto(contratto) {
    return this.request('/contratti', {
      method: 'POST',
      body: JSON.stringify(contratto),
    });
  }

  async updateContratto(id, contratto) {
    return this.request(`/contratti/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contratto),
    });
  }

  async deleteContratto(id) {
    return this.request(`/contratti/${id}`, {
      method: 'DELETE',
    });
  }

  async getStatiContratto() {
    return this.request('/contratti/stati');
  }

  // Città endpoints
  async getCitta() {
    return this.request('/citta');
  }

  // Stati immobile endpoints
  async getStatiImmobile() {
    return this.request('/stati-immobile');
  }

  // Utenti/Clienti endpoints
  async getUtenti() {
    return this.request('/utenti');
  }

  async getUtenteById(id) {
    return this.request(`/utenti/${id}`);
  }

  async getUtenteByEmail(email) {
    return this.request(`/utenti/email/${encodeURIComponent(email)}`);
  }

  async searchUtenti(searchTerm) {
    return this.request(`/utenti/search?q=${encodeURIComponent(searchTerm)}`);
  }

  async getUtentiByRuolo(ruolo) {
    return this.request(`/utenti/ruolo/${encodeURIComponent(ruolo)}`);
  }

  async createUtente(utente) {
    return this.request('/utenti', {
      method: 'POST',
      body: JSON.stringify(utente),
    });
  }

  async updateUtente(id, utente) {
    return this.request(`/utenti/${id}`, {
      method: 'PUT',
      body: JSON.stringify(utente),
    });
  }

  async deleteUtente(id) {
    return this.request(`/utenti/${id}`, {
      method: 'DELETE',
    });
  }

  // Metodi admin
  async getAllAgenti() {
    return this.request('/utenti/agenti');
  }

  async resetPassword(utenteId, newPassword) {
    return this.request(`/utenti/${utenteId}/reset-password`, {
      method: 'POST',
      body: JSON.stringify({ newPassword }),
    });
  }

  async updateUtenteAdmin(id, utente) {
    return this.request(`/utenti/${id}/admin`, {
      method: 'PUT',
      body: JSON.stringify(utente),
    });
  }

  // Permessi agenti endpoints
  async getPermessiAgente(idAgente) {
    return this.request(`/permessi/agente/${idAgente}`);
  }

  async getModuliAbilitatiAgente(idAgente) {
    return this.request(`/permessi/agente/${idAgente}/moduli`);
  }

  async checkPermessoAgente(idAgente, modulo, permesso) {
    return this.request(`/permessi/agente/${idAgente}/check/${modulo}/${permesso}`);
  }

  async updatePermessiAgente(idAgente, permessi) {
    return this.request(`/permessi/agente/${idAgente}`, {
      method: 'PUT',
      body: JSON.stringify(permessi),
    });
  }

  async initializePermessiAgente(idAgente) {
    return this.request(`/permessi/agente/${idAgente}/initialize`, {
      method: 'POST',
    });
  }

  async updateSingoloPermesso(idAgente, modulo, permesso, abilitato) {
    return this.request(`/permessi/agente/${idAgente}/${modulo}/${permesso}`, {
      method: 'PUT',
      body: JSON.stringify({ abilitato }),
    });
  }
}

export default new ApiService();