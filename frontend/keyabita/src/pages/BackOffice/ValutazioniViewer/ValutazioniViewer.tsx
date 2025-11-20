import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { Search } from 'lucide-react';
import { ValutazioniApi } from '../../../services';

import type { Valutazione } from '../../../types/Valutazione';
import styles from './ValutazioniViewer.module.scss';


const ValutazioniViewer = () => {
  const [valutazioni, setValutazioni] = useState<Valutazione[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchValutazioni = async () => {
      try {
        setLoading(true);
        const data = await ValutazioniApi.getAll();
        setValutazioni(data);
      } catch (err) {
        setError('Errore nel caricamento delle valutazioni');
        console.error('Error fetching valutazioni:', err);
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

      <div className={styles.searchBar}>
        <Search size={20} />
        <input
          type="text"
          placeholder="Cerca per indirizzo o città..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className={styles.valutazioniTable}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Immobile</th>
              <th>Città</th>
              <th>Valore Stimato</th>
              <th>Range Valutazione</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {filteredValutazioni.map((valutazione) => (
              <tr key={valutazione.id}>
                <td>#{valutazione.id}</td>
                <td>{valutazione.immobile?.indirizzo || 'N/A'}</td>
                <td>{valutazione.immobile?.citta?.nome || 'N/A'}</td>
                <td className={styles.price}>{formatCurrency(valutazione.valoreStimato)}</td>
                <td>
                  <span className={styles.priceRange}>
                    {formatCurrency(valutazione.valoreMinimo)} - {formatCurrency(valutazione.valoreMassimo)}
                  </span>
                </td>
                <td>
                  {valutazione.dataCreazione ?
                    new Date(valutazione.dataCreazione).toLocaleDateString('it-IT') : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ValutazioniViewer;
