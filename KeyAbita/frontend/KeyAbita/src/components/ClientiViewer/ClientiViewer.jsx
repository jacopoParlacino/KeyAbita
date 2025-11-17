import React, { useState, useEffect } from 'react';
import './ClientiViewer.css';
import ApiService from '../../services/api';
import { Users, Search, Filter, Calendar, Mail, Phone, User } from 'lucide-react';

const ClientiViewer = () => {
  const [clienti, setClienti] = useState([]);
  const [filteredClienti, setFilteredClienti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRuolo, setSelectedRuolo] = useState('');

  useEffect(() => {
    loadClienti();
  }, []);

  useEffect(() => {
    filterClienti();
  }, [clienti, searchTerm, selectedRuolo]);

  const loadClienti = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getUtenti();
      setClienti(data || []);
      setError(null);
    } catch (err) {
      console.error('Errore nel caricamento dei clienti:', err);
      setError('Errore nel caricamento dei clienti');
      setClienti([]);
    } finally {
      setLoading(false);
    }
  };

  const filterClienti = () => {
    let filtered = [...clienti];

    // Filtro per testo di ricerca
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(cliente => 
        cliente.nome?.toLowerCase().includes(searchLower) ||
        cliente.cognome?.toLowerCase().includes(searchLower) ||
        cliente.email?.toLowerCase().includes(searchLower) ||
        cliente.telefono?.includes(searchTerm)
      );
    }

    // Filtro per ruolo
    if (selectedRuolo) {
      filtered = filtered.filter(cliente => 
        cliente.ruolo?.nome === selectedRuolo
      );
    }

    setFilteredClienti(filtered);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('it-IT');
    } catch {
      return 'N/A';
    }
  };

  const getRuoliUnici = () => {
    const ruoli = clienti
      .map(cliente => cliente.ruolo?.nome)
      .filter(ruolo => ruolo)
      .filter((value, index, self) => self.indexOf(value) === index);
    return ruoli;
  };

  if (loading) {
    return (
      <div className="clienti-viewer">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Caricamento clienti...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="clienti-viewer">
        <div className="error">
          <p>{error}</p>
          <button onClick={loadClienti} className="retry-btn">
            Riprova
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="clienti-viewer">
      <div className="clienti-header">
        <div className="header-title">
          <Users className="header-icon" />
          <h2>Gestione Clienti</h2>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Cerca per nome, cognome, email o telefono..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <Filter className="filter-icon" />
          <select
            value={selectedRuolo}
            onChange={(e) => setSelectedRuolo(e.target.value)}
            className="filter-select"
          >
            <option value="">Tutti i ruoli</option>
            {getRuoliUnici().map(ruolo => (
              <option key={ruolo} value={ruolo}>{ruolo}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="results-info">
        <span>
          Mostrando {filteredClienti.length} di {clienti.length} clienti
        </span>
      </div>

      {filteredClienti.length === 0 ? (
        <div className="no-results">
          <Users className="no-results-icon" />
          <h3>Nessun cliente trovato</h3>
          <p>Non ci sono clienti che corrispondono ai criteri di ricerca.</p>
        </div>
      ) : (
        <div className="clienti-table-container">
          <table className="clienti-table">
            <thead>
              <tr>
                <th><User className="th-icon" /> Cliente</th>
                <th><Mail className="th-icon" /> Contatti</th>
                <th><Filter className="th-icon" /> Ruolo</th>
                <th><Calendar className="th-icon" /> Data Creazione</th>
              </tr>
            </thead>
            <tbody>
              {filteredClienti.map((cliente) => (
                <tr key={cliente.id} className="cliente-row">
                  <td className="cliente-info">
                    <div className="cliente-avatar">
                      {(cliente.nome?.[0] || '') + (cliente.cognome?.[0] || '')}
                    </div>
                    <div className="cliente-details">
                      <div className="cliente-nome">
                        {cliente.nome || 'N/A'} {cliente.cognome || ''}
                      </div>
                    </div>
                  </td>
                  <td className="contatti-info">
                    <div className="contatto-item">
                      <Mail className="contatto-icon" />
                      <span>{cliente.email || 'N/A'}</span>
                    </div>
                    <div className="contatto-item">
                      <Phone className="contatto-icon" />
                      <span>{cliente.telefono || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="ruolo-cell">
                    <span className={`ruolo-badge ${cliente.ruolo?.nome?.toLowerCase() || 'default'}`}>
                      {cliente.ruolo?.nome || 'N/A'}
                    </span>
                  </td>
                  <td className="data-cell">
                    <div className="data-container">
                      <Calendar className="data-icon" />
                      <span>{formatDate(cliente.dataCreazione)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClientiViewer;