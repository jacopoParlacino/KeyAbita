import type { FC, ReactNode } from 'react';
import { FileText } from 'lucide-react';
import styles from './QuickAccess.module.scss';

interface QuickAccessProps {
  onNavigateToContracts: () => void;
}

interface Action {
  id: number;
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
  onClick: () => void;
}

const QuickAccess: FC<QuickAccessProps> = ({ onNavigateToContracts }) => {
  const actions: Action[] = [
    {
      id: 1,
      icon: <FileText size={20} />,
      title: 'Visualizza contratti',
      description: '',
      color: 'orange',
      onClick: onNavigateToContracts,
    },
  ];

  return (
    <div className={styles.quickAccess}>
      <div className={styles.cardHeader}>
        <h2>Accesso Rapido</h2>
      </div>

      <div className={styles.quickActionsGrid}>
        {actions.map((action) => (
          <div
            key={action.id}
            className={`${styles.quickActionCard} ${styles[action.color]}`}
            onClick={action.onClick}
          >
            <div className={styles.actionIcon}>{action.icon}</div>
            <h3 className={styles.actionTitle}>{action.title}</h3>
            <p className={styles.actionDescription}>{action.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickAccess;
