import { useState, useEffect } from "react";
import { Home, Car, TreePine } from "lucide-react";
import { ContrattiApi } from "../../../services";
import type { Contratto } from "../../../types/Contratto";
import styles from "./AllContracts.module.scss";

const AllContracts = () => {
  const [contracts, setContracts] = useState<Contratto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const data = await ContrattiApi.getAll();
        setContracts(data);
      } catch (err) {
        console.error("Error fetching contracts:", err);
        setError("Errore nel caricamento dei contratti");
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  const formatDate = (date?: string | null) =>
    date ? new Date(date).toLocaleDateString("it-IT") : "N/A";

  const getStatusClass = (stato?: string) => {
    switch (stato) {
      case "attivo":
      case "firmato":
      case "concluso":
        return styles.statusCompleted;
      case "in_preparazione":
        return styles.statusProgress;
      case "annullato":
        return styles.statusPending;
      default:
        return "";
    }
  };

  const stateMap: Record<string, string> = {
    in_preparazione: "In preparazione",
    firmato: "Firmato",
    attivo: "Attivo",
    concluso: "Concluso",
    annullato: "Annullato",
  };

  if (loading) return (
    <div className={styles.allContracts}>
      <div className={styles.loading}>Caricamento contratti…</div>
    </div>
  );

  if (error) return (
    <div className={styles.allContracts}>
      <div className={styles.error}>{error}</div>
    </div>
  );

  return (
    <div className={styles.allContracts}>
      <div className={styles.pageHeader}>
        <h1>Tutti i Contratti</h1>
        <p>Visualizza tutti i contratti presenti nel database</p>
      </div>

      <div className={styles.contractsGrid}>
        {contracts.map((contract) => {
          const stato = contract.statoContratto?.nome ?? "";

          return (
            <div key={contract.id} className={styles.contractCard}>
              <div className={styles.contractHeader}>
                <h3>Contratto #{contract.id}</h3>
                <span
                  className={`${styles.statusBadge} ${getStatusClass(stato)}`}
                >
                  {stateMap[stato] || stato || "N/A"}
                </span>
              </div>

              <div className={styles.contractDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Cliente:</span>
                  <span className={styles.value}>
                    {contract.richiesta
                      ? `${contract.richiesta.nome} ${contract.richiesta.cognome}`
                      : "Non specificato"}
                  </span>
                </div>

                <div className={styles.detailRow}>
                  <span className={styles.label}>CAP:</span>
                  <span className={styles.value}>
                    {contract.richiesta?.immobile?.cap || "N/A"}
                  </span>
                </div>

                <div className={styles.detailRow}>
                  <span className={styles.label}>Città:</span>
                  <span className={styles.value}>
                    {contract.richiesta?.immobile?.citta?.nome || "N/A"}
                  </span>
                </div>

                <div className={styles.detailRow}>
                  <span className={styles.label}>Data inizio:</span>
                  <span className={styles.value}>
                    {formatDate(contract.inizioContratto)}
                  </span>
                </div>

                <div className={styles.detailRow}>
                  <span className={styles.label}>Data fine:</span>
                  <span className={styles.value}>
                    {formatDate(contract.fineContratto)}
                  </span>
                </div>
              </div>

              <div className={styles.propertyFeatures}>
                {contract.richiesta?.immobile?.balconi && (
                  <span className={styles.feature}>
                    <Home size={14} /> Balcone
                  </span>
                )}
                {contract.richiesta?.immobile?.garage && (
                  <span className={styles.feature}>
                    <Car size={14} /> Garage
                  </span>
                )}
                {contract.richiesta?.immobile?.giardino && (
                  <span className={styles.feature}>
                    <TreePine size={14} /> Giardino
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllContracts;
