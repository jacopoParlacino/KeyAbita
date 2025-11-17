import './Sidebar.css';
import Logo from './Logo';
import { BarChart3, FileText, Users, Settings } from 'lucide-react';

const Sidebar = ({ currentView, onNavigate }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Logo size="large" variant="icon-only" />
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => onNavigate('dashboard')}>
            <i className="icon"><BarChart3 size={20} /></i>
            <span>Dashboard</span>
          </li>
          <li className={`nav-item ${currentView === 'valutazioni-manager' ? 'active' : ''}`} onClick={() => onNavigate('valutazioni-manager')}>
            <i className="icon"><FileText size={20} /></i>
            <span>Valutazioni</span>
          </li>
          <li className={`nav-item ${currentView === 'clienti' ? 'active' : ''}`} onClick={() => onNavigate('clienti')}>
            <i className="icon"><Users size={20} /></i>
            <span>Clienti</span>
          </li>
          <li className={`nav-item ${currentView === 'contracts' ? 'active' : ''}`} onClick={() => onNavigate('contracts')}>
            <i className="icon"><FileText size={20} /></i>
            <span>Visualizza contratti</span>
          </li>
          <li className={`nav-item ${currentView === 'impostazioni' ? 'active' : ''}`} onClick={() => onNavigate('impostazioni')}>
            <i className="icon"><Settings size={20} /></i>
            <span>Impostazioni</span>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">A</div>
          <div className="user-details">
            <p className="user-name">Admin</p>
            <p className="user-role">Amministratore</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
