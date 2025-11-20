import styles from "./Dashboard.module.scss";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import StatsCard from "./StatsCard/StatsCard";
import RecentEvaluations from "./RecentEvaluations/RecentEvaluations";
import ClientiViewer from "./Clients/ClientiViewer";
import ValutazioniManager from "./ValutazioniManager/ValutazioniManager";
// import QuickAccess from "./QuickAccess/QuickAccess";
import { DollarSign, Home, Clock, FileText } from "lucide-react";
import ValutazioniViewer from "./ValutazioniViewer/ValutazioniViewer";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <main className={styles.main}>
        <Header />
        <div className={styles.statsGrid}>
          <StatsCard title="Prezzo medio" value="€327k" icon={<DollarSign />} />
          <StatsCard title="Immobili Totale" value="1,278" icon={<Home />} />
          <StatsCard title="Da completare" value="21" icon={<Clock />} />
          <StatsCard title="Valutazioni" value="79" icon={<FileText />} />
        </div>
        <div className={styles.bottomSection}>
          <RecentEvaluations />
          <ClientiViewer></ClientiViewer>
          <ValutazioniManager></ValutazioniManager>
          <ValutazioniViewer></ValutazioniViewer>
          {/* <QuickAccess /> */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
