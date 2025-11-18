import { useState, useEffect } from 'react';
import { Home, Car, TreePine } from 'lucide-react';
import ApiService from '../../../../services/api';
import './AllContracts.css';

const AllContracts = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContracts = async () => {
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

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('it-IT');
  };

  const getDisplayStato = (stato) => {
    const stateMap = {
      'in_preparazione': 'In preparazione',
      'firmato': 'Firmato',
      'attivo': 'Attivo',
      'concluso': 'Concluso',
      'annullato': 'Annullato'
    };
    return stateMap[stato] || stato;
  };

  const getStatusClass = (stato) => {
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

  if (loading) {
    return (
      <div className="all-contracts">
        <div className="loading">Caricamento contratti...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="all-contracts">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="all-contracts">
      <div className="page-header">
        <h1>Tutti i Contratti</h1>
        <p>Visualizza tutti i contratti presenti nel database</p>
      </div>

      <div className="contracts-grid">
        {contracts.map((contract) => (
          <div key={contract.id} className="contract-card">
            <div className="contract-header">
              <h3>Contratto #{contract.id}</h3>
              <div className="contract-status">
                <span className={`status-badge ${getStatusClass(contract.statoContratto?.nome)}`}>
                  {getDisplayStato(contract.statoContratto?.nome)}
                </span>
              </div>
            </div>
            
            <div className="contract-details">
              <div className="detail-row">
                <span className="label">Cliente:</span>
                <span className="value">
                  {contract.richiesta ? 
                    `${contract.richiesta.nome} ${contract.richiesta.cognome}` : 
                    'Non specificato'}
                </span>
              </div>
              
              <div className="detail-row">
                <span className="label">Indirizzo:</span>
                <span className="value">
                  {contract.richiesta?.immobile?.indirizzo || 'Non specificato'}
                </span>
              </div>
              
              <div className="detail-row">
                <span className="label">Città:</span>
                <span className="value">
                  {contract.richiesta?.immobile?.citta?.nome || 'Non specificata'}
                </span>
              </div>
              
              <div className="detail-row">
                <span className="label">Data inizio:</span>
                <span className="value">
                  {formatDate(contract.inizioContratto)}
                </span>
              </div>
              
              <div className="detail-row">
                <span className="label">Data fine:</span>
                <span className="value">
                  {formatDate(contract.fineContratto)}
                </span>
              </div>
              
              <div className="detail-row">
                <span className="label">Stanze:</span>
                <span className="value">
                  {contract.richiesta?.immobile?.numeroStanze || 'N/A'}
                </span>
              </div>
              
              <div className="detail-row">
                <span className="label">Bagni:</span>
                <span className="value">
                  {contract.richiesta?.immobile?.numeroBagni || 'N/A'}
                </span>
              </div>
              
              <div className="detail-row">
                <span className="label">Piano:</span>
                <span className="value">
                  {contract.richiesta?.immobile?.piano !== null ? 
                    contract.richiesta.immobile.piano : 'N/A'}
                </span>
              </div>
              
              <div className="detail-row">
                <span className="label">Anno costruzione:</span>
                <span className="value">
                  {contract.richiesta?.immobile?.annoCostruzione || 'N/A'}
                </span>
              </div>
            </div>
            
            <div className="property-features">
              {contract.richiesta?.immobile?.balcone && (
                <span className="feature">
                  <Home size={14} /> Balcone
                </span>
              )}
              {contract.richiesta?.immobile?.garage && (
                <span className="feature">
                  <Car size={14} /> Garage
                </span>
              )}
              {contract.richiesta?.immobile?.giardino && (
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

export default AllContracts;