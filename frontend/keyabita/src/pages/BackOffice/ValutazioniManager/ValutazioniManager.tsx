import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { ImmobiliApi, ValutazioniApi } from '../../../services';
import type { Immobile } from '../../../types/Immobile';
import type { Valutazione } from '../../../types/Valutazione';
import styles from './ValutazioniManager.module.scss';

interface FormState {
  valoreMassimo: string;
  valoreStimato: string;
  valoreMinimo: string;
  immobileId: string;
  dataCreazione: string;
}

const createInitialFormState = (): FormState => ({
  valoreMassimo: '',
  valoreStimato: '',
  valoreMinimo: '',
  immobileId: '',
  dataCreazione: new Date().toISOString().split('T')[0],
});

const ValutazioniManager = () => {
  const [valutazioni, setValutazioni] = useState<Valutazione[]>([]);
  const [immobili, setImmobili] = useState<Immobile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingValutazione, setEditingValutazione] = useState<Valutazione | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [formData, setFormData] = useState<FormState>(createInitialFormState());

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [valutazioniData, immobiliData] = await Promise.all([
        ValutazioniApi.getAll(),
        ImmobiliApi.getAll(),
      ]);

      setValutazioni(valutazioniData);
      setImmobili(immobiliData);
    } catch (err) {
      setError('Errore nel caricamento dei dati');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const valoreMinimo = Number(formData.valoreMinimo);
    const valoreStimato = Number(formData.valoreStimato);
    const valoreMassimo = Number(formData.valoreMassimo);
    const immobileId = Number(formData.immobileId);

    if ([valoreMinimo, valoreStimato, valoreMassimo].some((value) => Number.isNaN(value))) {
      setError('Inserisci valori economici validi.');
      return;
    }

    if (Number.isNaN(immobileId)) {
      setError('Seleziona un immobile valido.');
      return;
    }

    if (valoreMinimo > valoreMassimo) {
      setError('Il valore minimo non può superare il valore massimo.');
      return;
    }

    try {
      setError(null);

      const valutazioneData: Partial<Valutazione> = {
        valoreMassimo,
        valoreStimato,
        valoreMinimo,
        dataCreazione: formData.dataCreazione,
        immobile: { id: immobileId },
      };

      if (editingValutazione) {
        await ValutazioniApi.update(editingValutazione.id, valutazioneData);
      } else {
        await ValutazioniApi.create(valutazioneData);
      }

      await fetchData();
      resetForm();
    } catch (err) {
      setError('Errore nel salvare la valutazione');
      console.error(err);
    }
  };

  const handleEdit = (valutazione: Valutazione) => {
    setEditingValutazione(valutazione);
    const immobileId = valutazione.immobile?.id;

    setFormData({
      valoreMassimo: valutazione.valoreMassimo.toString(),
      valoreStimato: valutazione.valoreStimato.toString(),
      valoreMinimo: valutazione.valoreMinimo.toString(),
      immobileId: immobileId ? immobileId.toString() : '',
      dataCreazione: valutazione.dataCreazione || new Date().toISOString().split('T')[0],
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Sei sicuro di voler eliminare questa valutazione?')) {
      try {
        await ValutazioniApi.delete(id);
        await fetchData();
      } catch (err) {
        setError('Errore nell\'eliminazione della valutazione');
        console.error(err);
      }
    }
  };

  const resetForm = () => {
    setFormData(createInitialFormState());
    setEditingValutazione(null);
    setShowForm(false);
  };

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

  const filteredValutazioni = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return valutazioni;
    }

    return valutazioni.filter((valutazione) => {
      const indirizzo = valutazione.immobile?.indirizzo?.toLowerCase() ?? '';
      const citta = valutazione.immobile?.citta?.nome?.toLowerCase() ?? '';
      return indirizzo.includes(term) || citta.includes(term);
    });
  }, [searchTerm, valutazioni]);

  const handleNewValuationClick = () => {
    setEditingValutazione(null);
    setFormData(createInitialFormState());
    setShowForm(true);
    setError(null);
  };

  if (loading) return <div className={styles.loading}>Caricamento...</div>;

  return (
    <div className={styles['valutazioni-manager']}>
      <div className={styles['page-header']}>
        <h1>Gestione Valutazioni</h1>
        <button className={`${styles.btn} ${styles['btn-primary']}`} onClick={handleNewValuationClick}>
          <Plus size={20} /> Nuova Valutazione
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles['search-bar']}>
        <Search size={20} />
        <input
          type="text"
          placeholder="Cerca per indirizzo o città..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles['valutazioni-table']}>
        <table>
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
            {filteredValutazioni.map(valutazione => (
              <tr key={valutazione.id}>
                <td>#{valutazione.id}</td>
                <td>{valutazione.immobile?.indirizzo || 'N/A'}</td>
                <td>{valutazione.immobile?.citta?.nome || 'N/A'}</td>
                <td className={styles.price}>{formatCurrency(valutazione.valoreStimato)}</td>
                <td>
                  <span className={styles['price-range']}>
                    {formatCurrency(valutazione.valoreMinimo)} - {formatCurrency(valutazione.valoreMassimo)}
                  </span>
                </td>
                <td>{valutazione.dataCreazione ? new Date(valutazione.dataCreazione).toLocaleDateString('it-IT') : 'N/A'}</td>
                <td className={styles.actions}>
                  <button className={styles['btn-edit']} onClick={() => handleEdit(valutazione)} title="Modifica">
                    <Edit size={16} />
                  </button>
                  <button className={styles['btn-delete']} onClick={() => handleDelete(valutazione.id)} title="Elimina">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className={styles['modal-overlay']}>
          <div className={styles.modal}>
            <h2>{editingValutazione ? 'Modifica Valutazione' : 'Nuova Valutazione'}</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles['form-group']}>
                <label>Immobile</label>
                <select
                  value={formData.immobileId}
                  onChange={(e) => setFormData({ ...formData, immobileId: e.target.value })}
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

              <div className={styles['form-row']}>
                <div className={styles['form-group']}>
                  <label>Valore Minimo (€)</label>
                  <input
                    type="number"
                    value={formData.valoreMinimo}
                    onChange={(e) => setFormData({ ...formData, valoreMinimo: e.target.value })}
                    required
                  />
                </div>
                <div className={styles['form-group']}>
                  <label>Valore Stimato (€)</label>
                  <input
                    type="number"
                    value={formData.valoreStimato}
                    onChange={(e) => setFormData({ ...formData, valoreStimato: e.target.value })}
                    required
                  />
                </div>
                <div className={styles['form-group']}>
                  <label>Valore Massimo (€)</label>
                  <input
                    type="number"
                    value={formData.valoreMassimo}
                    onChange={(e) => setFormData({ ...formData, valoreMassimo: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className={styles['form-group']}>
                <label>Data Creazione</label>
                <input
                  type="date"
                  value={formData.dataCreazione}
                  onChange={(e) => setFormData({ ...formData, dataCreazione: e.target.value })}
                  required
                />
              </div>

              <div className={styles['form-actions']}>
                <button type="button" className={`${styles.btn} ${styles['btn-secondary']}`} onClick={resetForm}>
                  Annulla
                </button>
                <button type="submit" className={`${styles.btn} ${styles['btn-primary']}`}>
                  {editingValutazione ? 'Aggiorna' : 'Crea'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValutazioniManager;
