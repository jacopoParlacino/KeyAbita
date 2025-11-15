const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1>Dashboard</h1>
        <p className="header-subtitle">Benvenuto nel pannello di controllo</p>
      </div>

      <div className="header-right">
        <div className="search-box">
          <input type="text" placeholder="Cerca..." />
          <i className="search-icon">🔍</i>
        </div>

        <button className="notification-btn">
          <span className="notification-icon">🔔</span>
          <span className="notification-badge">3</span>
        </button>

        <button className="profile-btn">
          <span className="profile-icon">👤</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
