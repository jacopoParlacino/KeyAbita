import { useState, useEffect } from "react";
import { 
  CittaService, 
  StatoImmobileService, 
  ImmobileService, 
  ValutazioneService,
  type Citta,
  type StatoImmobile 
} from "../../services";

interface FormData {
  address: string;
  cityId: string;
  mq: string;
  rooms: string;
  conditionId: string;
  floor: string;
  year: string;
}

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<Citta[]>([]);
  const [conditions, setConditions] = useState<StatoImmobile[]>([]);

  const [formData, setFormData] = useState<FormData>({
    address: "",
    cityId: "",
    mq: "",
    rooms: "",
    conditionId: "",
    floor: "",
    year: "",
  });

  // Load cities and conditions when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        const [cittaData, conditionData] = await Promise.all([
          CittaService.getAll(),
          StatoImmobileService.getAll()
        ]);
        setCities(cittaData);
        setConditions(conditionData);
      } catch (error) {
        console.error('Errore nel caricamento dei dati:', error);
        alert('Errore nel caricamento dei dati. Riprova più tardi.');
      }
    };

    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      // First create the property
      const immobileData = {
        via: formData.address,
        metratura: parseInt(formData.mq),
        numeroStanze: parseInt(formData.rooms),
        piano: parseInt(formData.floor),
        annoCostruzione: parseInt(formData.year),
        cittaId: parseInt(formData.cityId),
        statoImmobileId: parseInt(formData.conditionId)
      };

      const newImmobile = await ImmobileService.create(immobileData);
      
      // Then create a valuation (with a placeholder value - this could be calculated)
      const valutazioneData = {
        valore: Math.floor(Math.random() * 500000) + 100000, // Placeholder calculation
        immobileId: newImmobile.id
      };

      await ValutazioneService.create(valutazioneData);

      alert("Valutazione creata con successo!");
      
      // Reset form
      setFormData({
        address: "",
        cityId: "",
        mq: "",
        rooms: "",
        conditionId: "",
        floor: "",
        year: "",
      });
      setStep(1);
      
    } catch (error) {
      console.error('Errore nell\'invio:', error);
      alert("Errore nell'invio della valutazione. Riprova più tardi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wizard">

      {step === 1 && (
        <div className="step">
          <h2>Indirizzo</h2>

          <input
            name="address"
            placeholder="Via e numero"
            value={formData.address}
            onChange={handleChange}
          />

          <select 
            name="cityId" 
            value={formData.cityId} 
            onChange={handleChange}
            required
          >
            <option value="">Seleziona città</option>
            {cities.map(city => (
              <option key={city.id} value={city.id}>
                {city.nome}
              </option>
            ))}
          </select>

          <button onClick={nextStep}>Avanti</button>
        </div>
      )}

      {step === 2 && (
        <div className="step">
          <h2>Caratteristiche</h2>

          <input
            name="mq"
            type="number"
            placeholder="Metri quadri"
            value={formData.mq}
            onChange={handleChange}
          />

          <input
            name="rooms"
            type="number"
            placeholder="Numero stanze"
            value={formData.rooms}
            onChange={handleChange}
          />

          <div className="buttons">
            <button onClick={prevStep}>Indietro</button>
            <button onClick={nextStep}>Avanti</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="step">
          <h2>Stato immobile</h2>

          <select name="conditionId" value={formData.conditionId} onChange={handleChange} required>
            <option value="">Seleziona stato immobile</option>
            {conditions.map(condition => (
              <option key={condition.id} value={condition.id}>
                {condition.nome}
              </option>
            ))}
          </select>

          <div className="buttons">
            <button onClick={prevStep}>Indietro</button>
            <button onClick={nextStep}>Avanti</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="step">
          <h2>Dettagli aggiuntivi</h2>

          <input
            name="floor"
            type="number"
            placeholder="Piano"
            value={formData.floor}
            onChange={handleChange}
          />

          <input
            name="year"
            type="number"
            placeholder="Anno di costruzione"
            value={formData.year}
            onChange={handleChange}
          />

          <div className="buttons">
            <button onClick={prevStep} disabled={loading}>Indietro</button>
            <button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Invio in corso...' : 'Invia valutazione'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
