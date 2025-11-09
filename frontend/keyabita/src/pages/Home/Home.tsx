import { TrendingUp, Clock3, ClipboardList, House, MapPin } from "lucide-react";
import Hero from "../../components/Hero/Hero";
import FeatureSection from "../../components/FeatureSection/FeatureSection";
import StatsBlock from "../../components/FeatureSection/StatsBlock/StatsBlock";
import ProgressCard from "../../components/FeatureSection/ProgressCard/ProgressCard";
import styles from "./Home.module.scss";
import AnalysisList from "../../components/FeatureSection/AnalysisList/AnalysisList";
import AgentsSection from "../../components/AgentsSection/AgentsSection";
import TestimonialsSection from "../../components/TestimonialSection/TestimonialSection";
import Footer from "../../components/Footer/Footer";

export default function Home() {
  return (
    <>
      <div className={styles.home}>
        <Hero />
        <FeatureSection
          icon={<TrendingUp />}
          iconBgColor="#fec841"
          title="Analisi accurata del mercato"
          text="I nostri periti certificati utilizzano algoritmi avanzati e
            dati di mercato aggiornati per fornire la valutazione più precisa della
            tua proprietà nella tua zona."
          bcgColor="white"
          image="/img/feature1.jpg"
          reverse={false}
        >
          <StatsBlock
            items={[
              { value: "98%", label: "Tasso di accuratezza" },
              { value: "25K+", label: "Proprietà analizzate" },
            ]}
          />
        </FeatureSection>

        <FeatureSection
          icon={<Clock3 color="#fec841" />}
          iconBgColor="#3b0000"
          title="Risultati immediati"
          text="Nessuna attesa, nessun appuntamento necessario.
Ricevi subito il tuo rapporto di valutazione immobiliare via email, completo di approfondimenti dettagliati sul mercato."
          bcgColor="#FFF8DF"
          image="/img/feature1.jpg"
          reverse={true}
        >
          <ProgressCard
            label="Tempo di elaborazione"
            value="< 72 ore"
            progress={80} // width
            color="#a5dbff" // color
          />
        </FeatureSection>

        <FeatureSection
          icon={<ClipboardList color="#3b0000" />}
          iconBgColor="#fec841"
          title="Rapporti dettagliati"
          text="Report di valutazione completi che includono vendite comparabili, analisi del quartiere e tendenze di mercato
per aiutarti a prendere decisioni informate."
          bcgColor="white"
          image="/img/feature1.jpg"
          reverse={true}
        >
          <AnalysisList
  items={[
    {
      icon: <House />,
      text: "Analisi delle caratteristiche dell’immobile",
    },
    {
      icon: <MapPin />,
      text: "Confronto con il quartiere",
    },
    {
      icon: <TrendingUp />,
      text: "Approfondimento delle tendenze di mercato",
    },
  ]}
/>
        </FeatureSection>
        <AgentsSection />
        <TestimonialsSection />
        <Footer />
      </div>
    </>
  );
}
