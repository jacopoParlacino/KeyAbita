import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import styles from "./Sidebar.module.scss";

import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard />, path: "/dashboard" },
  { id: "valutazioni", label: "Valutazioni", icon: <FileText />, path: "/dashboard?tab=valutazioni" },
  { id: "clienti", label: "Clienti", icon: <Users />, path: "/dashboard?tab=clienti" },
  { id: "reports", label: "Reports", icon: <BarChart2 />, path: "/dashboard?tab=reports" },
  { id: "impostazioni", label: "Impostazioni", icon: <Settings />, path: "/dashboard?tab=impostazioni" },
];

const Sidebar = () => {
  const [active, setActive] = useState("dashboard");
  const navigate = useNavigate();
  const { admin, logout } = useAuth();

  const handleNavigation = (itemId: string, path: string) => {
    setActive(itemId);
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h2>KeyAbita</h2>
      </div>

      <nav>
        <ul className={styles.nav}>
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`${styles.item} ${
                active === item.id ? styles.active : ""
              }`}
              onClick={() => handleNavigation(item.id, item.path)}
              role="button"
              tabIndex={0}
            >
              <span className={styles.icon}>{item.icon}</span>
              {item.label}
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.user}>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{admin?.username || "User"}</span>
          <span className={styles.userRole}>{admin?.role || "agent"}</span>
        </div>
        <button 
          className={styles.logoutBtn} 
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

