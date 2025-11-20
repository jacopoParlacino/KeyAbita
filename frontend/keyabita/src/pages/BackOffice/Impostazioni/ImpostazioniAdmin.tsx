// import React, { useState, useEffect } from 'react';
// import './ImpostazioniAdmin.scss';
// import { UtentiApi, PermessiAgente } from '../../../services';
// import type { Utente } from '../../../types/Utente';
// import { Settings, Users, Key, Save, AlertCircle, CheckCircle, Eye, EyeOff, Shield } from 'lucide-react';

// interface Message {
//   text: string;
//   type: 'success' | 'error' | 'info' | '';
// }

// interface ShowPassword {
//   [key: string]: boolean;
// }

// interface ResetPasswordState {
//   utenteId: number | null;
//   newPassword: string;
//   confirmPassword: string;
// }

// type TabType = 'agenti';

// const ImpostazioniAdmin: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<TabType>('agenti');
//   const [agenti, setAgenti] = useState<Utente[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [message, setMessage] = useState<Message>({ text: '', type: '' });
//   const [showPassword, setShowPassword] = useState<ShowPassword>({});

//   // Stati per gestione permessi
//   const [selectedAgente, setSelectedAgente] = useState<Utente | null>(null);
//   const [permessiAgente, setPermessiAgente] = useState<PermessiAgente>({});
//   const [showPermessiModal, setShowPermessiModal] = useState<boolean>(false);

//   // Stati per il reset password
//   const [resetPassword, setResetPassword] = useState<ResetPasswordState>({
//     utenteId: null,
//     newPassword: '',
//     confirmPassword: ''
//   });

//   useEffect(() => {
//     if (activeTab === 'agenti') {
//       loadAgenti();
//     }
//   }, [activeTab]);

//   const loadAgenti = async (): Promise<void> => {
//     try {
//       setLoading(true);
//       const data = await UtentiApi.getAgenti();
//       setAgenti(data || []);
//     } catch (err) {
//       showMessageFunc('Errore nel caricamento degli agenti', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadPermessiAgente = async (agenteId: number): Promise<void> => {
//     try {
//       setLoading(true);
//       const permessi = await UtentiApi.getPermessiAgente(agenteId);
//       setPermessiAgente(permessi || {});
//     } catch (err) {
//       showMessageFunc('Errore nel caricamento dei permessi', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePermessiClick = async (agente: Utente): Promise<void> => {
//     setSelectedAgente(agente);
//     await loadPermessiAgente(agente.id);
//     setShowPermessiModal(true);
//   };

//   const handlePermessoToggle = (modulo: string, permesso: string, value: boolean): void => {
//     setPermessiAgente(prev => ({
//       ...prev,
//       [modulo]: {
//         ...prev[modulo],
//         [permesso]: value
//       }
//     }));
//   };

//   const savePermessi = async (): Promise<void> => {
//     if (!selectedAgente) return;

//     try {
//       setLoading(true);
//       await UtentiApi.updatePermessiAgente(selectedAgente.id, permessiAgente);
//       showMessageFunc(`Permessi aggiornati per ${selectedAgente.nome} ${selectedAgente.cognome}`, 'success');
//       setShowPermessiModal(false);
//     } catch (err) {
//       showMessageFunc('Errore nel salvataggio dei permessi', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResetPassword = async (utenteId: number): Promise<void> => {
//     if (!resetPassword.newPassword || resetPassword.newPassword !== resetPassword.confirmPassword) {
//       showMessageFunc('Le password non corrispondono o sono vuote', 'error');
//       return;
//     }

//     if (resetPassword.newPassword.length < 6) {
//       showMessageFunc('La password deve essere di almeno 6 caratteri', 'error');
//       return;
//     }

//     try {
//       setLoading(true);
//       await UtentiApi.resetPassword(utenteId, resetPassword.newPassword);
//       showMessageFunc('Password resettata con successo', 'success');
//       setResetPassword({ utenteId: null, newPassword: '', confirmPassword: '' });
//     } catch (err) {
//       showMessageFunc('Errore nel reset password', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleShowPassword = (field: string): void => {
//     setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
//   };

//   const formatDate = (dateString?: string): string => {
//     if (!dateString) return 'N/A';
//     try {
//       return new Date(dateString).toLocaleDateString('it-IT');
//     } catch {
//       return 'N/
