import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ValutazioniApi } from "../../../services/index";
import Loading from "../Loading/Loading";
import ErrorMessage from "../Error/Error";

import styles from "./RecentEvaluations.module.scss";
import type { Valutazione } from "../../../types/Valutazione";


const RecentEvaluations = () => {
  const [evaluations, setEvaluations] = useState<Valutazione[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        setLoading(true);
        const data = await ValutazioniApi.getAll();
        setEvaluations(data.slice(0, 3)); // first three only
      } catch (err) {
        setError("Errore nel caricamento delle valutazioni");
        console.error("Error fetching evaluations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluations();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // --- Loading ---
  if (loading) {
    return <Loading title="Valutazioni Recenti" />;
  }

  // --- Error ---
  if (error) {
    return (
      <ErrorMessage
        title="Valutazioni Recenti"
        message={error}
      />
    );
  }

  return (
    <div className={styles.recent}>
      <h3>Valutazioni Recenti</h3>
      <button className="view-all-btn" onClick={() => navigate("/backoffice/valutazioni")}>
  Vedi tutte
</button>
      <table>
        <thead>
          <tr>
            <th>CAP</th>
            <th>Prezzo</th>
            <th>Data</th>
            <th>Tipo</th>
            <th>Stanze</th>
            <th>Bagni</th>
          </tr>
        </thead>
        <tbody>
          {evaluations.map((evaluation, idx) => (
            <tr key={idx}>
              <td>{evaluation.immobile?.cap ?? "N/A"}</td>
              <td>{formatCurrency(evaluation.valoreStimato)}</td>
              <td>{evaluation.dataCreazione ?? "N/A"}</td>
              <td>{evaluation.immobile?.numeroStanze ?? "N/A"}</td>
              <td>{evaluation.immobile?.numeroBagni ?? "N/A"}</td>


            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentEvaluations;
