import styles from "./Sidebar.module.scss";
import { LayoutDashboard, FileText, Users, BarChart2, Settings } from "lucide-react";



const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}><img src="/KeyAbita_Logo.svg" alt="KeyAbita logo" /></div>
      <nav>
        <ul>
          <li className={styles.active}><LayoutDashboard />Dashboard</li>
          <li><FileText /> Valutazioni</li>
          <li><Users /> Clienti</li>
          <li><BarChart2 /> Reports</li>
          <li><Settings /> Impostazioni</li>
        </ul>
      </nav>
      <div className={styles.user}>
        <span>Admin</span>
      </div>
    </aside>
  );
};

export default Sidebar;
