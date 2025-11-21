import { useState, useEffect } from "react";
import { ContrattiApi } from "../../../services";
import type { Contratto } from "../../../types/Contratto";
import styles from "./AllContracts.module.scss";
import ContractGrid from "./ContractGrid";

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

      <ContractGrid contracts={contracts} isLoading={loading} />
    </div>
  );
};

export default AllContracts;
