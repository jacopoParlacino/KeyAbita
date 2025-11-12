// Export all services from a central location
export { default as CittaService } from './cittaService';
export { default as StatoImmobileService } from './statoImmobileService';
export { default as ImmobileService } from './immobileService';
export { default as ValutazioneService } from './valutazioneService';

// Export types
export type { Citta } from './cittaService';
export type { StatoImmobile } from './statoImmobileService';
export type { Immobile, CreateImmobileRequest } from './immobileService';
export type { Valutazione, CreateValutazioneRequest } from './valutazioneService';