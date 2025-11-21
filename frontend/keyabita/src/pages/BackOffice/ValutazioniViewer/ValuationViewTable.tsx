import React from 'react';
import type { Valutazione } from '../../../types/Valutazione';
import './ValuationViewTable.module.scss';

interface ValuationViewTableProps {
  valutazioni: Valutazione[];
  isLoading?: boolean;
}

const ValuationViewTable: React.FC<ValuationViewTableProps> = ({
  valutazioni,
  isLoading = false,
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (date?: string | null) => {
    if (!date) return 'N/A';
    try {
      return new Date(date).toLocaleDateString('it-IT');
    } catch {
      return 'N/A';
    }
  };

  if (valutazioni.length === 0 && !isLoading) {
    return (
      <div className="no-valuations">
        <p>Nessuna valutazione trovata</p>
      </div>
    );
  }

  return (
    <div className="valuation-view-table-container">
      <table className="valuation-view-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Immobile</th>
            <th>Città</th>
            <th>Valore Stimato</th>
            <th>Range Valutazione</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {valutazioni.map((valutazione) => (
            <tr key={valutazione.id}>
              <td>#{valutazione.id}</td>
              <td>{valutazione.immobile?.indirizzo || 'N/A'}</td>
              <td>{valutazione.immobile?.citta?.nome || 'N/A'}</td>
              <td className="price">{formatCurrency(valutazione.valoreStimato)}</td>
              <td>
                <span className="price-range">
                  {formatCurrency(valutazione.valoreMinimo)} - {formatCurrency(valutazione.valoreMassimo)}
                </span>
              </td>
              <td>{formatDate(valutazione.dataCreazione)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ValuationViewTable;
