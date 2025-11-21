import React from 'react';
import { Users, Mail, Phone, Calendar, User } from 'lucide-react';
import type { Utente } from '../../../types/Utente';
import './ClientTable.module.scss';

interface ClientTableProps {
  clienti: Utente[];
  isLoading?: boolean;
}

const ClientTable: React.FC<ClientTableProps> = ({ clienti, isLoading = false }) => {
  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('it-IT');
    } catch {
      return 'N/A';
    }
  };

  if (clienti.length === 0 && !isLoading) {
    return (
      <div className="no-results">
        <Users className="no-results-icon" />
        <h3>Nessun cliente trovato</h3>
        <p>Non ci sono clienti che corrispondono ai criteri di ricerca.</p>
      </div>
    );
  }

  return (
    <div className="client-table-container">
      <table className="client-table">
        <thead>
          <tr>
            <th><User className="th-icon" /> Cliente</th>
            <th><Mail className="th-icon" /> Contatti</th>
            <th>Ruolo</th>
            <th><Calendar className="th-icon" /> Data Creazione</th>
          </tr>
        </thead>
        <tbody>
          {clienti.map((cliente) => (
            <tr key={cliente.id} className="client-row">
              <td className="client-info">
                <div className="client-avatar">
                  {(cliente.nome?.[0] || '') + (cliente.cognome?.[0] || '')}
                </div>
                <div className="client-details">
                  <div className="client-name">
                    {cliente.nome || 'N/A'} {cliente.cognome || ''}
                  </div>
                </div>
              </td>
              <td className="contacts-info">
                <div className="contact-item">
                  <Mail className="contact-icon" />
                  <span>{cliente.email || 'N/A'}</span>
                </div>
                <div className="contact-item">
                  <Phone className="contact-icon" />
                  <span>{cliente.telefono || 'N/A'}</span>
                </div>
              </td>
              <td className="role-cell">
                <span className={`role-badge ${cliente.ruolo?.nome?.toLowerCase() || 'default'}`}>
                  {cliente.ruolo?.nome || 'N/A'}
                </span>
              </td>
              <td className="date-cell">
                <div className="date-container">
                  <Calendar className="date-icon" />
                  <span>{formatDate(cliente.dataCreazione)}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
