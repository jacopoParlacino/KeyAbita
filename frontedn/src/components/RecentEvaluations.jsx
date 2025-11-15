const RecentEvaluations = () => {
  const evaluations = [
    {
      id: 1,
      indirizzo: 'Via Jacopo Duranti 45',
      prezzo: '124.000 €',
      data: '25/11/2023',
      tipo: 'Casa',
      stanze: '5',
      bagni: '2'
    },
    {
      id: 2,
      indirizzo: 'Piazza Castello 3',
      prezzo: '400.300 €',
      data: '14/09/2023',
      tipo: 'Appartamento',
      stanze: '2',
      bagni: '1'
    },
    {
      id: 3,
      indirizzo: 'Corso Indipendenza 114',
      prezzo: '349.500 €',
      data: '19/09/2023',
      tipo: 'Appartamento',
      stanze: '3',
      bagni: '2'
    }
  ];

  return (
    <div className="recent-evaluations">
      <div className="card-header">
        <h2>Valutazioni Recenti</h2>
        <button className="view-all-btn">Vedi tutte</button>
      </div>

      <div className="evaluations-table">
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
            {evaluations.map((evaluation) => (
              <tr key={evaluation.id}>
                <td className="property-name">{evaluation.indirizzo}</td>
                <td className="value">{evaluation.prezzo}</td>
                <td>{evaluation.data}</td>
                <td>{evaluation.tipo}</td>
                <td>{evaluation.stanze}</td>
                <td>{evaluation.bagni}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentEvaluations;
