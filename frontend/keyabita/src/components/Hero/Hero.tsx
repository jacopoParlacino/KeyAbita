import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import styles from "./Hero.module.scss";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.hero__content}>
      <h1 className={styles.title}>
        Ottieni la valutazione gratuita del tuo immobile in pochi minuti
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
      <picture className={styles.hero__picture}>
        <source
          srcSet="/img/valutazione-gratuita-immobile-keyabita.avif"
          type="image/avif"
        />
        <source
          srcSet="/img/valutazione-gratuita-immobile-keyabita.webp"
          type="image/webp"
        />
        <img
          src="/img/valutazione-gratuita-immobile-keyabita.jpg"
          alt="Casa in vendita"
          className={styles.hero__image}
          loading="lazy"
        />
      </picture>

    </section>
  );
}
