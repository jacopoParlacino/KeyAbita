// ContractsView.tsx
import { useState, useEffect, useMemo } from 'react';
import { FileText, Calendar } from 'lucide-react';
import { ContrattiApi } from "../../../services";
import type { Contratto } from '../../../types/Contratto';
import styles from './ContractsView.module.scss';

const ContractsView = () => {
  const [contracts, setContracts] = useState<Contratto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStato, setSelectedStato] = useState<string>('all');

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        setLoading(true);
        const data = await ContrattiApi.getAll();
        setContracts(data);
      } catch (err) {
        setError('Errore nel caricamento dei contratti');
        console.error('Error fetching contracts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('it-IT');
  };

  const getDisplayStato = (stato?: string | null) => {
    if (!stato) return 'N/A';
    const stateMap: Record<string, string> = {
      in_preparazione: 'In preparazione',
      firmato: 'Firmato',
      attivo: 'Attivo',
      concluso: 'Concluso',
      annullato: 'Annullato',
    };
    return stateMap[stato] || stato;
  };

  const getStatusClass = (stato?: string | null) => {
    switch (stato) {
      case 'attivo':
      case 'firmato':
      case 'concluso':
        return styles.statusCompleted;
      case 'in_preparazione':
        return styles.statusProgress;
      case 'annullato':
        return styles.statusPending;
      default:
        return '';
    }
  };

  const statoOptions = useMemo(() => {
    const names = contracts
      .map((contract) => contract.statoContratto?.nome)
      .filter((nome): nome is string => Boolean(nome));
    return Array.from(new Set(names));
  }, [contracts]);

  const filteredContracts = contracts.filter((contract) =>
    selectedStato === 'all'
      ? true
      : contract.statoContratto?.nome === selectedStato
  );

  const limitedContracts = filteredContracts.slice(0, 3);

  if (loading) return <div className={styles.contractsView}>Caricamento contratti...</div>;
  if (error) return <div className={styles.contractsView}>{error}</div>;

  return (
    <div className={styles.contractsView}>
      <div className={styles.contractsHeader}>
        <div className={styles.headerLeft}>
          <h1>Visualizza Contratti</h1>
          <p className={styles.headerSubtitle}>Gestisci tutti i contratti immobiliari</p>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.filterWrapper}>
            <label htmlFor="statoFilter">Filtra per stato</label>
            <select
              id="statoFilter"
              className={styles.filterSelect}
              value={selectedStato}
              onChange={(event) => setSelectedStato(event.target.value)}
            >
              <option value="all">Tutti</option>
              {statoOptions.map((stato) => (
                <option key={stato} value={stato}>
                  {getDisplayStato(stato)}
                </option>
              ))}
            </select>
          </div>
          <button className={styles.btnPrimary}>
            <FileText size={20} /> Nuovo Contratto
          </button>
        </div>
      </div>

      <div className={styles.contractsStats}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.completed}`}>
            <FileText size={24} />
          </div>
          <div className={styles.statContent}>
            <h3>Contratti Totali</h3>
            <p className={styles.statValue}>{contracts.length}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.progress}`}>
            <Calendar size={24} />
          </div>
          <div className={styles.statContent}>
            <h3>Attivi</h3>
            <p className={styles.statValue}>
              {contracts.filter((c) => c.statoContratto?.nome === 'attivo').length}
            </p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.completed}`}>
            <FileText size={24} />
          </div>
          <div className={styles.statContent}>
            <h3>Conclusi</h3>
            <p className={styles.statValue}>
              {contracts.filter((c) => c.statoContratto?.nome === 'concluso').length}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.contractsTableContainer}>
        <div className={styles.cardHeader}>
          <h2>Contratti Recenti</h2>
          <button
            className={styles.viewAllBtn}
            onClick={() =>
              window.dispatchEvent(new CustomEvent('navigate-to-all-contracts'))
            }
          >
            Vedi tutte
          </button>
        </div>

        <div className={styles.contractsTable}>
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Immobile</th>
                <th>Data Inizio</th>
                <th>Data Fine</th>
                <th>Stato</th>
              </tr>
            </thead>
            <tbody>
              {limitedContracts.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.emptyState}>
                    Nessun contratto trovato per questo stato.
                  </td>
                </tr>
              ) : (
                limitedContracts.map((contract) => {
                  const statoNome = contract.statoContratto?.nome ?? 'N/A';
                  return (
                    <tr key={contract.id}>
                      <td>
                        {contract.richiesta
                          ? `${contract.richiesta.nome} ${contract.richiesta.cognome}`
                          : 'N/A'}
                      </td>
                      <td>{contract.richiesta?.immobile?.cap || 'N/A'}</td>
                      <td>{formatDate(contract.inizioContratto)}</td>
                      <td>{formatDate(contract.fineContratto)}</td>
                      <td>
                        <span
                          className={`${styles.statusBadge} ${getStatusClass(statoNome)}`}
                        >
                          {getDisplayStato(statoNome)}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContractsView;
