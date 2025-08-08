# KnowBy

<div align="center">

![Expo](https://img.shields.io/badge/Expo-v53.0.20-000020?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-v0.79.5-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-3DDC84?style=for-the-badge&logo=android&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-0.1.7-brightgreen?style=for-the-badge)

**Una piattaforma mobile moderna per connettere studenti e tutor**

[📖 Documentazione](#-documentazione) • [🚀 Quick Start](#-quick-start) • [🛠️ Sviluppo](#️-sviluppo) • [🤝 Contributi](#-contributi) • [📞 Supporto](#-supporto-e-contatti)

</div>

---

## 📋 Indice

- [📋 Panoramica](#-panoramica)
- [✨ Funzionalità Principali](#-funzionalità-principali)
- [🏗️ Architettura del Progetto](#️-architettura-del-progetto)
- [🚀 Quick Start](#-quick-start)
- [🛠️ Sviluppo](#️-sviluppo)
- [📖 Documentazione](#-documentazione)
- [🤝 Contributi](#-contributi)
- [📄 Licenza](#-licenza)
- [📞 Supporto e Contatti](#-supporto-e-contatti)

---

## 📋 Panoramica

**KnowBy** è un'applicazione mobile cross-platform sviluppata in React Native ed Expo, progettata per rivoluzionare il modo in cui studenti e tutor si connettono. L'app offre un'interfaccia utente moderna e intuitiva con tema scuro, animazioni fluide e un design responsive ottimizzato per dispositivi mobili.

### � Status del Progetto

![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=flat-square)
![Code Quality](https://img.shields.io/badge/Code%20Quality-A-brightgreen?style=flat-square)
![Maintenance](https://img.shields.io/badge/Maintenance-Active-brightgreen?style=flat-square)
![Last Commit](https://img.shields.io/github/last-commit/FedericoLupoli/KnowByDEV?style=flat-square)

### �🎯 Obiettivi del Progetto

- Facilitare la ricerca e il matching tra studenti e tutor qualificati
- Fornire una piattaforma sicura per l'apprendimento online
- Offrire un'esperienza utente fluida e professionale
- Supportare multiple lingue e personalizzazione

---

## ✨ Funzionalità Principali

### 🎨 Design & UI/UX
- **Interface moderna** con tema scuro e accenti verdi
- **Animazioni micro-interattive** per un'esperienza fluida
- **Header gradient** con branding distintivo
- **Bottom navigation floating** con indicatori di stato attivi
- **Responsive design** ottimizzato per smartphone

### 🔧 Funzionalità Tecniche
- **Autenticazione sicura** con gestione sessioni
- **Integrazione API** con backend KnowByAPI
- **Navigazione multi-schermo** con React Navigation
- **Gestione stato globale** con Context API
- **Supporto multilingue** dinamico
- **Protezione piattaforma** (mobile-only con blocco tablet/web)

### 📱 Schermate Principali
- **Home**: Dashboard principale con tutor disponibili
- **Search**: Ricerca avanzata tutor con filtri
- **Profile**: Gestione profilo utente e autenticazione
- **Settings**: Configurazioni app e preferenze utente

---

## 📱 Screenshot

<!-- Inserisci qui uno screenshot dell'app, ad esempio: -->
<!-- ![Schermata KnowBy](assets/images/splash-icon.png) -->

---

## 🏗️ Architettura del Progetto

<details>
<summary><strong>📂 Struttura delle Cartelle</strong></summary>

```
KnowByDEV/
├── 📄 App.js                 # Entry point principale
├── 📄 index.js              # Registrazione componente root
├── 📄 package.json          # Dipendenze e configurazione NPM
├── 📄 package-lock.json     # Lock file dipendenze
├── 📄 eas.json             # Configurazione Expo Application Services
├── 📄 app.json             # Configurazione app Expo
├── 📄 eslint.config.js     # Configurazione linting
├── 📄 .env                 # Variabili d'ambiente
├── 📄 .gitignore           # File ignorati da Git
│
├── 📁 src/                  # Codice sorgente principale
│   ├── 📁 components/       # Componenti riutilizzabili
│   │   ├── Header.js        # Header con gradient
│   │   ├── Footer.js        # Bottom navigation
│   │   ├── Body.js          # Container contenuti
│   │   ├── TutorCard.js     # Card tutor
│   │   ├── AuthErrorBanner.js # Banner errori autenticazione
│   │   ├── InfoApp.js       # Informazioni app
│   │   ├── MobileOnlyView.js # Vista solo mobile
│   │   ├── SocialLinks.js   # Collegamenti social
│   │   └── 📁 messages/     # Componenti messaggi
│   │       └── MessageTutorCard.js # Card messaggi tutor
│   │
│   ├── 📁 screens/          # Schermate principali
│   │   ├── HomeScreen.js    # Dashboard principale
│   │   ├── SearchScreen.js  # Ricerca tutor
│   │   ├── ConversationsScreen.js # Schermata conversazioni
│   │   ├── ProfilePage.js   # Profilo utente
│   │   ├── ProfileLogin.js  # Autenticazione login
│   │   ├── ProfileRegister.js # Registrazione
│   │   ├── SettingsScreen.js # Impostazioni
│   │   └── DebugScreen.js   # Schermata debug
│   │
│   ├── 📁 context/          # Gestione stato globale
│   │   ├── AuthContext.js   # Context autenticazione
│   │   └── LanguageContext.js # Context multilingue
│   │
│   ├── 📁 config/           # Configurazioni
│   │   └── api.js          # Configurazione API
│   │
│   ├── 📁 styles/           # Stili e temi
│   │   └── defaultStyle.js  # Stili condivisi
│   │
│   └── 📁 utils/            # Utilità e helpers
│       ├── translations.js  # Gestione traduzioni
│       └── apiTest.js      # Test API
│
├── 📁 assets/               # Risorse statiche
│   ├── 📁 icons/           # Icone app
│   │   ├── adaptive-icon.png
│   │   ├── favicon.png
│   │   ├── icon.png
│   │   └── scritta.png
│   ├── 📁 images/          # Immagini e splash
│   │   └── splash-icon.png
│   └── 📁 fonts/           # Font personalizzati
│       ├── Aladin-Regular.ttf
│       ├── AMORIA.otf
│       └── Khonsu.ttf
│
├── 📁 .expo/               # File di configurazione Expo
├── 📁 dist/                # File di build
├── 📁 node_modules/        # Dipendenze NPM
│
└── 📋 Documentazione        # File di documentazione
    ├── README.md           # Documentazione principale
    ├── DOCS.md            # Documentazione tecnica
    └── CHAT_WORKFLOW_STEPS.md # Workflow chat
```

</details>

---

## 🚀 Quick Start

### 📋 Prerequisiti

Prima di iniziare, assicurati di avere installato:

- **Node.js** (v18.0.0 o superiore) - [Download](https://nodejs.org/)
- **npm** o **yarn** come package manager
- **Expo CLI** (`npm install -g @expo/cli`)
- **Expo Go** app sul tuo dispositivo mobile ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

> ⚠️ **Nota**: Assicurati di aver configurato correttamente l'ambiente di sviluppo React Native seguendo la [guida ufficiale](https://reactnative.dev/docs/environment-setup).

### ⚡ Installazione Rapida

```bash
# 1. Clona il repository
git clone https://github.com/FedericoLupoli/KnowByDEV.git
cd KnowBy

# 2. Installa le dipendenze
npm install
# oppure con yarn
yarn install

# 3. Configura le variabili d'ambiente
cp .env.example .env
# Modifica il file .env con le tue configurazioni:
# - EXPO_PUBLIC_API_URL: URL del tuo server API
# - EXPO_PUBLIC_PROJECT_ID: ID progetto Expo
# - EXPO_PUBLIC_DEBUG_MODE: true/false per modalità debug

# 4. Avvia l'ambiente di sviluppo
npm start
# oppure
expo start

# 5. Scansiona il QR code con Expo Go
# per testare su dispositivo fisico
```

### 🔧 Comandi Disponibili

| Comando | Descrizione |
|---------|-------------|
| `npm start` | Avvia il server di sviluppo con connessione LAN |
| `npm run android` | Avvia su emulatore Android |
| `npm run ios` | Avvia su simulatore iOS |
| `npm run web` | Avvia versione web (funzionalità limitate) |
| `npm run lint` | Esegue controllo qualità codice con ESLint |

---

## 🛠️ Sviluppo

### 🔧 Tecnologie Utilizzate

- **Frontend**: React Native 0.79.5, Expo SDK 53
- **Navigazione**: React Navigation v7
- **Stato**: Context API (AuthContext, LanguageContext)
- **Styling**: StyleSheet nativo con tema scuro
- **Icone**: Expo Vector Icons
- **Gradients**: Expo Linear Gradient
- **Storage**: Async Storage per persistenza locale

### 📋 Requisiti di Sistema

- **Node.js**: v18.0.0 o superiore
- **npm/yarn**: Per gestione dipendenze
- **Expo CLI**: Per sviluppo e build
- **Git**: Per version control
- **Dispositivo mobile** o emulatore per testing

### 🔗 Integrazione API

L'app si collega al backend [KnowByAPI](https://github.com/FedericoLupoli/KnowByAPI) per:

- **Autenticazione**: Login/register utenti
- **Gestione tutor**: Elenco e dettagli tutor
- **Ricerca**: Filtri e ricerca avanzata
- **Profili**: Gestione dati utente

#### Configurazione API

Modifica il file `.env` con i seguenti parametri:

```env
EXPO_PUBLIC_API_URL=http://your-api-server.com:3000
EXPO_PUBLIC_PROJECT_ID=your-expo-project-id
EXPO_PUBLIC_DEBUG_MODE=false
```

### 🔄 Flusso di Sviluppo

1. **Sviluppo locale**: `npm start` per ambiente di sviluppo
2. **Testing**: Test su dispositivi fisici tramite Expo Go
3. **Linting**: `npm run lint` per controllo qualità codice
4. **Build**: EAS Build per build produzione
5. **Deploy**: EAS Submit per pubblicazione store

---

## 📖 Documentazione

Per informazioni più dettagliate, consulta la documentazione tecnica:

- **[DOCS.md](DOCS.md)**: Documentazione tecnica completa
- **[ACCOUNT_SYSTEM.md](ACCOUNT_SYSTEM.md)**: Sistema di autenticazione
- **[CHAT_WORKFLOW_STEPS.md](CHAT_WORKFLOW_STEPS.md)**: Workflow della chat
- **[SECURITY.md](SECURITY.md)**: Linee guida di sicurezza

### 🔧 Risoluzione Problemi

**Problema comune**: L'app non si avvia
- Verifica che Node.js sia v18+ 
- Controlla le variabili d'ambiente in `.env`
- Prova a pulire la cache: `npx expo start --clear`

**Problema comune**: Errori di build
- Verifica che tutte le dipendenze siano installate
- Controlla la compatibilità versioni in `package.json`
- Consulta i log dettagliati con `expo diagnostics`

---

## 🚨 Limitazioni Note

- **Piattaforme supportate**: Solo iOS e Android (no web/tablet)
- **Connessione richiesta**: L'app richiede connessione internet per API
- **Versione minima**: iOS 11.0+, Android API 21+

---

## 🤝 Contributi

Accettiamo con piacere contributi dalla community! Che tu sia uno sviluppatore esperto o alle prime armi, il tuo aiuto è prezioso.

### 🚀 Come Contribuire

1. **Fork** del repository
2. **Crea un branch** per la tua feature
   ```bash
   git checkout -b feature/nome-fantastica-feature
   ```
3. **Committa** le tue modifiche
   ```bash
   git commit -m "feat: aggiunta fantastica feature"
   ```
4. **Push** del branch
   ```bash
   git push origin feature/nome-fantastica-feature
   ```
5. **Apri una Pull Request** con descrizione dettagliata

### 🗺️ Roadmap

Le prossime funzionalità in sviluppo:

- [ ] **Chat in tempo reale** tra studenti e tutor
- [ ] **Sistema di recensioni** e rating
- [ ] **Calendario integrato** per prenotazioni
- [ ] **Pagamenti in-app** per lezioni
- [ ] **Notifiche push** personalizzate
- [ ] **Modalità offline** limitata

### 📝 Convenzioni Commit

Utilizziamo [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` per nuove funzionalità
- `fix:` per correzioni di bug
- `docs:` per aggiornamenti documentazione
- `style:` per modifiche di formattazione
- `refactor:` per refactoring del codice
- `test:` per aggiunta/modifica test

### 🐛 Segnalazione Bug

Se trovi un bug, [apri una issue](https://github.com/FedericoLupoli/KnowByDEV/issues) includendo:

- **Descrizione** del problema
- **Passi per riprodurre** il bug
- **Comportamento atteso** vs **comportamento attuale**
- **Screenshot** se applicabili
- **Informazioni ambiente** (OS, versione app, dispositivo)

---

## 📄 Licenza

Questo progetto è distribuito sotto **Licenza MIT**. Vedi il file [LICENSE](LICENSE) per i dettagli completi.

```
MIT License

Copyright (c) 2025 Federico Lupoli

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 📞 Supporto e Contatti

<div align="center">

<img src="https://skillicons.dev/icons?i=js,react"/> 
<br>
<p><strong>Sviluppo di <a href='https://github.com/FedericoLupoli'>Federico Lupoli</a></strong></p>

[![GitHub](https://img.shields.io/badge/GitHub-FedericoLupoli-black?style=for-the-badge&logo=github)](https://github.com/FedericoLupoli)
[![Repository](https://img.shields.io/badge/Repository-KnowByDEV-blue?style=for-the-badge&logo=git)](https://github.com/FedericoLupoli/KnowByDEV)

<br>

<img src="https://skillicons.dev/icons?i=windows,mysql"/> 
<br>
<p><strong>Infrastruttura di <a href='https://github.com/NicholasBertuzzi'>Nicholas Bertuzzi</a></strong></p>

[![GitHub](https://img.shields.io/badge/GitHub-NicholasBertuzzi-black?style=for-the-badge&logo=github)](https://github.com/NicholasBertuzzi)

<br>

<img src="https://skillicons.dev/icons?i=figma,photoshop"/> 
<br>
<p><strong>UI/UX di <a href='https://github.com/AndreaMiccoli'>Andrea Miccoli</a></strong></p>

[![GitHub](https://img.shields.io/badge/GitHub-AndreaMiccoli-black?style=for-the-badge&logo=github)](https://github.com/AndreaMiccoli)

---

### 🙏 Ringraziamenti

Grazie a tutti i contributori e alla community React Native ed Expo per il supporto continuo.

**⭐ Se questo progetto ti è stato utile, considera di dargli una stella!**

</div>

---

<div align="center">
<sub>Costruito con ❤️ usando React Native ed Expo</sub>
</div>
