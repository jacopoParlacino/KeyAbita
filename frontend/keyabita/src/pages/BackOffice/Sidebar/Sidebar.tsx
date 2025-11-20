import { useState } from "react";
import styles from "./Sidebar.module.scss";

import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart2,
  Settings,
} from "lucide-react";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard /> },
  { id: "valutazioni", label: "Valutazioni", icon: <FileText /> },
  { id: "clienti", label: "Clienti", icon: <Users /> },
  { id: "reports", label: "Reports", icon: <BarChart2 /> },
  { id: "impostazioni", label: "Impostazioni", icon: <Settings /> },
];

const Sidebar = () => {
  const [active, setActive] = useState("dashboard");

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="/KeyAbita_Logo.svg" alt="KeyAbita logo" />
      </div>

      <nav>
        <ul className={styles.nav}>
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`${styles.item} ${
                active === item.id ? styles.active : ""
              }`}
              onClick={() => setActive(item.id)}
            >
              <span className={styles.icon}>{item.icon}</span>
              {item.label}
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.user}>
        <span>Admin</span>
      </div>
    </aside>
  );
};

export default Sidebar;

