import styles from "./TestimonialSection.module.scss";
import TestimonialCard from "./TestimonialCard/TestimonialCard";
import TestimonialInfoBlock from "./TestimonialInfoBlock/TestimonialInfoBlock";

const TestimonialsSection = () => {
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

      <div className={styles.testimonialSection__carousel}>
        {testimonials.map((t, i) => (
          <div key={i} className={styles.testimonialSection__item}>
            <TestimonialCard {...t} />
          </div>
        ))}
      </div>

      <TestimonialInfoBlock
      items={[
        { value: "4.9", label: "Valutazione media" },
        { value: "12K+", label: "Clienti felici" },
        { value: "99%", label: "Tasso di soddisfazione" },
      ]}
      ></TestimonialInfoBlock>
    </section>
  );
};

export default TestimonialsSection;
