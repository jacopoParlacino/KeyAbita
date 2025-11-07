import { useState } from "react";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    indirizzo: "",
    citta: "1", // Default a Torino
    stato_immobile: "1", // Default a "in_attesa"
    piano: "0",
    numero_stanze: "1",
    numero_bagni: "1",
    balcone: false,
    garage: false,
    giardino: false,
    anno_costruzione: new Date().getFullYear().toString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  // Funzione per calcolare il valore dell'immobile
  const calcolaValore = (immobile: any) => {
    const baseValue = parseInt(immobile.numero_stanze) * 50000; // valore base per stanza
    const statoMultiplier = immobile.stato_immobile === 2 ? 1.2 : 1.0; // stato "valutato" vale di più
    const valoreStimato = baseValue * statoMultiplier;
    
    return {
      valore_minimo: Math.round(valoreStimato * 0.95), // -5%
      valore_stimato: Math.round(valoreStimato),
      valore_massimo: Math.round(valoreStimato * 1.05), // +5%
    };
  };

  const handleSubmit = async () => {
    try {
      // Prima creiamo l'immobile
      const immobileResponse = await fetch("http://localhost:8080/api/immobili", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          indirizzo: formData.indirizzo,
          citta: {
            id: parseInt(formData.citta)
          },
          statoImmobile: {
            id: parseInt(formData.stato_immobile)
          },
          piano: parseInt(formData.piano),
          numeroStanze: parseInt(formData.numero_stanze),
          numeroBagni: parseInt(formData.numero_bagni),
          balcone: formData.balcone,
          garage: formData.garage,
          giardino: formData.giardino,
          annoCostruzione: parseInt(formData.anno_costruzione)
        }),
      });

      if (!immobileResponse.ok) throw new Error("Errore creazione immobile");
      
      const immobile = await immobileResponse.json();
      const valori = calcolaValore(immobile);
      
      // Poi creiamo la valutazione collegata all'immobile
      const valutazioneResponse = await fetch("http://localhost:8080/api/valutazioni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...valori,
          id_immobiliare: immobile.id
        }),
      });

      if (!valutazioneResponse.ok) throw new Error("Errore creazione valutazione");

      alert("Valutazione inviata con successo!");
    } catch (err) {
      console.error(err);
      alert("Errore nell'invio della valutazione");
    }
  };

  return (
    <div className="wizard">

      {step === 1 && (
        <div className="step">
          <h2>Dati Immobile</h2>

          <input
            name="indirizzo"
            placeholder="Via e numero"
            value={formData.indirizzo}
            onChange={handleChange}
          />

          <select
            name="citta"
            value={formData.citta}
            onChange={handleChange}
          >
            <option value="">Seleziona città</option>
            <option value="1">Torino</option>
            <option value="2">Cuneo</option>
            <option value="3">Milano</option>
            <option value="4">Asti</option>
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

          <select name="condition" value={formData.condition} onChange={handleChange}>
            <option value="">Seleziona</option>
            <option value="nuovo">Nuovo</option>
            <option value="ristrutturato">Ristrutturato</option>
            <option value="buono">Buono</option>
            <option value="da ristrutturare">Da ristrutturare</option>
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
            <button onClick={prevStep}>Indietro</button>
            <button onClick={handleSubmit}>Invia valutazione</button>
          </div>
        </div>
      )}
    </div>
  );
}
