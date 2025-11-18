# 🧪 Guida Completa ai Test API - KeyAbita

## 🎯 Dashboard Test API Creata!

Ho creato una dashboard completa per testare tutte le API del backend. Accedi alla dashboard:

**URL:** http://localhost:5173/dashboard-api

## 📋 Funzionalità della Dashboard

### 🌱 **Data Seeder** (Tab 1)
Prima di testare le API, popola il database con dati di esempio:

- **Seed Città**: Crea 12 città italiane (Roma, Milano, Napoli, etc.)
- **Seed Stati Immobile**: Crea 10 stati (Ottimo, Buono, Da ristrutturare, etc.)
- **Seed Immobili**: Crea 20 immobili con dati casuali realistici
- **Seed Valutazioni**: Crea 30 valutazioni per gli immobili
- **🚀 Seed Completo**: Esegue tutto in sequenza automaticamente

### 🏙️ **Test Città** (Tab 2)
Test per `/api/citta`:
- ✅ `GET /api/citta` - Visualizza tutte le città
- ✅ `POST /api/citta` - Crea nuove città
- ✅ `GET /api/citta/{id}` - Cerca per ID
- ✅ `GET /api/citta/nome/{nome}` - Cerca per nome

### 🏠 **Test Stati Immobile** (Tab 3)
Test per `/api/stati-immobile`:
- ✅ `GET /api/stati-immobile` - Visualizza tutti gli stati
- ✅ `POST /api/stati-immobile` - Crea nuovi stati
- ✅ `GET /api/stati-immobile/{id}` - Cerca per ID
- ✅ `GET /api/stati-immobile/nome/{nome}` - Cerca per nome

### 🏢 **Test Immobili** (Tab 4)
Test per `/api/immobili`:
- ✅ `GET /api/immobili` - Visualizza tutti gli immobili (con card dettagliate)
- ✅ `POST /api/immobili` - Crea nuovi immobili (form completo)
- ✅ `GET /api/immobili/{id}` - Cerca per ID
- ✅ `GET /api/immobili/citta/{nome}` - Filtra per città
- ✅ `GET /api/immobili/stato-immobile/{nome}` - Filtra per stato
- ✅ `GET /api/immobili/stanze/{n}` - Filtra per numero stanze

### 💰 **Test Valutazioni** (Tab 5)
Test per `/api/valutazioni`:
- ✅ `GET /api/valutazioni` - Visualizza tutte le valutazioni
- ✅ `POST /api/valutazioni` - Crea nuove valutazioni
- ✅ `GET /api/valutazioni/{id}` - Cerca per ID
- ✅ `GET /api/valutazioni/immobile/{id}` - Valutazioni per immobile
- ✅ `GET /api/valutazioni/range?min=X&max=Y` - Filtra per range di prezzo

## 📊 **Log in Tempo Reale**

La dashboard include un sistema di logging che mostra:
- ✅ **Successi** (verde): Operazioni completate
- ❌ **Errori** (rosso): Problemi di connessione o server
- ℹ️ **Info** (blu): Operazioni in corso

## 🚀 **Come Usare la Dashboard**

### 1. **Primo Avvio - Popola i Dati**
```
1. Vai al tab "🌱 Data Seeder"
2. Clicca "🚀 Seed Tutti i Dati"
3. Attendi il completamento (vedrai i log)
```

### 2. **Test Sistematico delle API**
```
1. Tab "🏙️ Città": Testa CRUD città
2. Tab "🏠 Stati": Testa CRUD stati immobile
3. Tab "🏢 Immobili": Testa CRUD immobili (più complesso)
4. Tab "💰 Valutazioni": Testa CRUD valutazioni
```

### 3. **Scenari di Test Suggeriti**

#### **Scenario 1: Flusso Completo**
1. Crea una nuova città
2. Crea un nuovo stato immobile
3. Crea un immobile usando città e stato creati
4. Crea una valutazione per l'immobile

#### **Scenario 2: Test di Ricerca**
1. Cerca immobili per città specifica
2. Filtra per numero di stanze
3. Cerca valutazioni in un range di prezzo
4. Trova valutazioni per un immobile specifico

