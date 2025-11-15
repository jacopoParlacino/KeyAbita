const RecentEvaluations = () => {
  const evaluations = [
    {
      id: 1,
      property: 'Appartamento Centro',
      client: 'Mario Rossi',
      date: '15/11/2025',
      status: 'Completata',
      value: '€ 250.000'
    },
    {
      id: 2,
      property: 'Villa Collina',
      client: 'Laura Bianchi',
      date: '14/11/2025',
      status: 'In corso',
      value: '€ 450.000'
    },
    {
      id: 3,
      property: 'Ufficio Zona Ind.',
      client: 'Paolo Verdi',
      date: '13/11/2025',
      status: 'Completata',
      value: '€ 180.000'
    },
    {
      id: 4,
      property: 'Negozio Via Roma',
      client: 'Giulia Neri',
      date: '12/11/2025',
      status: 'In attesa',
      value: '€ 320.000'
    }
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Completata':
        return 'status-completed';
      case 'In corso':
        return 'status-progress';
      case 'In attesa':
        return 'status-pending';
      default:
        return '';
    }
  };

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
              <th>Immobile</th>
              <th>Cliente</th>
              <th>Data</th>
              <th>Stato</th>
              <th>Valore</th>
            </tr>
          </thead>
          <tbody>
            {evaluations.map((evaluation) => (
              <tr key={evaluation.id}>
                <td className="property-name">{evaluation.property}</td>
                <td>{evaluation.client}</td>
                <td>{evaluation.date}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(evaluation.status)}`}>
                    {evaluation.status}
                  </span>
                </td>
                <td className="value">{evaluation.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentEvaluations;
