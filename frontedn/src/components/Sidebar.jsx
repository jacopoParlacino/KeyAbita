import './Sidebar.css';
import Logo from './Logo';
import { BarChart3, FileText, Users, TrendingUp, Settings } from 'lucide-react';

const Sidebar = ({ currentView, onNavigate }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Logo size="large" variant="full" />
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => onNavigate('dashboard')}>
            <i className="icon"><BarChart3 size={20} /></i>
            <span>Dashboard</span>
          </li>
          <li className="nav-item">
            <i className="icon"><FileText size={20} /></i>
            <span>Valutazioni</span>
          </li>
          <li className="nav-item">
            <i className="icon"><Users size={20} /></i>
            <span>Clienti</span>
          </li>
          <li className={`nav-item ${currentView === 'contracts' ? 'active' : ''}`} onClick={() => onNavigate('contracts')}>
            <i className="icon"><FileText size={20} /></i>
            <span>Visualizza contratti</span>
          </li>
          <li className="nav-item">
            <i className="icon"><TrendingUp size={20} /></i>
            <span>Reports</span>
          </li>
          <li className="nav-item">
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
