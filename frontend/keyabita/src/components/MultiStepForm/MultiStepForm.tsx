import { useState } from "react";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    mq: "",
    rooms: "",
    condition: "",
    floor: "",
    year: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/valutazione", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Errore server");

      alert("Valutazione inviata!");
    } catch (err) {
      console.error(err);
      alert("Errore nell'invio");
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

          <input
            name="city"
            placeholder="Città"
            value={formData.city}
            onChange={handleChange}
          />

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
