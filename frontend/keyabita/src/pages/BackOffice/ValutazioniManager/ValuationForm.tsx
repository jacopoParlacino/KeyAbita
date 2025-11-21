import React from 'react';
import type { FormEvent } from 'react';
import type { Immobile } from '../../../types/Immobile';
import type { Valutazione } from '../../../types/Valutazione';
import './ValuationForm.module.scss';

interface FormState {
  valoreMassimo: string;
  valoreStimato: string;
  valoreMinimo: string;
  immobileId: string;
  dataCreazione: string;
}

interface ValuationFormProps {
  immobili: Immobile[];
  editingValutazione: Valutazione | null;
  formData: FormState;
  onFormDataChange: (data: FormState) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  error?: string | null;
}

const ValuationForm: React.FC<ValuationFormProps> = ({
  immobili,
  editingValutazione,
  formData,
  onFormDataChange,
  onSubmit,
  onCancel,
  error,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{editingValutazione ? 'Modifica Valutazione' : 'Nuova Valutazione'}</h2>
        {error && <div className="form-error">{error}</div>}
        
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Immobile</label>
            <select
              value={formData.immobileId}
              onChange={(e) => onFormDataChange({ ...formData, immobileId: e.target.value })}
              required
            >
              <option value="">Seleziona immobile</option>
              {immobili.map((immobile) => {
                if (!immobile.id) return null;

                return (
                  <option key={immobile.id} value={immobile.id}>
                    {immobile.indirizzo || 'Senza indirizzo'} - {immobile.citta?.nome || 'N/A'}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Valore Minimo (€)</label>
              <input
                type="number"
                value={formData.valoreMinimo}
                onChange={(e) => onFormDataChange({ ...formData, valoreMinimo: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Valore Stimato (€)</label>
              <input
                type="number"
                value={formData.valoreStimato}
                onChange={(e) => onFormDataChange({ ...formData, valoreStimato: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Valore Massimo (€)</label>
              <input
                type="number"
                value={formData.valoreMassimo}
                onChange={(e) => onFormDataChange({ ...formData, valoreMassimo: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Data Creazione</label>
            <input
              type="date"
              value={formData.dataCreazione}
              onChange={(e) => onFormDataChange({ ...formData, dataCreazione: e.target.value })}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Annulla
            </button>
            <button type="submit" className="btn btn-primary">
              {editingValutazione ? 'Aggiorna' : 'Crea'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ValuationForm;
