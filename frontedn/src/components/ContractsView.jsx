import { FileText, Download, Eye, Calendar } from 'lucide-react';
import './ContractsView.css';

const ContractsView = () => {
  const contracts = [
    {
      id: 1,
      cliente: 'Mario Rossi',
      immobile: 'Via Jacopo Duranti 45',
      tipo: 'Compravendita',
      data: '15/11/2025',
      stato: 'Completato',
      valore: '124.000 €'
    },
    {
      id: 2,
      cliente: 'Laura Bianchi',
      immobile: 'Piazza Castello 3',
      tipo: 'Locazione',
      data: '10/11/2025',
      stato: 'In corso',
      valore: '1.200 €/mese'
    },
    {
      id: 3,
      cliente: 'Paolo Verdi',
      immobile: 'Corso Indipendenza 114',
      tipo: 'Compravendita',
      data: '08/11/2025',
      stato: 'In attesa',
      valore: '349.500 €'
    },
    {
      id: 4,
      cliente: 'Giulia Neri',
      immobile: 'Via Roma 22',
      tipo: 'Locazione',
      data: '05/11/2025',
      stato: 'Completato',
      valore: '800 €/mese'
    }
  ];

  const getStatusClass = (stato) => {
    switch (stato) {
      case 'Completato':
        return 'status-completed';
      case 'In corso':
        return 'status-progress';
      case 'In attesa':
        return 'status-pending';
      default:
        return '';
    }
  };

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
            <h3>In Corso</h3>
            <p className="stat-value">{contracts.filter(c => c.stato === 'In corso').length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon completed">
            <FileText size={24} />
          </div>
          <div className="stat-content">
            <h3>Completati</h3>
            <p className="stat-value">{contracts.filter(c => c.stato === 'Completato').length}</p>
          </div>
        </div>
      </div>

      <div className="contracts-table-container">
        <div className="table-header">
          <h2>Elenco Contratti</h2>
          <div className="table-filters">
            <select className="filter-select">
              <option value="all">Tutti i tipi</option>
              <option value="compravendita">Compravendita</option>
              <option value="locazione">Locazione</option>
            </select>
            <select className="filter-select">
              <option value="all">Tutti gli stati</option>
              <option value="completato">Completato</option>
              <option value="in-corso">In corso</option>
              <option value="in-attesa">In attesa</option>
            </select>
          </div>
        </div>

        <div className="contracts-table">
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Immobile</th>
                <th>Tipo</th>
                <th>Data</th>
                <th>Stato</th>
                <th>Valore</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract) => (
                <tr key={contract.id}>
                  <td className="client-name">{contract.cliente}</td>
                  <td>{contract.immobile}</td>
                  <td>{contract.tipo}</td>
                  <td>{contract.data}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(contract.stato)}`}>
                      {contract.stato}
                    </span>
                  </td>
                  <td className="value">{contract.valore}</td>
                  <td>
                    <div className="actions">
                      <button className="action-btn" title="Visualizza">
                        <Eye size={16} />
                      </button>
                      <button className="action-btn" title="Scarica">
                        <Download size={16} />
                      </button>
                    </div>
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