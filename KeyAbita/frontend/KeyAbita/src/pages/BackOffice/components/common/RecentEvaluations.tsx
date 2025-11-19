import React, { useState, useEffect } from 'react';
import ApiService from '../../../../services/api';
import type { Valutazione } from '../../../../services/api.d';

const RecentEvaluations: React.FC = () => {
  const [evaluations, setEvaluations] = useState<Valutazione[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvaluations = async (): Promise<void> => {
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

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleViewAll = (): void => {
    window.dispatchEvent(new CustomEvent('navigate-to-evaluations'));
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
        <button className="view-all-btn" onClick={handleViewAll}>
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
                  {evaluation.valoreStimato ? formatCurrency(evaluation.valoreStimato) : 'N/A'}
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
