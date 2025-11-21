import React from 'react';
import type { Contratto } from '../../../types/Contratto';
import ContractCard from './ContractCard';
import './ContractGrid.module.scss';

interface ContractGridProps {
  contracts: Contratto[];
  isLoading?: boolean;
}

const ContractGrid: React.FC<ContractGridProps> = ({ contracts, isLoading = false }) => {
  if (contracts.length === 0 && !isLoading) {
    return (
      <div className="no-contracts">
        <p>Nessun contratto trovato</p>
      </div>
    );
  }

  return (
    <div className="contract-grid">
      {contracts.map((contract) => (
        <ContractCard key={contract.id} contract={contract} />
      ))}
    </div>
  );
};

export default ContractGrid;
