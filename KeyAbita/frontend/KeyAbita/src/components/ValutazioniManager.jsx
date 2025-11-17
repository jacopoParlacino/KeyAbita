import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import ApiService from '../services/api';
import './ValutazioniManager.css';

const ValutazioniManager = () => {
  const [valutazioni, setValutazioni] = useState([]);
  const [immobili, setImmobili] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingValutazione, setEditingValutazione] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    valoreMassimo: '',
    valoreStimato: '',
    valoreMinimo: '',
    immobileId: '',
    dataCreazione: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [valutazioniData, immobiliData] = await Promise.all([
        ApiService.getValutazioni(),
        ApiService.getImmobili()
      ]);
      setValutazioni(valutazioniData);
      setImmobili(immobiliData);
    } catch (err) {
      setError('Errore nel caricamento dei dati');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const valutazioneData = {
        ...formData,
        valoreMassimo: parseFloat(formData.valoreMassimo),
        valoreStimato: parseFloat(formData.valoreStimato),
        valoreMinimo: parseFloat(formData.valoreMinimo),
        immobile: { id: parseInt(formData.immobileId) }
      };

      if (editingValutazione) {
        await ApiService.updateValutazione(editingValutazione.id, valutazioneData);
      } else {
        await ApiService.createValutazione(valutazioneData);
      }

      await fetchData();
      resetForm();
    } catch (err) {
      setError('Errore nel salvare la valutazione');
      console.error('Error saving valutazione:', err);
    }
  };

  const handleEdit = (valutazione) => {
    setEditingValutazione(valutazione);
    setFormData({
      valoreMassimo: valutazione.valoreMassimo.toString(),
      valoreStimato: valutazione.valoreStimato.toString(),
      valoreMinimo: valutazione.valoreMinimo.toString(),
      immobileId: valutazione.immobile?.id?.toString() || '',
      dataCreazione: valutazione.dataCreazione || new Date().toISOString().split('T')[0]
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Sei sicuro di voler eliminare questa valutazione?')) {
      try {
        await ApiService.deleteValutazione(id);
        await fetchData();
      } catch (err) {
        setError('Errore nell\'eliminazione della valutazione');
        console.error('Error deleting valutazione:', err);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      valoreMassimo: '',
      valoreStimato: '',
      valoreMinimo: '',
      immobileId: '',
      dataCreazione: new Date().toISOString().split('T')[0]
    });
    setEditingValutazione(null);
    setShowForm(false);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const filteredValutazioni = valutazioni.filter(valutazione =>
    valutazione.immobile?.indirizzo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    valutazione.immobile?.citta?.nome?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Caricamento...</div>;
  }

  return (
    <div className="valutazioni-manager">
      <div className="page-header">
        <h1>Gestione Valutazioni</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          <Plus size={20} />
          Nuova Valutazione
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="search-bar">
        <Search size={20} />
        <input
          type="text"
          placeholder="Cerca per indirizzo o città..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="valutazioni-table">
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
            {filteredValutazioni.map((valutazione) => (
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
                <td>
                  {valutazione.dataCreazione ? 
                    new Date(valutazione.dataCreazione).toLocaleDateString('it-IT') : 'N/A'}
                </td>
                <td>
                  <div className="actions">
                    <button 
                      className="btn-edit"
                      onClick={() => handleEdit(valutazione)}
                      title="Modifica"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDelete(valutazione.id)}
                      title="Elimina"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingValutazione ? 'Modifica Valutazione' : 'Nuova Valutazione'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Immobile</label>
                <select
                  value={formData.immobileId}
                  onChange={(e) => setFormData({...formData, immobileId: e.target.value})}
                  required
                >
                  <option value="">Seleziona immobile</option>
                  {immobili.map((immobile) => (
                    <option key={immobile.id} value={immobile.id}>
                      {immobile.indirizzo} - {immobile.citta?.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Valore Minimo (€)</label>
                  <input
                    type="number"
                    value={formData.valoreMinimo}
                    onChange={(e) => setFormData({...formData, valoreMinimo: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Valore Stimato (€)</label>
                  <input
                    type="number"
                    value={formData.valoreStimato}
                    onChange={(e) => setFormData({...formData, valoreStimato: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Valore Massimo (€)</label>
                  <input
                    type="number"
                    value={formData.valoreMassimo}
                    onChange={(e) => setFormData({...formData, valoreMassimo: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Data Creazione</label>
                <input
                  type="date"
                  value={formData.dataCreazione}
                  onChange={(e) => setFormData({...formData, dataCreazione: e.target.value})}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={resetForm} className="btn btn-secondary">
                  Annulla
                </button>
                <button type="submit" className="btn btn-primary">
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