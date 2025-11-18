import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import ApiService from '../../../../services/api';
import './ValutazioniViewer.css';

const ValutazioniViewer = () => {
  const [valutazioni, setValutazioni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchValutazioni = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getValutazioni();
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

  const formatCurrency = (value) => {
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
      <div className="valutazioni-viewer">
        <div className="loading">Caricamento valutazioni...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="valutazioni-viewer">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="valutazioni-viewer">
      <div className="page-header">
        <h1>Valutazioni</h1>
        <p>Visualizza tutte le valutazioni immobiliari</p>
      </div>

      <div className="search-bar">
        <Search size={20} />
        <input
          type="text"
          placeholder="Cerca per indirizzo o città..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="valutazioni-table">
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
                <td className="price">{formatCurrency(valutazione.valoreStimato)}</td>
                <td>
                  <span className="price-range">
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