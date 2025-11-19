import React from 'react';
import { Bell } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1>Dashboard</h1>
        <p className="header-subtitle">Benvenuto Admin! Ecco il riepilogo di valutazioni per te</p>
      </div>

      <div className="header-right">
        <button className="notification-btn">
          <Bell size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
