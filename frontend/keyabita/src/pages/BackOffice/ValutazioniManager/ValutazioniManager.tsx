import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Plus } from 'lucide-react';
import { ImmobiliApi, ValutazioniApi } from '../../../services';
import type { Immobile } from '../../../types/Immobile';
import type { Valutazione } from '../../../types/Valutazione';
import styles from './ValutazioniManager.module.scss';
import ValuationForm from './ValuationForm';
import ValuationTable from './ValuationTable';
import ValuationSearch from './ValuationSearch';

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

      setValutazioni(valutazioniData || []);
      setImmobili(immobiliData || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nel caricamento dei dati';
      setError(errorMessage);
      console.error('Errore nel caricamento:', err);
      setValutazioni([]);
      setImmobili([]);
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

      <ValuationSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        resultCount={filteredValutazioni.length}
        totalCount={valutazioni.length}
      />

      <ValuationTable
        valutazioni={filteredValutazioni}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <ValuationForm
          immobili={immobili}
          editingValutazione={editingValutazione}
          formData={formData}
          onFormDataChange={setFormData}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          error={error}
        />
      )}
    </div>
  );
};

export default ValutazioniManager;
