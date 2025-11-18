import { useRef } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import styles from "./TestimonialSection.module.scss";
import TestimonialCard from "./TestimonialCard/TestimonialCard";
import TestimonialInfoBlock from "./TestimonialInfoBlock/TestimonialInfoBlock";
import useIsDesktop from "../../hooks/useIsDesktop";
import TestimonialInfoBlockDesktop from "./TestimonialInfoBlockDesktop/TestimonialInfoBlockDesktop";

const TestimonialsSection = () => {
  const isDesktop = useIsDesktop();
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollUp = () => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      const scrollAmount = carousel.clientHeight;
      const newScrollTop = Math.max(0, carousel.scrollTop - scrollAmount);
      carousel.scrollTo({ top: newScrollTop, behavior: "smooth" });
    }
  };

  const scrollDown = () => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      const scrollAmount = carousel.clientHeight;
      const maxScroll = carousel.scrollHeight - carousel.clientHeight;
      const newScrollTop = Math.min(maxScroll, carousel.scrollTop + scrollAmount);
      carousel.scrollTo({ top: newScrollTop, behavior: "smooth" });
    }
  };
  const testimonials = [
    {
      name: "Andrea Foglieri",
      text: "La valutazione era perfetta! Mi ha aiutato a stabilire il prezzo ideale per una vendita rapida.",
      imgAvif: "/img/recensione-cliente-andrea-foglieri.avif",
      imgWebp: "/img/recensione-cliente-andrea-foglieri.webp",
      imgJpg: "/img/recensione-cliente-andrea-foglieri.jpg",
    },
    {
      name: "Marina Bertolucci",
      text: "Servizio veloce, preciso e completamente gratuito. Ho ricevuto il mio report in poche ore.",
      imgAvif: "/img/recensione-cliente-marina-bertolucci.avif",
      imgWebp: "/img/recensione-cliente-marina-bertolucci.webp",
      imgJpg: "/img/recensione-cliente-marina-bertolucci.jpg",
    },
    {
      name: "Giuseppe Romano",
      text: "Professionali e affidabili. Consiglio a tutti i proprietari.",
      imgAvif: "/img/recensione-cliente-andrea-foglieri.avif",
      imgWebp: "/img/recensione-cliente-andrea-foglieri.avif",
      imgJpg: "/img/recensione-cliente-andrea-foglieri.avif",
    },
  ];

  return (
    <section className={styles.testimonialSection}>
      <h2 className={styles.testimonialSection__title}>
        Fidato da migliaia di proprietari
      </h2>

      <p className={styles.testimonialSection__text}>
        Scopri cosa dicono i nostri clienti soddisfatti
      </p>

      <div className={styles.testimonialSection__carouselWrapper}>
        {!isDesktop && (
          <button
            className={styles.testimonialSection__arrowButton}
            onClick={scrollUp}
            aria-label="Scroll up"
          >
            <ChevronUp size={24} />
          </button>
        )}
        <div
          className={styles.testimonialSection__carousel}
          ref={carouselRef}
        >
          {testimonials.map((t, i) => (
            <div key={i} className={styles.testimonialSection__item}>
              <TestimonialCard {...t} />
            </div>
          ))}
        </div>
        {!isDesktop && (
          <button
            className={styles.testimonialSection__arrowButton}
            onClick={scrollDown}
            aria-label="Scroll down"
          >
            <ChevronDown size={24} />
          </button>
        )}
      </div>

      {isDesktop ? (
        <TestimonialInfoBlockDesktop
        items={[
          {value: "6.000+", label: "Immobili valutati"},
          {value: "98%", label: "Soddisfazione dei clienti"},
          {value: "72 ore", label: "Tempo medio di consegna"},
          {value: "10+", label: "Anni di esperienza "},

        ]}

        />
      ) : (

        <TestimonialInfoBlock
        items={[
          { value: "4.9", label: "Valutazione media" },
          { value: "12K+", label: "Clienti felici" },
          { value: "99%", label: "Tasso di soddisfazione" },
        ]}
        />
      )

      }

    </section>
  );
};

export default TestimonialsSection;
