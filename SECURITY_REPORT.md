# KnowByV2 – Security Report

## Sommario
- [Analisi file per file](#analisi-file-per-file)
- [Dipendenze e rischi](#dipendenze-e-rischi)
- [Miglioramenti lato server](#miglioramenti-lato-server)

---

## Analisi file per file

### src/screens/ProfileLogin.js
- **Gestione password e token**: Le credenziali vengono inviate in chiaro (HTTP) e il token JWT viene salvato in `AsyncStorage`.
- **Rischi**: Esposizione credenziali su rete non sicura, rischio di furto token su device compromesso.
- **Mitigazioni**: Usare HTTPS, preferire secure storage nativo.

### src/screens/ProfileRegister.js
- **Gestione dati sensibili**: Password e dati utente inviati in chiaro (HTTP). Nessuna validazione avanzata lato client.
- **Rischi**: Stessi di login, più rischio di account fake se il backend non valida bene.
- **Mitigazioni**: Validazione forte lato server, HTTPS.

### src/screens/ProfilePage.js
- **Modifica profilo**: Aggiornamento dati e password tramite API protetta da JWT. Il token è preso da `AsyncStorage`.
- **Rischi**: Se il token viene rubato, un attaccante può modificare i dati dell’utente.
- **Mitigazioni**: Invalida token lato server al logout, usa HTTPS.

### src/screens/SettingsScreen.js
- **Logout**: Rimuove il token JWT da `AsyncStorage` e aggiorna lo stato globale.
- **Rischi**: Se il token non viene invalidato lato server, può essere riutilizzato.
- **Mitigazioni**: Implementare invalidazione/rotazione token lato server.

### src/context/AuthContext.js
- **Gestione stato utente**: Recupera e valida il token JWT all’avvio. Se il token è scaduto o non valido, viene rimosso.
- **Rischi**: Espone dati utente a tutti i componenti che usano il context.
- **Mitigazioni**: Limitare l’uso del context solo ai componenti che ne hanno bisogno.

### src/context/LanguageContext.js
- **Nessun rischio di sicurezza**: Gestisce solo la lingua dell’interfaccia.

### src/utils/translations.js
- **Nessun rischio di sicurezza**: Solo stringhe di traduzione.

### src/styles/defaultStyle.js
- **Nessun rischio di sicurezza**: Solo definizioni di stile.

### src/components/Header.js, Footer.js, Body.js, InfoApp.js, SocialLinks.js
- **Nessun rischio di sicurezza**: Componenti puramente UI, non gestiscono dati sensibili.

---

## Dipendenze e rischi

- **@react-native-async-storage/async-storage**: Usato per salvare il token JWT. Non è cifrato nativamente.
- **react-native** e **expo**: Nessun rischio diretto, ma mantenere aggiornate le versioni.
- **Suggerimento**: Eseguire periodicamente `npm audit` per rilevare vulnerabilità note.

---

## Miglioramenti lato server

1. **Obbligare HTTPS**: Tutte le API devono essere accessibili solo tramite HTTPS.
2. **Hashing password**: Usare sempre bcrypt o argon2 per le password (già raccomandato nei documenti).
3. **Validazione input**: Validare sempre i dati ricevuti da client, sia per login/registrazione che per update profilo.
4. **Rate limiting**: Implementare rate limiting sugli endpoint di autenticazione per prevenire brute force.
5. **CORS restrittivo**: Limitare i domini che possono accedere alle API.
6. **Invalidazione token**: Implementare blacklist o rotazione dei JWT al logout o cambio password.
7. **Ruoli e permessi**: Verificare sempre i permessi lato server per ogni azione (es. solo tutor possono ricevere recensioni).
8. **Logging e monitoring**: Loggare accessi sospetti, errori e tentativi di attacco.
9. **Aggiornamento dipendenze**: Mantenere aggiornate tutte le dipendenze backend.
10. **Protezione dati sensibili**: Non restituire mai password hashate o dati sensibili nelle risposte API.

---

**Nota**: Per una sicurezza completa, è fondamentale che anche il backend sia sviluppato seguendo le best practice OWASP. 