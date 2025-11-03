import { Helmet } from "react-helmet";
import Hero from "../../components/Hero/Hero";

import styles from "./Home.module.scss";

export default function Home() {
  return (
    <>
    <Helmet>
      <title>Keyabita</title>
      <meta name="description" content="Keyabit. Valutazione immobiliare da esperti certificati." />
      <meta name="keywords" content="immobile, valutazione, immobiliare" />
    </Helmet>
    <section>
      <div className={styles.home}>

          <Hero />



      </div>



    </section>
    </>
  );
}