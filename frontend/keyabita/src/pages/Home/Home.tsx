import {
  TrendingUp,
  Clock3,
  ClipboardList,
  House,
  MapPin,
  Check,
  ShieldCheck,
} from "lucide-react";
import Hero from "../../components/Hero/Hero";
import FeatureSection from "../../components/FeatureSection/FeatureSection";
import StatsBlock from "../../components/FeatureSection/StatsBlock/StatsBlock";
import ProgressCard from "../../components/FeatureSection/ProgressCard/ProgressCard";
import styles from "./Home.module.scss";
import AnalysisList from "../../components/FeatureSection/AnalysisList/AnalysisList";
import AgentsSection from "../../components/AgentsSection/AgentsSection";
import TestimonialsSection from "../../components/TestimonialSection/TestimonialSection";
import  Header  from '../../components/Header/Header';
import Footer from "../../components/Footer/Footer";
import useIsDesktop from "../../hooks/useIsDesktop";
import AnalysisListDesktop from "../../components/FeatureSection/AnalysisListDesktop/AnalysisListDesktop";
import StatsBlockDesktop from "../../components/FeatureSection/StatsBlockDesktop/StatsBlockDesktop";

export default function Home() {
  const isDesktop = useIsDesktop();
  return (
    <>
      <div className={styles.home}>
        <Header />
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
                { icon: <Check />, title: "Ricerca di mercato completa" },
                { icon: <Check />, title: "Dati immobiliari in tempo reale" },
                { icon: <Check />, title: "Certificazione professionale" },
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
          {isDesktop ? (
            <StatsBlockDesktop
              items={[
                {
                  icon: <Clock3 />,
                  title: "72 ore",
                  label: "Risultati rapidi",
                },
                { icon: <ShieldCheck />, title: "100%", label: "Garantito" },
              ]}
            />
          ) : (
            <ProgressCard
              label="Tempo di elaborazione"
              value="< 72 ore"
              progress={80} // width
              color="#a5dbff" // color
            />
          )}
        </FeatureSection>

        {/* Third Feature Section */}

        <FeatureSection
          icon={<ClipboardList color="#3b0000" />}
          iconBgColor="#fec841"
          title="Rapporti dettagliati"
          text={
            isDesktop
              ? "Ricevi rapporti di valutazione completi con confronti di mercato, analisi del quartiere e proiezioni di valore futuro."
              : "Report di valutazione completi che includono vendite comparabili, analisi del quartiere e tendenze di mercato per aiutarti a prendere decisioni informate."
          }
          bcgColor="white"
          image="/img/rapporti-dettagliati-valutazione-immobiliare"
          reverse={true}
        >

          { isDesktop ? (
            <AnalysisListDesktop
            items={[
              {icon: <TrendingUp />, title: "Tendenze di mercato", text: "Analisi attuale e prevista del mercato"},
              {icon: <House/>, title: "Dettagli della proprietà", text: "Valutazione completa della proprietà"}

            ]}
          />
        ) : (

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
        )

          }
        </FeatureSection>
        <AgentsSection />
        <TestimonialsSection />
        <Footer />
      </div>
    </>
  );
}