#### **Scenario 3: Test di Validazione**
1. Prova a creare dati con campi vuoti
2. Cerca con ID inesistenti
3. Testa filtri con valori non validi

## 🔧 **Funzionalità Avanzate**

### **Visualizzazione Dati**
- **Card Immobili**: Mostrano tutti i dettagli (via, città, metratura, stanze, ecc.)
- **Card Valutazioni**: Includono importo formattato, data e dettagli immobile
- **Liste Interattive**: Per città e stati con ID visibili

### **Form Intelligenti**
- **Dropdown Dinamici**: Caricati dal backend (città e stati)
- **Validazione**: Campi obbligatori evidenziati
- **Loading States**: Pulsanti disabilitati durante operazioni

### **Gestione Errori**
- **Messaggi User-Friendly**: Errori chiari e comprensibili
- **Logging Dettagliato**: Per debug in console
- **Recupero Automatico**: Ricarica dati dopo creazione

## 📱 **Link Rapidi nella Footer**
- **🗄️ H2 Console**: http://localhost:8080/h2-console
- **📝 Form Valutazione**: http://localhost:5173/valutazione

## 🎯 **Indicatori di Stato**
- 🟢 **Backend**: http://localhost:8080 (Spring Boot)
- 🔵 **Frontend**: http://localhost:5173 (Vite/React)

## ✅ **Checklist Test Completo**

### **Preparazione**
- [ ] Backend avviato (Spring Boot su porta 8080)
- [ ] Frontend avviato (Vite su porta 5173)
- [ ] Database H2 funzionante
- [ ] Dashboard accessibile su `/dashboard-api`

### **Data Seeding**
- [ ] Eseguito seed completo dei dati
- [ ] Verificate almeno 10+ città nel database
- [ ] Verificati almeno 5+ stati immobile
- [ ] Creati almeno 15+ immobili di test
- [ ] Generate almeno 20+ valutazioni

### **Test CRUD Città**
- [ ] GET tutte le città
- [ ] POST nuova città
- [ ] GET città per ID
- [ ] GET città per nome
- [ ] Gestione errori (ID inesistente)

### **Test CRUD Stati Immobile**
- [ ] GET tutti gli stati
- [ ] POST nuovo stato
- [ ] GET stato per ID  
- [ ] GET stato per nome
- [ ] Gestione errori (nome duplicato)

### **Test CRUD Immobili**
- [ ] GET tutti gli immobili
- [ ] POST nuovo immobile (form completo)
- [ ] GET immobile per ID
- [ ] GET immobili per città
- [ ] GET immobili per stato
- [ ] GET immobili per numero stanze
- [ ] Validazione form (campi obbligatori)

### **Test CRUD Valutazioni**
- [ ] GET tutte le valutazioni
- [ ] POST nuova valutazione
- [ ] GET valutazione per ID
- [ ] GET valutazioni per immobile
- [ ] GET valutazioni per range prezzo
- [ ] Formattazione corretta currency

### **Test di Integrazione**
- [ ] Flusso completo: città → stato → immobile → valutazione
- [ ] Relazioni corrette tra entità
- [ ] Dati consistenti tra frontend e backend
- [ ] Performance accettabile con molti dati

## 🎉 **Risultato Atteso**

Dopo aver completato tutti i test, dovresti avere:

1. **Database Popolato** con centinaia di record di test
2. **API Funzionanti** al 100% per tutte le operazioni CRUD  
3. **Frontend Robusto** che gestisce tutti i casi d'uso
4. **Integrazione Perfetta** tra React e Spring Boot
5. **Logging Completo** per monitorare tutte le operazioni

## 🚨 **Troubleshooting**

### **Backend Non Risponde**
```bash
# Verifica che Spring Boot sia avviato
curl http://localhost:8080/api/citta
```

### **CORS Errors**
- Già configurato con `@CrossOrigin(origins = "*")` nei controller

### **Dati Non Visualizzati**
- Controlla i log nella sidebar destra della dashboard
- Verifica la console del browser (F12)

### **Errori di Creazione**
- Assicurati che città e stati esistano prima di creare immobili
- Controlla che tutti i campi obbligatori siano compilati

La dashboard è ora completa e pronta per testare ogni singola API del tuo backend! 🎯