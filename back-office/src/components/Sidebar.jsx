import './Sidebar.css';
import Logo from './Logo';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Logo size="medium" variant="full" />
        <p className="sidebar-subtitle">Back Office</p>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li className="nav-item active">
            <i className="icon">📊</i>
            <span>Dashboard</span>
          </li>
          <li className="nav-item">
            <i className="icon">📝</i>
            <span>Valutazioni</span>
          </li>
          <li className="nav-item">
            <i className="icon">🏠</i>
            <span>Immobili</span>
          </li>
          <li className="nav-item">
            <i className="icon">👥</i>
            <span>Clienti</span>
          </li>
          <li className="nav-item">
            <i className="icon">📈</i>
            <span>Report</span>
          </li>
          <li className="nav-item">
            <i className="icon">⚙️</i>
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
