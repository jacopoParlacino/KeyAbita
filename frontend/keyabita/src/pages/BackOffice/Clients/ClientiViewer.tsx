import React, { useState, useEffect } from 'react';

import { UtentiApi } from '../../../services';
import type { Utente } from '../../../types/Utente';
import { Users, AlertCircle } from 'lucide-react';
import ClientFilters from './ClientFilters';
import ClientTable from './ClientTable';
import styles from './ClientiViewer.module.scss';

const ClientiViewer: React.FC = () => {
  const [clienti, setClienti] = useState<Utente[]>([]);
  const [filteredClienti, setFilteredClienti] = useState<Utente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRuolo, setSelectedRuolo] = useState<string>('');

  const loadClienti = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const data = await UtentiApi.getAll();
      setClienti(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore sconosciuto nel caricamento dei clienti';
      console.error('Errore nel caricamento dei clienti:', err);
      setError(errorMessage);
      setClienti([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClienti();
  }, []);

  useEffect(() => {
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
  }, [clienti, searchTerm, selectedRuolo]);

  const getRuoliUnici = (): string[] => {
    const ruoli = clienti
      .map(cliente => cliente.ruolo?.nome)
      .filter((ruolo): ruolo is string => ruolo !== undefined)
      .filter((value, index, self) => self.indexOf(value) === index);
    return ruoli;
  };

  if (loading) {
    return (
      <div className={styles['clienti-viewer']}>
        <div className={styles.loading}>
          <div className={styles['loading-spinner']}></div>
          <p>Caricamento clienti...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles['clienti-viewer']}>
        <div className={styles['error-container']}>
          <div className={styles['error-message']}>
            <AlertCircle size={24} />
            <div>
              <p className={styles['error-title']}>Errore nel caricamento</p>
              <p className={styles['error-text']}>{error}</p>
            </div>
          </div>
          <button onClick={loadClienti} className={styles['retry-btn']}>
            Riprova
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['clienti-viewer']}>
      <div className={styles['clienti-header']}>
        <div className={styles['header-title']}>
          <Users className={styles['header-icon']} />
          <h2>Gestione Clienti</h2>
        </div>
      </div>

      <ClientFilters
        searchTerm={searchTerm}
        selectedRuolo={selectedRuolo}
        ruoliUnici={getRuoliUnici()}
        onSearchChange={setSearchTerm}
        onRuoloChange={setSelectedRuolo}
      />

      <div className={styles['results-info']}>
        <span>
          Mostrando {filteredClienti.length} di {clienti.length} clienti
        </span>
      </div>

      <ClientTable
        clienti={filteredClienti}
        isLoading={loading}
      />
    </div>
  );
};

export default ClientiViewer;