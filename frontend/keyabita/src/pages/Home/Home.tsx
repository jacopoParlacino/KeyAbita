import { Helmet } from "react-helmet";
import Hero from "../../components/Hero/Hero";

import styles from "./Home.module.scss";
import FeatureSection from "../../components/FeatureSection/FeatureSection";
import { TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Keyabita</title>
        <meta
          name="description"
          content="Keyabit. Valutazione immobiliare da esperti certificati."
        />
        <meta name="keywords" content="immobile, valutazione, immobiliare" />
      </Helmet>
      
        <div className={styles.home}>
          <Hero />
          <FeatureSection
          icon={<TrendingUp />}
            iconBgColor="#007bff"
            title="Analisi accurata del mercato"
            text="I nostri periti certificati utilizzano algoritmi avanzati e 
            dati di mercato aggiornati per fornire la valutazione più precisa della 
            tua proprietà nella tua zona."
            image="/img/feature1.jpg"
            reverse={false}
          />
        </div>
      
    </>
  );
}
