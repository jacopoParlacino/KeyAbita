const QuickAccess = () => {
  const actions = [
    {
      id: 1,
      icon: '➕',
      title: 'Nuova Valutazione',
      description: 'Crea una nuova valutazione immobiliare',
      color: 'blue'
    },
    {
      id: 2,
      icon: '🏠',
      title: 'Aggiungi Immobile',
      description: 'Inserisci un nuovo immobile nel sistema',
      color: 'green'
    },
    {
      id: 3,
      icon: '👤',
      title: 'Nuovo Cliente',
      description: 'Registra un nuovo cliente',
      color: 'orange'
    },
    {
      id: 4,
      icon: '📊',
      title: 'Genera Report',
      description: 'Crea un report personalizzato',
      color: 'purple'
    }
  ];

  return (
    <div className="quick-access">
      <div className="card-header">
        <h2>Accesso Rapido</h2>
      </div>

      <div className="quick-actions-grid">
        {actions.map((action) => (
          <div key={action.id} className={`quick-action-card ${action.color}`}>
            <div className="action-icon">
              <span>{action.icon}</span>
            </div>
            <h3 className="action-title">{action.title}</h3>
            <p className="action-description">{action.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickAccess;
