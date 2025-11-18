import { FileText } from 'lucide-react';

const QuickAccess = ({ onNavigateToContracts }) => {
  const actions = [
    {
      id: 1,
      icon: <FileText size={20} />,
      title: 'Visualizza contratti',
      description: '',
      color: 'orange',
      onClick: onNavigateToContracts
    }
  ];

  return (
    <div className="quick-access">
      <div className="card-header">
        <h2>Accesso Rapido</h2>
      </div>

      <div className="quick-actions-grid">
        {actions.map((action) => (
          <div key={action.id} className={`quick-action-card ${action.color}`} onClick={action.onClick}>
            <div className="action-icon">
              {action.icon}
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
