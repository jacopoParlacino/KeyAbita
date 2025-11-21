import React from 'react';
import { Search } from 'lucide-react';
import './ValuationSearch.module.scss';

interface ValuationSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  resultCount: number;
  totalCount: number;
}

const ValuationSearch: React.FC<ValuationSearchProps> = ({
  searchTerm,
  onSearchChange,
  resultCount,
  totalCount,
}) => {
  return (
    <div className="valuation-search">
      <div className="search-bar">
        <Search size={20} />
        <input
          type="text"
          placeholder="Cerca per indirizzo o città..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="search-results">
        <span>Mostrando {resultCount} di {totalCount} valutazioni</span>
      </div>
    </div>
  );
};

export default ValuationSearch;
