import { useState, useEffect } from 'react';
import { Home, Car, TreePine } from 'lucide-react';
import ApiService from '../services/api';
import './AllEvaluations.css';

const AllEvaluations = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getValutazioni();
        setEvaluations(data);
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
      <div className="all-evaluations">
        <div className="loading">Caricamento valutazioni...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="all-evaluations">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="all-evaluations">
      <div className="page-header">
        <h1>Tutte le Valutazioni</h1>
        <p>Visualizza tutte le valutazioni presenti nel database</p>
      </div>

      <div className="evaluations-grid">
        {evaluations.map((evaluation) => (
          <div key={evaluation.id} className="evaluation-card">
            <div className="evaluation-header">
              <h3>Valutazione #{evaluation.id}</h3>
              <div className="price-range">
                <span className="estimated-price">
                  {formatCurrency(evaluation.valoreStimato)}
                </span>
              </div>
            </div>
            
            <div className="evaluation-details">
                            <div className="detail-row">
                <span className="label">Indirizzo:</span>
                <span className="value">
                  {evaluation.immobile?.indirizzo || 'Non specificato'}
                </span>
              </div>
              
              <div className="detail-row">
                <span className="label">Città:</span>
                <span className="value">
                  {evaluation.immobile?.citta?.nome || 'Non specificata'}
                </span>
              </div>
              
              <div className="detail-row">
                <span className="label">Data valutazione:</span>
                <span className="value">
                  {evaluation.dataCreazione ? 
                    new Date(evaluation.dataCreazione).toLocaleDateString('it-IT') : 'N/A'}
                </span>
              </div>
              
              <div className="detail-row">
                <span className="label">Stanze:</span>
                <span className="value">
                  {evaluation.immobile?.numeroStanze || 'N/A'}
                </span>
              </div>
              
              <div className="detail-row">
                <span className="label">Bagni:</span>
                <span className="value">
                  {evaluation.immobile?.numeroBagni || 'N/A'}
                </span>
              </div>
              
              <div className="detail-row">
                <span className="label">Piano:</span>
                <span className="value">
                  {evaluation.immobile?.piano !== null ? 
                    evaluation.immobile.piano : 'N/A'}
                </span>
              </div>
              
              <div className="detail-row">
                <span className="label">Anno costruzione:</span>
                <span className="value">
                  {evaluation.immobile?.annoCostruzione || 'N/A'}
                </span>
              </div>
            </div>
            
            <div className="price-breakdown">
              <div className="price-item">
                <span className="label">Valore minimo:</span>
                <span className="value min">
                  {formatCurrency(evaluation.valoreMinimo)}
                </span>
              </div>
              <div className="price-item">
                <span className="label">Valore stimato:</span>
                <span className="value estimated">
                  {formatCurrency(evaluation.valoreStimato)}
                </span>
              </div>
              <div className="price-item">
                <span className="label">Valore massimo:</span>
                <span className="value max">
                  {formatCurrency(evaluation.valoreMassimo)}
                </span>
              </div>
            </div>
            
            <div className="property-features">
              {evaluation.immobile?.balcone && (
                <span className="feature">
                  <Home size={14} /> Balcone
                </span>
              )}
              {evaluation.immobile?.garage && (
                <span className="feature">
                  <Car size={14} /> Garage
                </span>
              )}
              {evaluation.immobile?.giardino && (
                <span className="feature">
                  <TreePine size={14} /> Giardino
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEvaluations;