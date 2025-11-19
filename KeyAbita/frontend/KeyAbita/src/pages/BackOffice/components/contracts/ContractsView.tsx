import React, { useState, useEffect } from 'react';
import { FileText, Calendar } from 'lucide-react';
import ApiService from '../../../../services/api';
import type { Contratto } from '../../../../services/api.d';
import './ContractsView.scss';

type StatusClass = 'status-completed' | 'status-progress' | 'status-pending' | '';

const ContractsView: React.FC = () => {
  const [contracts, setContracts] = useState<Contratto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContracts = async (): Promise<void> => {
      try {
        setLoading(true);
        const data = await ApiService.getContratti();
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

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('it-IT');
  };

  const getDisplayStato = (stato?: string): string => {
    const stateMap: Record<string, string> = {
      'in_preparazione': 'In preparazione',
      'firmato': 'Firmato',
      'attivo': 'Attivo',
      'concluso': 'Concluso',
      'annullato': 'Annullato'
    };
    return stato ? (stateMap[stato] || stato) : 'N/A';
  };

  const getStatusClass = (stato?: string): StatusClass => {
    switch (stato) {
      case 'attivo':
      case 'firmato':
        return 'status-completed';
      case 'in_preparazione':
        return 'status-progress';
      case 'concluso':
        return 'status-completed';
      case 'annullato':
        return 'status-pending';
      default:
        return '';
    }
  };

  const handleViewAll = (): void => {
    window.dispatchEvent(new CustomEvent('navigate-to-all-contracts'));
  };

  if (loading) {
    return (
      <div className="contracts-view">
        <div className="loading">Caricamento contratti...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="contracts-view">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="contracts-view">
      <div className="contracts-header">
        <div className="header-left">
          <h1>Visualizza Contratti</h1>
          <p className="header-subtitle">Gestisci tutti i contratti immobiliari</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary">
            <FileText size={20} />
            Nuovo Contratto
          </button>
        </div>
      </div>

      <div className="contracts-stats">
        <div className="stat-card">
          <div className="stat-icon completed">
            <FileText size={24} />
          </div>
          <div className="stat-content">
            <h3>Contratti Totali</h3>
            <p className="stat-value">{contracts.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon progress">
            <Calendar size={24} />
          </div>
          <div className="stat-content">
            <h3>Attivi</h3>
            <p className="stat-value">{contracts.filter(c => c.statoContratto?.nome === 'attivo').length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon completed">
            <FileText size={24} />
          </div>
          <div className="stat-content">
            <h3>Conclusi</h3>
            <p className="stat-value">{contracts.filter(c => c.statoContratto?.nome === 'concluso').length}</p>
          </div>
        </div>
      </div>

      <div className="contracts-table-container">
        <div className="card-header">
          <h2>Contratti Recenti</h2>
          <button
            className="view-all-btn"
            onClick={handleViewAll}
          >
            Vedi tutte
          </button>
        </div>

        <div className="contracts-table">
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
              {contracts.slice(0, 3).map((contract) => (
                <tr key={contract.id}>
                  <td className="client-name">
                    {contract.richiesta ?
                      `${contract.richiesta.nome} ${contract.richiesta.cognome}` :
                      'N/A'}
                  </td>
                  <td>
                    {contract.richiesta?.immobile?.indirizzo || 'N/A'}
                  </td>
                  <td>{formatDate(contract.inizioContratto)}</td>
                  <td>{formatDate(contract.fineContratto)}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(contract.statoContratto?.nome)}`}>
                      {getDisplayStato(contract.statoContratto?.nome)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContractsView;
