import React, { useState, useEffect } from 'react';
import './ImpostazioniAdmin.css';
import ApiService from '../../services/api';
import { Settings, Users, Key, Save, AlertCircle, CheckCircle, Eye, EyeOff, Shield } from 'lucide-react';

const ImpostazioniAdmin = () => {
  const [activeTab, setActiveTab] = useState('agenti');
  const [agenti, setAgenti] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showPassword, setShowPassword] = useState({});

  // Stati per gestione permessi
  const [selectedAgente, setSelectedAgente] = useState(null);
  const [permessiAgente, setPermessiAgente] = useState({});
  const [showPermessiModal, setShowPermessiModal] = useState(false);

  // Stati per il reset password
  const [resetPassword, setResetPassword] = useState({
    utenteId: null,
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (activeTab === 'agenti') {
      loadAgenti();
    }
  }, [activeTab]);

  const loadAgenti = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getAllAgenti();
      setAgenti(data || []);
    } catch (err) {
      showMessage('Errore nel caricamento degli agenti', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadPermessiAgente = async (agenteId) => {
    try {
      setLoading(true);
      const permessi = await ApiService.getPermessiAgente(agenteId);
      setPermessiAgente(permessi || {});
    } catch (err) {
      showMessage('Errore nel caricamento dei permessi', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePermessiClick = async (agente) => {
    setSelectedAgente(agente);
    await loadPermessiAgente(agente.id);
    setShowPermessiModal(true);
  };

  const handlePermessoToggle = (modulo, permesso, value) => {
    setPermessiAgente(prev => ({
      ...prev,
      [modulo]: {
        ...prev[modulo],
        [permesso]: value
      }
    }));
  };

  const savePermessi = async () => {
    if (!selectedAgente) return;

    try {
      setLoading(true);
      await ApiService.updatePermessiAgente(selectedAgente.id, permessiAgente);
      showMessage(`Permessi aggiornati per ${selectedAgente.nome} ${selectedAgente.cognome}`, 'success');
      setShowPermessiModal(false);
    } catch (err) {
      showMessage('Errore nel salvataggio dei permessi', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type = 'info') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  const handleResetPassword = async (utenteId) => {
    if (!resetPassword.newPassword || resetPassword.newPassword !== resetPassword.confirmPassword) {
      showMessage('Le password non corrispondono o sono vuote', 'error');
      return;
    }

    if (resetPassword.newPassword.length < 6) {
      showMessage('La password deve essere di almeno 6 caratteri', 'error');
      return;
    }

    try {
      setLoading(true);
      await ApiService.resetPassword(utenteId, resetPassword.newPassword);
      showMessage('Password resettata con successo', 'success');
      setResetPassword({ utenteId: null, newPassword: '', confirmPassword: '' });
    } catch (err) {
      showMessage('Errore nel reset password', 'error');
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('it-IT');
    } catch {
      return 'N/A';
    }
  };

  return (
    <div className="impostazioni-admin">
      <div className="impostazioni-header">
        <div className="header-title">
          <Settings className="header-icon" />
          <h2>Impostazioni Amministratore</h2>
        </div>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="impostazioni-content">
        <div className="tabs-container">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'agenti' ? 'active' : ''}`}
              onClick={() => setActiveTab('agenti')}
            >
              <Users size={20} />
              Gestione Agenti
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'agenti' && (
              <div className="agenti-management">
                <div className="section-header">
                  <h3>Lista Agenti</h3>
                  <p>Gestisci gli agenti immobiliari e resetta le loro password</p>
                </div>

                {loading ? (
                  <div className="loading">
                    <div className="loading-spinner"></div>
                    <p>Caricamento...</p>
                  </div>
                ) : agenti.length === 0 ? (
                  <div className="no-data">
                    <Users className="no-data-icon" />
                    <h3>Nessun agente trovato</h3>
                    <p>Non ci sono agenti registrati nel sistema.</p>
                  </div>
                ) : (
                  <div className="agenti-table-container">
                    <table className="agenti-table">
                      <thead>
                        <tr>
                          <th>Agente</th>
                          <th>Contatti</th>
                          <th>Data Creazione</th>
                          <th>Azioni</th>
                        </tr>
                      </thead>
                      <tbody>
                        {agenti.map((agente) => (
                          <tr key={agente.id} className="agente-row">
                            <td className="agente-info">
                              <div className="agente-avatar">
                                {(agente.nome?.[0] || '') + (agente.cognome?.[0] || '')}
                              </div>
                              <div className="agente-details">
                                <div className="agente-nome">
                                  {agente.nome || 'N/A'} {agente.cognome || ''}
                                </div>
                                <div className="agente-ruolo">Agente Immobiliare</div>
                              </div>
                            </td>
                            <td className="contatti-info">
                              <div className="contatto-item">
                                📧 {agente.email || 'N/A'}
                              </div>
                              <div className="contatto-item">
                                📱 {agente.telefono || 'N/A'}
                              </div>
                            </td>
                            <td className="data-cell">
                              {formatDate(agente.dataCreazione)}
                            </td>
                            <td className="actions-cell">
                              <div className="action-buttons">
                                <button
                                  className="reset-password-btn"
                                  onClick={() => setResetPassword({ ...resetPassword, utenteId: agente.id })}
                                  disabled={loading}
                                >
                                  <Key size={16} />
                                  Reset Password
                                </button>
                                <button
                                  className="permessi-btn"
                                  onClick={() => handlePermessiClick(agente)}
                                  disabled={loading}
                                >
                                  <Shield size={16} />
                                  Permessi
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Modal Reset Password */}
                {resetPassword.utenteId && (
                  <div className="modal-overlay">
                    <div className="modal">
                      <div className="modal-header">
                        <h3>Reset Password</h3>
                        <button 
                          className="close-btn"
                          onClick={() => setResetPassword({ utenteId: null, newPassword: '', confirmPassword: '' })}
                        >
                          ×
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="form-group">
                          <label>Nuova Password:</label>
                          <div className="password-input-container">
                            <input
                              type={showPassword.new ? 'text' : 'password'}
                              value={resetPassword.newPassword}
                              onChange={(e) => setResetPassword({ ...resetPassword, newPassword: e.target.value })}
                              placeholder="Inserisci nuova password"
                              minLength="6"
                            />
                            <button
                              type="button"
                              className="toggle-password"
                              onClick={() => toggleShowPassword('new')}
                            >
                              {showPassword.new ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Conferma Password:</label>
                          <div className="password-input-container">
                            <input
                              type={showPassword.confirm ? 'text' : 'password'}
                              value={resetPassword.confirmPassword}
                              onChange={(e) => setResetPassword({ ...resetPassword, confirmPassword: e.target.value })}
                              placeholder="Conferma nuova password"
                              minLength="6"
                            />
                            <button
                              type="button"
                              className="toggle-password"
                              onClick={() => toggleShowPassword('confirm')}
                            >
                              {showPassword.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          className="cancel-btn"
                          onClick={() => setResetPassword({ utenteId: null, newPassword: '', confirmPassword: '' })}
                        >
                          Annulla
                        </button>
                        <button
                          className="save-btn"
                          onClick={() => handleResetPassword(resetPassword.utenteId)}
                          disabled={loading}
                        >
                          <Save size={16} />
                          Reset Password
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Modal Gestione Permessi */}
                {showPermessiModal && selectedAgente && (
                  <div className="modal-overlay">
                    <div className="modal permessi-modal">
                      <div className="modal-header">
                        <h3>Permessi per {selectedAgente.nome} {selectedAgente.cognome}</h3>
                        <button 
                          className="close-btn"
                          onClick={() => setShowPermessiModal(false)}
                        >
                          ×
                        </button>
                      </div>
                      <div className="modal-body permessi-body">
                        <p className="permessi-description">
                          Configura i permessi che l'agente può visualizzare e utilizzare nel sistema.
                        </p>
                        
                        <div className="permessi-grid">
                          {Object.entries(permessiAgente).map(([modulo, permessi]) => (
                            <div key={modulo} className="modulo-section">
                              <div className="modulo-header">
                                <h4 className="modulo-title">
                                  {modulo.charAt(0).toUpperCase() + modulo.slice(1)}
                                </h4>
                                <div className="modulo-toggle">
                                  <label className="toggle-label">
                                    <input
                                      type="checkbox"
                                      checked={permessi.visualizza || false}
                                      onChange={(e) => handlePermessoToggle(modulo, 'visualizza', e.target.checked)}
                                      className="toggle-checkbox"
                                    />
                                    <span className="toggle-slider"></span>
                                    <span className="toggle-text">
                                      {permessi.visualizza ? 'Abilitato' : 'Disabilitato'}
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          className="cancel-btn"
                          onClick={() => setShowPermessiModal(false)}
                        >
                          Annulla
                        </button>
                        <button
                          className="save-btn"
                          onClick={savePermessi}
                          disabled={loading}
                        >
                          <Save size={16} />
                          Salva Permessi
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpostazioniAdmin;