# Guida Autenticazione e Login - KeyAbita

L'API utilizza **JWT (JSON Web Tokens)** per l'autenticazione. Tutte le richieste protette richiedono un token valido nell'header `Authorization`.

## 1. Endpoint di Login

**URL:** `POST /api/auth/login`

**Base URL:** `http://localhost:8080/api/auth/login`

## 2. Formato della Richiesta

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

## 3. Utenti Disponibili

Sono pre-configurati i seguenti utenti nel database (password: `password123`):

| Nome | Email | Ruolo | Accesso API |
|------|-------|-------|------------|
| Paolo Ghirlinzoni | `paolo.ghirlinzoni@immobiliaris.it` | ADMIN | Tutte le API |
| Giulia Verdi | `giulia.verdi@immobiliaris.it` | AGENT | API immobili, valutazioni, richieste, contratti |

## 4. Risposta di Successo (200 OK)

```json
{
  "success": true,
  "message": "Login successful",
  "token": "<token>",
  "utente": {
    "id": 3,
    "nome": "Paolo",
    "cognome": "Ghirlinzoni",
    "email": "paolo.ghirlinzoni@immobiliaris.it",
    "ruolo": 1,
    "telefono": "+39 340 3456789",
    "data_creazione": "2025-10-23"
  }
}
```

## 5. Risposta di Errore (401 Unauthorized)

```json
{
  "success": false,
  "message": "Invalid email or password",
  "token": null,
  "utente": null
}
```

## 6. Uso del Token nelle Richieste Successive

Una volta ottenuto il token, usalo nell'header `Authorization` per accedere alle API protette:

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwYW9sby5naGlybGluem9uaUBpbW1vYmlsaWFyaXMuaXQiLCJpYXQiOjE3MzE2NjAwMDAsImV4cCI6MTczMTc0NjQwMH0.abcdef...
Content-Type: application/json
```

## 7. Esempio con Thunderclient

### Step 1: Effettuare il Login
- Metodo: `POST`
- URL: `http://localhost:8080/api/auth/login`
- Body (raw JSON):
```json
{
  "email": "paolo.ghirlinzoni@immobiliaris.it",
  "password": "password123"
}
```
- Clicca "Send"

### Step 2: Salva il Token
- Dalla risposta, copia il valore di `token`
- **Opzione A: Crea una variabile Thunderclient**
  - Seleziona il token nella risposta
  - Clicca "Set variable"
  - Salva come `token`
- **Opzione B: Copia manualmente il token**

### Step 3: Usa il Token nelle Richieste Successive
- Metodo: `GET`
- URL: `http://localhost:8080/api/immobili`
- Sezione **Auth** → Scegli **Bearer Token**
- Incolla: `{{token}}` (se hai salvato la variabile) oppure il token direttamente
- Clicca "Send"


## 8. Codici di Stato HTTP

| Codice | Significato | Causa |
|--------|------------|-------|
| **200 OK** | Login riuscito | Credenziali corrette |
| **401 Unauthorized** | Credenziali non valide | Email/password errate o token scaduto |
| **403 Forbidden** | Accesso negato | Token valido ma ruoli insufficienti |
| **400 Bad Request** | Richiesta malformata | Formato JSON non valido |

## 9. Validità del Token

- **Durata:** Configurabile (di default verificare `JwtUtil.java`)
- **Scadenza:** Token JWT contengono una data di scadenza (`exp` claim)
- **Refresh:** Per ottenere un nuovo token, effettuare un nuovo login

## 10. Errori Comuni

### Errore: 401 Unauthorized su `/api/immobili`
- ❌ Nessun header `Authorization`
- ❌ Token scaduto
- ✅ Soluzione: Effettua un nuovo login

### Errore: 403 Forbidden su `/api/immobili`
- ❌ Utente con ruolo insufficiente (es: OWNER non può accedere a immobili)
- ✅ Soluzione: Usa un utente ADMIN o AGENT

### Errore: 401 Unauthorized su `/api/auth/login`
- ❌ Credenziali errate
- ✅ Soluzione: Verifica email e password

## 11. Endpoint Protetti per Ruolo

### ADMIN (Paolo Ghirlinzoni)
- ✅ `/api/utenti/**` - Gestione utenti
- ✅ `/api/ruoli/**` - Gestione ruoli
- ✅ `/api/immobili/**` - Gestione immobili
- ✅ `/api/valutazioni/**` - Gestione valutazioni
- ✅ `/api/richieste/**` - Gestione richieste
- ✅ `/api/contratti/**` - Gestione contratti
- ✅ `/api/citta/**` - Gestione città
- ✅ `/api/stati-immobili/**` - Gestione stati
- ✅ `/api/stati-richieste/**` - Gestione stati
- ✅ `/api/stati-contratti/**` - Gestione stati

### AGENT (Giulia Verdi)
- ❌ `/api/utenti/**` - ✗ Accesso negato
- ❌ `/api/ruoli/**` - ✗ Accesso negato
- ✅ `/api/immobili/**` - Visualizza e gestisce immobili
- ✅ `/api/valutazioni/**` - Crea valutazioni
- ✅ `/api/richieste/**` - Gestisce richieste
- ✅ `/api/contratti/**` - Gestisce contratti
- ✅ `/api/citta/**` - Legge dati pubblici
- ✅ `/api/stati-immobili/**` - Legge dati pubblici
- ✅ `/api/stati-richieste/**` - Legge dati pubblici
- ✅ `/api/stati-contratti/**` - Legge dati pubblici
