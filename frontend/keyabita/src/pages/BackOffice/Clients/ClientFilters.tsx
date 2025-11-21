import React from 'react';
import { Search, Filter } from 'lucide-react';
import './ClientFilters.module.scss';

interface ClientFiltersProps {
  searchTerm: string;
  selectedRuolo: string;
  ruoliUnici: string[];
  onSearchChange: (term: string) => void;
  onRuoloChange: (ruolo: string) => void;
}

const ClientFilters: React.FC<ClientFiltersProps> = ({
  searchTerm,
  selectedRuolo,
  ruoliUnici,
  onSearchChange,
  onRuoloChange,
}) => {
  return (
    <div className="client-filters">
      <div className="search-box">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Cerca per nome, cognome, email o telefono..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-group">
        <Filter className="filter-icon" />
        <select
          value={selectedRuolo}
          onChange={(e) => onRuoloChange(e.target.value)}
          className="filter-select"
        >
          <option value="">Tutti i ruoli</option>
          {ruoliUnici.map(ruolo => (
            <option key={ruolo} value={ruolo}>{ruolo}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ClientFilters;
