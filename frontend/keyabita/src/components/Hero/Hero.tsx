import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.scss";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>Ottieni la valutazione gratuita del tuo immobile in pochi minuti</h1>

      <p className={styles.text}>
        Valutazione immobiliare da esperti certificati. Scopri oggi il vero
        valore di mercato della tua proprietà.
      </p>

      <button className={styles.button} onClick={() => navigate("/valuation")}>Valuta ora</button>
    </section>
  );
}