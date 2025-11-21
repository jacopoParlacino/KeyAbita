import React from 'react';
import { Search } from 'lucide-react';
import './ValuationViewSearch.module.scss';

interface ValuationViewSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const ValuationViewSearch: React.FC<ValuationViewSearchProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="valuation-view-search">
      <div className="search-bar">
        <Search size={20} />
        <input
          type="text"
          placeholder="Cerca per indirizzo o città..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ValuationViewSearch;
