import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import type { Valutazione } from '../../../types/Valutazione';
import './ValuationTable.module.scss';

interface ValuationTableProps {
  valutazioni: Valutazione[];
  onEdit: (valutazione: Valutazione) => void;
  onDelete: (id: number) => void;
}

const ValuationTable: React.FC<ValuationTableProps> = ({
  valutazioni,
  onEdit,
  onDelete,
}) => {
  const formatCurrency = (value?: number | null) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
      return 'N/A';
    }

    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
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

  if (valutazioni.length === 0) {
    return (
      <div className="no-valuations">
        <p>Nessuna valutazione trovata</p>
      </div>
    );
  }

  return (
    <div className="valuation-table-container">
      <table className="valuation-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Immobile</th>
            <th>Città</th>
            <th>Valore Stimato</th>
            <th>Range</th>
            <th>Data</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {valutazioni.map(valutazione => (
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
              <td className="actions">
                <button className="btn-edit" onClick={() => onEdit(valutazione)} title="Modifica">
                  <Edit size={16} />
                </button>
                <button className="btn-delete" onClick={() => onDelete(valutazione.id)} title="Elimina">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ValuationTable;
