import { useEffect, useState } from 'react';
import { Car, Home, TreePine } from 'lucide-react';
import { ValutazioniApi } from '../../../services';
import type { Valutazione } from '../../../types/Valutazione';

import styles from './AllEvaluations.module.scss';

const AllEvaluations: React.FC = () => {
  const [evaluations, setEvaluations] = useState<Valutazione[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        setLoading(true);
        const data = await ValutazioniApi.getAll();
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (loading) {
    return <div className={styles.allEvaluations}>Caricamento valutazioni...</div>;
  }

  if (error) {
    return <div className={styles.allEvaluations}>{error}</div>;
  }

  return (
    <div className={styles.allEvaluations}>
      <div className={styles.pageHeader}>
        <h1>Tutte le Valutazioni</h1>
        <p>Visualizza tutte le valutazioni presenti nel database</p>
      </div>

      <div className={styles.evaluationsGrid}>
        {evaluations.map((evaluation) => (
          <div key={evaluation.id} className={styles.evaluationCard}>
            <div className={styles.evaluationHeader}>
              <h3>Valutazione #{evaluation.id}</h3>
              <div className={styles.priceRange}>
                <span className={styles.estimatedPrice}>
                  {formatCurrency(evaluation.valoreStimato)}
                </span>
              </div>
            </div>

            <div className={styles.evaluationDetails}>
              <div className={styles.detailRow}>
                <span className="label">Indirizzo:</span>
                <span className="value">
                  {evaluation.immobile?.indirizzo || 'Non specificato'}
                </span>
              </div>

              <div className={styles.detailRow}>
                <span className="label">Città:</span>
                <span className="value">
                  {evaluation.immobile?.citta?.nome || 'Non specificata'}
                </span>
              </div>

              <div className={styles.detailRow}>
                <span className="label">Data valutazione:</span>
                <span className="value">
                  {evaluation.dataCreazione
                    ? new Date(evaluation.dataCreazione).toLocaleDateString('it-IT')
                    : 'N/A'}
                </span>
              </div>

              <div className={styles.detailRow}>
                <span className="label">Stanze:</span>
                <span className="value">{evaluation.immobile?.numeroStanze ?? 'N/A'}</span>
              </div>

              <div className={styles.detailRow}>
                <span className="label">Bagni:</span>
                <span className="value">{evaluation.immobile?.numeroBagni ?? 'N/A'}</span>
              </div>

              <div className={styles.detailRow}>
                <span className="label">Piano:</span>
                <span className="value">{evaluation.immobile?.piano ?? 'N/A'}</span>
              </div>

              <div className={styles.detailRow}>
                <span className="label">Anno costruzione:</span>
                <span className="value">
                  {evaluation.immobile?.annoCostruzione ?? 'N/A'}
                </span>
              </div>
            </div>

            <div className={styles.priceBreakdown}>
              <div className={styles.priceItem}>
                <span className="label">Valore minimo:</span>
                <span className="value min">{formatCurrency(evaluation.valoreMinimo)}</span>
              </div>
              <div className={styles.priceItem}>
                <span className="label">Valore stimato:</span>
                <span className="value estimated">{formatCurrency(evaluation.valoreStimato)}</span>
              </div>
              <div className={styles.priceItem}>
                <span className="label">Valore massimo:</span>
                <span className="value max">{formatCurrency(evaluation.valoreMassimo)}</span>
              </div>
            </div>

            <div className={styles.propertyFeatures}>
              {evaluation.immobile?.balconi && (
                <span className={styles.feature}>
                  <Home size={14} /> Balcone
                </span>
              )}
              {evaluation.immobile?.garage && (
                <span className={styles.feature}>
                  <Car size={14} /> Garage
                </span>
              )}
              {evaluation.immobile?.giardino && (
                <span className={styles.feature}>
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
