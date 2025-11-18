import styles from "./RecentEvaluations.module.scss";

const evaluations = [
  { indirizzo: "Via Jacopo Durandi 10", prezzo: "129,400 €", data: "24/10/2025", tipo: "Casa", stanze: 5, bagni: 2 },
  { indirizzo: "Piazza Castello 31", prezzo: "400,790 €", data: "12/10/2025", tipo: "Appartamento", stanze: 2, bagni: 1 },
  { indirizzo: "Corso Sebastopoli 114", prezzo: "249,550 €", data: "10/10/2025", tipo: "Appartamento", stanze: 3, bagni: 2 },
];

const RecentEvaluations = () => {
  return (
    <div className={styles.recent}>
      <h3>Ultime valutazioni</h3>
      <table>
        <thead>
          <tr>
            <th>Indirizzo</th>
            <th>Prezzo</th>
            <th>Data</th>
            <th>Tipo</th>
            <th>Stanze</th>
            <th>Bagni</th>
          </tr>
        </thead>
        <tbody>
          {evaluations.map((item, idx) => (
            <tr key={idx}>
              <td>{item.indirizzo}</td>
              <td>{item.prezzo}</td>
              <td>{item.data}</td>
              <td>{item.tipo}</td>
              <td>{item.stanze}</td>
              <td>{item.bagni}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentEvaluations;
