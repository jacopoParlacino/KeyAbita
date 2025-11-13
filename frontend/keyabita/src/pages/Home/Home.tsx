import {
  TrendingUp,
  Clock3,
  ClipboardList,
  House,
  MapPin,
  Check,
} from "lucide-react";
import Hero from "../../components/Hero/Hero";
import FeatureSection from "../../components/FeatureSection/FeatureSection";
import StatsBlock from "../../components/FeatureSection/StatsBlock/StatsBlock";
import ProgressCard from "../../components/FeatureSection/ProgressCard/ProgressCard";
import styles from "./Home.module.scss";
import AnalysisList from "../../components/FeatureSection/AnalysisList/AnalysisList";
import AgentsSection from "../../components/AgentsSection/AgentsSection";
import TestimonialsSection from "../../components/TestimonialSection/TestimonialSection";
import Footer from "../../components/Footer/Footer";
import useIsDesktop from "../../hooks/useIsDesktop";
import AnalysisListDesktop from "../../components/FeatureSection/AnalysisListDesktop/AnalysisListDesktop";

export default function Home() {
  const isDesktop = useIsDesktop();
  return (
    <>
      <div className={styles.home}>
        <Hero />

        {/* First Feature Section */}
        <FeatureSection
          icon={<TrendingUp />}
          iconBgColor="#fec841"
          title="Analisi accurata del mercato"
          text="I nostri periti certificati utilizzano algoritmi avanzati e
            dati di mercato aggiornati per fornire la valutazione più precisa della
            tua proprietà nella tua zona."
          bcgColor="white"
          image="/img/agenti-immobiliari-consulenza-analisi-mercato"
          reverse={true}
        >
          {isDesktop ? (
            <AnalysisListDesktop
              items={[
                { icon: <Check />, text: "Ricerca di mercato completa" },
                { icon: <Check />, text: "Dati immobiliari in tempo reale" },
                { icon: <Check />, text: "Certificazione professionale" },
              ]}
            />
          ) : (
            <StatsBlock
              items={[
                { value: "98%", label: "Tasso di accuratezza" },
                { value: "25K+", label: "Proprietà analizzate" },
              ]}
            />
          )}
        </FeatureSection>

        {/* Second Feature Section */}

        <FeatureSection
          icon={<Clock3 color="#fec841" />}
          iconBgColor="#3b0000"
          title={
            isDesktop ? "Servizio rapido e affidabile" : "Risultati immediati"
          }
          text={
            isDesktop
              ? "Ricevi il tuo rapporto di valutazione della proprietà entro 72 ore. Il nostro processo snello garantisce tempi rapidi senza compromettere l’accuratezza."
              : "Nessuna attesa, nessun appuntamento necessario. Ricevi subito il tuo rapporto di valutazione immobiliare via email, completo di approfondimenti dettagliati sul mercato."
          }
          bcgColor="#FFF8DF"
          image="/img/valutazione-immobile-online-smartphone"
          reverse={false}
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
          image="/img/rapporti-dettagliati-valutazione-immobiliare"
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
