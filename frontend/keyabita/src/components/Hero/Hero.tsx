import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import styles from "./Hero.module.scss";

/**
 * Hero component renders the main hero section of the homepage.
 *
 * Includes a headline, description text, and a call-to-action button.
 * Clicking the button navigates to the property evaluation page.
 */
export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.hero__content}>
      <h1 className={styles.title}>
        Ottieni la valutazione gratuita{' '}
        <br className={styles.title__break} />
        del tuo immobile in pochi minuti
      </h1>

      <p className={styles.text}>
        Valutazione immobiliare da esperti certificati. Scopri oggi il vero
        valore di mercato della tua proprietà.
      </p>
      <button
        className={styles.cta__button}
        onClick={() => navigate("/valutazione")}
      >
        Valuta ora <ArrowRight size={20}></ArrowRight>
      </button>
      </div>


    </section>
  );
}
