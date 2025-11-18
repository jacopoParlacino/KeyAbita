import { useState, useEffect } from 'react';
import ApiService from '../../../../services/api';

const RecentEvaluations = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getValutazioni();
        // Prendi solo le prime 3 valutazioni per la vista "recenti"
        setEvaluations(data.slice(0, 3));
      } catch (err) {
        setError('Errore nel caricamento delle valutazioni');
        console.error('Error fetching evaluations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluations();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  if (loading) {
    return (
      <div className="recent-evaluations">
        <div className="card-header">
          <h2>Valutazioni Recenti</h2>
        </div>
        <div className="loading">Caricamento...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recent-evaluations">
        <div className="card-header">
          <h2>Valutazioni Recenti</h2>
        </div>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="recent-evaluations">
      <div className="card-header">
        <h2>Valutazioni Recenti</h2>
        <button className="view-all-btn" onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-evaluations'))}>
          Vedi tutte
        </button>
      </div>

      <div className="evaluations-table">
        <table>
          <thead>
            <tr>
              <th>Indirizzo</th>
              <th>Prezzo</th>
              <th>Data</th>
              <th>Tipo</th>
              <th>Stanze</th>
              <th>Bagni</th>
            </tr>
          </thead>
          <tbody>
            {evaluations.map((evaluation) => (
              <tr key={evaluation.id}>
                <td className="property-name">
                  {evaluation.immobile?.indirizzo || 'N/A'}
                </td>
                <td className="value">
                  {formatCurrency(evaluation.valoreStimato)}
                </td>
                <td>
                  {evaluation.dataCreazione ? 
                    new Date(evaluation.dataCreazione).toLocaleDateString('it-IT') : 'N/A'}
                </td>
                <td>Immobile</td>
                <td>{evaluation.immobile?.numeroStanze || 'N/A'}</td>
                <td>{evaluation.immobile?.numeroBagni || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentEvaluations;
