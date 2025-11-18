import { DollarSign, Building, Clock, TrendingUp as TrendingUpIcon } from 'lucide-react';

const StatsCard = ({ title, value, icon, trend, trendValue, color }) => {
  const getIcon = () => {
    switch(icon) {
      case '$': return <DollarSign size={24} />;
      case 'building': return <Building size={24} />;
      case 'clock': return <Clock size={24} />;
      case 'chart': return <TrendingUpIcon size={24} />;
      default: return <span>{icon}</span>;
    }
  };

  return (
    <div className={`stats-card ${color}`}>
      <div className="stats-icon">
        {getIcon()}
      </div>

      <div className="stats-content">
        <h3 className="stats-title">{title}</h3>
        <p className="stats-value">{value}</p>

        {trend && trendValue && (
          <div className={`stats-trend ${trend}`}>
            <span className="trend-icon">{trend === 'up' ? '↗️' : '↘️'}</span>
            <span className="trend-value">{trendValue}</span>
            {trendValue.includes('%') && <span className="trend-text">vs mese scorso</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
