import styles from "./AgentsSection.module.scss";
import AgentCard from "./AgentCard/AgentCard";

const AgentsSection = () => {
  const agents = [
    {
      name: "Anna Verdi",
      role: "Senior Analista",
      stars: 5,
      experience: "12 anni di esperienza",

      imgAvif: "/img/agente-immobiliare-anna-verdi.avif",
    imgWebp: "/img/agente-immobiliare-anna-verdi.webp",
    imgJpg: "/img/agente-immobiliare-anna-verdi.jpg"

    },
    {
      name: "Luca Bonaventura",
      role: "Portfolio Manager",
      stars: 5,
      experience: "10 anni di esperienza",
      imgAvif: "/img/agente-immobiliare-luca-bonaventura.avif",
      imgWebp: "/img/agente-immobiliare-luca-bonaventura.webp",
      imgJpg: "/img/agente-immobiliare-luca-bonaventura.jpg"
    },
    {
      name: "Vittoria Montadori",
      role: "Analista del mercato",
      stars: 5,
      experience: "10 anni di esperienza",
      imgAvif: "/img/agente-immobiliare-vittoria-montadori.avif",
      imgWebp: "/img/agente-immobiliare-vittoria-montadori.webp",
      imgJpg: "/img/agente-immobiliare-vittoria-montadori.jpg"
    },
  ];

  return (
    <section className={styles.agentsSection}>
      <h2 className={styles.agentsSection__title}>Incontra i nostri agenti</h2>
      <p className={styles.agentsSection__text}>
        Professionisti certificati pronti ad assisterti
      </p>

      <div className={styles.agentsSection__carousel}>
        {agents.map((agent, i) => (
          <AgentCard key={i} {...agent} />
        ))}
      </div>
    </section>
  );
};

export default AgentsSection;
