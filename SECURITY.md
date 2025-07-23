# 🔒 Guida alla Sicurezza - KnowBy V2

## 📋 Configurazione Iniziale

### 1. **Setup Variabili d'Ambiente**

Dopo aver clonato il repository, crea il file `.env` nella root del progetto:

```bash
# Copia il template di esempio
cp .env.example .env
```

Modifica il file `.env` con le tue configurazioni:

```bash
# API Configuration
EXPO_PUBLIC_API_URL=http://your-api-server.com:3000

# Expo Configuration  
EXPO_PUBLIC_PROJECT_ID=your-actual-project-id

# Development Settings
EXPO_PUBLIC_DEBUG_MODE=false
```

### 2. **Configurazione Expo Project ID**

1. Vai su [expo.dev](https://expo.dev) e accedi al tuo account
2. Crea o seleziona il tuo progetto
3. Copia il Project ID dalla dashboard
4. Sostituisci `PROJECT_ID_PLACEHOLDER` in `app.json` con il tuo ID reale

```json
{
  "expo": {
    "extra": {
      "eas": {
        "projectId": "il-tuo-project-id-qui"
      }
    }
  }
}
```

### 3. **Configurazione API URL**

**Per sviluppo locale:**
```bash
EXPO_PUBLIC_API_URL=http://localhost:3000
```

**Per produzione:**
```bash
EXPO_PUBLIC_API_URL=https://api.yoursite.com
```

**Per testing con IP specifico:**
```bash
EXPO_PUBLIC_API_URL=http://192.168.1.100:3000
```

## 🚫 File da NON Committare

I seguenti file contengono informazioni sensibili e sono automaticamente esclusi da Git:

- `.env` - Configurazioni locali
- `.env.production` - Configurazioni di produzione  
- `.env.development` - Configurazioni di sviluppo
- `src/config/secrets.js` - File per credenziali sensibili
- `src/config/credentials.js` - File per credenziali API

## 🔧 Utilizzo dell'API

Tutti i file utilizzano ora la configurazione centralizzata:

```javascript
import { buildApiUrl, API_ENDPOINTS } from '../config/api';

// Invece di URL hardcodati
const response = await fetch(buildApiUrl(API_ENDPOINTS.TUTORS));
```

## 🚨 Controlli di Sicurezza

Prima di ogni commit, verifica:

1. ✅ Nessun URL hardcodato nei file sorgente
2. ✅ File `.env` presente in `.gitignore`
3. ✅ Nessuna credenziale nel codice
4. ✅ Project ID sostituito con il tuo

## 🔍 Script di Verifica

Puoi verificare la presenza di URL hardcodati con:

```bash
# Cerca URL hardcodati (non dovrebbe trovare nulla)
grep -r "http://66.118.245.111" src/

# Cerca altre possibili informazioni sensibili  
grep -r "password\|secret\|key\|token" src/ --exclude-dir=node_modules
```

## 📞 Supporto

Se hai problemi con la configurazione della sicurezza, controlla:

1. Il file `.env` è presente e configurato correttamente
2. Le variabili d'ambiente sono caricate correttamente
3. L'API è raggiungibile dall'URL configurato

---

⚠️ **IMPORTANTE**: Non condividere mai file `.env` o credenziali in chat, email o repository pubblici.
