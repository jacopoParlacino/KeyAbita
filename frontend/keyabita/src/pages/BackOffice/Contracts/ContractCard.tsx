import React from 'react';
import { Home, Car, TreePine } from 'lucide-react';
import type { Contratto } from '../../../types/Contratto';
import './ContractCard.module.scss';

interface ContractCardProps {
  contract: Contratto;
}

const ContractCard: React.FC<ContractCardProps> = ({ contract }) => {
  const formatDate = (date?: string | null) =>
    date ? new Date(date).toLocaleDateString('it-IT') : 'N/A';

  const getStatusClass = (stato?: string) => {
    switch (stato) {
      case 'attivo':
      case 'firmato':
      case 'concluso':
        return 'status-completed';
      case 'in_preparazione':
        return 'status-progress';
      case 'annullato':
        return 'status-pending';
      default:
        return '';
    }
  };

  const stateMap: Record<string, string> = {
    in_preparazione: 'In preparazione',
    firmato: 'Firmato',
    attivo: 'Attivo',
    concluso: 'Concluso',
    annullato: 'Annullato',
  };

  const stato = contract.statoContratto?.nome ?? '';

  return (
    <div className="contract-card">
      <div className="contract-header">
        <h3>Contratto #{contract.id}</h3>
        <span className={`status-badge ${getStatusClass(stato)}`}>
          {stateMap[stato] || stato || 'N/A'}
        </span>
      </div>

      <div className="contract-details">
        <div className="detail-row">
          <span className="label">Cliente:</span>
          <span className="value">
            {contract.richiesta
              ? `${contract.richiesta.nome} ${contract.richiesta.cognome}`
              : 'Non specificato'}
          </span>
        </div>

        <div className="detail-row">
          <span className="label">CAP:</span>
          <span className="value">
            {contract.richiesta?.immobile?.cap || 'N/A'}
          </span>
        </div>

        <div className="detail-row">
          <span className="label">Città:</span>
          <span className="value">
            {contract.richiesta?.immobile?.citta?.nome || 'N/A'}
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
      </div>

      <div className="property-features">
        {contract.richiesta?.immobile?.balconi && (
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
  );
};

export default ContractCard;
