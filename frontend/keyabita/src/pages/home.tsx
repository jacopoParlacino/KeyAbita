import { Link } from "react-router-dom";
import "../styles/home.scss";

export default function Home() {
  return (
    <section className="home">
      <div className="home__hero">
        <h1>Vendi il tuo immobile con facilita -- placeholder</h1>
        <p>
            Key Abita ti aiuta a trovare acquirenti in modo semplice, veloce e trasparente - senza complicazione burocratiche.
        </p>
        <Link to="/form" className="home__cta">Inizia subito</Link>
      </div>

      <div className="home__feature">
        <div className="feature">
            <h3>Inserisci l'immobile</h3>
            <p>Compila un modulo con le informazioni principali</p>
        </div>

        <div className="feature">
            <h3>Ricevi valutazione</h3>
            <p>Ti mandiamo la valutazione della tua proprieta entro 72 ore</p>
        </div>

        <div className="feature">
            <h3>Concludi l'accordo</h3>
            <p>Tutto online in modo sicuro e trasparente</p>
        </div>
      </div>
      
    </section>
  );
}