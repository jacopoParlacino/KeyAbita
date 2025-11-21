import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { ValutazioniApi } from '../../../services';

import type { Valutazione } from '../../../types/Valutazione';
import styles from './ValutazioniViewer.module.scss';
import ValuationViewSearch from './ValuationViewSearch';
import ValuationViewTable from './ValuationViewTable';


const ValutazioniViewer = () => {
  const [valutazioni, setValutazioni] = useState<Valutazione[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchValutazioni = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ValutazioniApi.getAll();
        setValutazioni(data || []);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Errore sconosciuto nel caricamento delle valutazioni';
        setError(errorMessage);
        console.error('Error fetching valutazioni:', err);
        setValutazioni([]);
      } finally {
        setLoading(false);
      }
    };

    fetchValutazioni();
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const filteredValutazioni = valutazioni.filter(valutazione =>
    valutazione.immobile?.indirizzo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    valutazione.immobile?.citta?.nome?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className={styles.valutazioniViewer}>
        <div className={styles.loading}>Caricamento valutazioni...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.valutazioniViewer}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.valutazioniViewer}>
      <div className={styles.pageHeader}>
        <h1>Valutazioni</h1>
        <p>Visualizza tutte le valutazioni immobiliari</p>
      </div>

      <ValuationViewSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <ValuationViewTable
        valutazioni={filteredValutazioni}
        isLoading={loading}
      />
    </div>
  );
};

export default ValutazioniViewer;
