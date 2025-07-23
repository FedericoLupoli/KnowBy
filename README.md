# KnowByV2

![Expo](https://img.shields.io/badge/Expo-React%20Native-blueviolet?logo=expo)
![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-green)
![License](https://img.shields.io/badge/LICENCE-MIT-orange)
)

🔗 Integrazione Backend

L'applicazione si interfaccia con il backend **[KnowByAPI](https://github.com/FedericoLupoli/KnowByAPI)** per fornire:

- **Gestione utenti** e autenticazione sicura
- **Database tutor** con profili dettagliati e recensioni
- **Sistema di matching** intelligente studente-tutor
- **Comunicazione real-time** tra utenti
- **Gestione prenotazioni** e calendario

Per maggiori dettagli sui endpoint e l'integrazione API, consulta la [documentazione tecnica](DOCS.md).

---

## 🛠️ Tecnologie e Dipendenze

### 🏗️ Stack Tecnologico

| Tecnologia | Versione | Utilizzo |
|------------|----------|----------|
| **React** | 19.0.0 | Framework UI principale |
| **React Native** | 0.79.5 | Sviluppo mobile cross-platform |
| **Expo** | ~53.0.20 | Piattaforma di sviluppo e build |
| **React Navigation** | ^7.1.14 | Navigazione tra schermate |

### 📦 Dipendenze Principali

<details>
<summary><strong>🔧 Dipendenze di Produzione</strong></summary>

```json
{
  "@expo/metro-runtime": "~5.0.4",
  "@react-native-async-storage/async-storage": "^2.2.0",
  "@react-navigation/native": "^7.1.14",
  "@react-navigation/stack": "^7.4.2",
  "expo": "~53.0.20",
  "expo-linear-gradient": "^14.1.5",
  "expo-status-bar": "~2.2.3",
  "expo-updates": "~0.28.17",
  "react": "19.0.0",
  "react-native": "0.79.5",
  "react-native-safe-area-context": "^5.5.2",
  "react-native-screens": "~4.13.1",
  "expo-dev-client": "~5.2.4"
}
```

</details>

<details>
<summary><strong>⚒️ Dipendenze di Sviluppo</strong></summary>

```json
{
  "@babel/core": "^7.28.0",
  "eslint": "^9.31.0",
  "eslint-config-expo": "~9.2.0"
}
```

</details>

---

## 🛠️ Sviluppo

### 🎨 Guidelines di Sviluppo

- **Componenti funzionali** con React Hooks
- **Context API** per gestione stato globale
- **Stili JavaScript** con oggetti StyleSheet
- **Convenzioni di naming** camelCase per variabili, PascalCase per componenti
- **ESLint** per qualità e consistenza del codice

### 🔍 Debug e Testing

```bash
# Avvia con debugging avanzato
expo start --dev-client

# Controllo qualità codice
npm run lint

# Reset cache Metro (in caso di problemi)
expo start --clear
```

### 📱 Testing su Dispositivi

1. **Dispositivo fisico**: Installa Expo Go e scansiona il QR code
2. **Emulatore Android**: Configura Android Studio e AVD
3. **Simulatore iOS**: Richiede macOS con Xcode installato

---grey)

# KnowBy V2

<div align="center">

![Expo](https://img.shields.io/badge/Expo-v53.0.20-000020?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-v0.79.5-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-3DDC84?style=for-the-badge&logo=android&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-0.1.6-brightgreen?style=for-the-badge)

**Una piattaforma mobile moderna per connettere studenti e tutor**

[📖 Documentazione](#-documentazione) • [🚀 Quick Start](#-quick-start) • [🛠️ Sviluppo](#️-sviluppo) • [🤝 Contributi](#-contributi)

</div>

---

## 📋 Panoramica

**KnowBy V2** è un'applicazione mobile cross-platform sviluppata in React Native ed Expo, progettata per rivoluzionare il modo in cui studenti e tutor si connettono. L'app offre un'interfaccia utente moderna e intuitiva con tema scuro, animazioni fluide e un design responsive ottimizzato per dispositivi mobili.

### 🎯 Obiettivi del Progetto

- Facilitare la ricerca e il matching tra studenti e tutor qualificati
- Fornire una piattaforma sicura per l'apprendimento online
- Offrire un'esperienza utente fluida e professionale
- Supportare multiple lingue e personalizzazione

---

## ✨ Caratteristiche Principali

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

---

## ✨ Funzionalità principali

- **Header**: Gradient moderno, titolo dell’app.
- **Body**: Area centrale per i contenuti (es. elenco tutor, profili, ecc.).
- **Footer volante**: Pulsanti-icona (Home, Search, User, Settings) ancorati in basso, con effetto floating e selezione attiva.
- **Responsive**: UI ottimizzata per smartphone.
- **Blocco tablet/web**: L’app mostra un messaggio di blocco se aperta su tablet, iPad o web.
- **Integrazione API**: Visualizza tutor disponibili tramite backend KnowByAPI.

---

## 📱 Screenshot

<!-- Inserisci qui uno screenshot dell'app, ad esempio: -->
<!-- ![Schermata KnowByV2](assets/images/splash-icon.png) -->

---

## 📦 Struttura delle cartelle

## 🏗️ Architettura del Progetto

<details>
<summary><strong>📂 Struttura delle Cartelle</strong></summary>

```
KnowByV2/
├── 📄 App.js                 # Entry point principale
├── 📄 index.js              # Registrazione componente root
├── 📄 package.json          # Dipendenze e configurazione NPM
├── 📄 eas.json             # Configurazione Expo Application Services
├── 📄 app.json             # Configurazione app Expo
├── 📄 eslint.config.js     # Configurazione linting
│
├── 📁 src/                  # Codice sorgente principale
│   ├── 📁 components/       # Componenti riutilizzabili
│   │   ├── Header.js        # Header con gradient
│   │   ├── Footer.js        # Bottom navigation
│   │   ├── Body.js          # Container contenuti
│   │   ├── TutorCard.js     # Card tutor
│   │   ├── AuthErrorBanner.js
│   │   ├── InfoApp.js
│   │   ├── MobileOnlyView.js
│   │   └── SocialLinks.js
│   │
│   ├── 📁 screens/          # Schermate principali
│   │   ├── HomeScreen.js    # Dashboard principale
│   │   ├── SearchScreen.js  # Ricerca tutor
│   │   ├── ProfilePage.js   # Profilo utente
│   │   ├── ProfileLogin.js  # Autenticazione login
│   │   ├── ProfileRegister.js # Registrazione
│   │   └── SettingsScreen.js # Impostazioni
│   │
│   ├── 📁 context/          # Gestione stato globale
│   │   ├── AuthContext.js   # Context autenticazione
│   │   └── LanguageContext.js # Context multilingue
│   │
│   ├── 📁 styles/           # Stili e temi
│   │   └── defaultStyle.js  # Stili condivisi
│   │
│   └── 📁 utils/            # Utilità e helpers
│       └── translations.js  # Gestione traduzioni
│
├── 📁 assets/               # Risorse statiche
│   ├── 📁 icons/           # Icone app
│   ├── 📁 images/          # Immagini e splash
│   └── 📁 fonts/           # Font personalizzati
│
└── 📁 docs/                # Documentazione progetto
    ├── ACCOUNT_SYSTEM.md   # Sistema di autenticazione
    ├── CHAT_WORKFLOW_STEPS.md # Workflow chat
    └── DOCS.md            # Documentazione tecnica
```

</details>

---

## 🚀 Quick Start

### 📋 Prerequisiti

Prima di iniziare, assicurati di avere installato:

- **Node.js** (v18.0.0 o superiore)
- **npm** o **yarn** come package manager
- **Expo CLI** (`npm install -g @expo/cli`)
- **Expo Go** app sul tuo dispositivo mobile

### ⚡ Installazione Rapida

```bash
# 1. Clona il repository
git clone https://github.com/FedericoLupoli/KnowByDEV.git
cd KnowByV2

# 2. Installa le dipendenze
npm install
# oppure con yarn
yarn install

# 3. Avvia l'ambiente di sviluppo
npm start
# oppure
expo start

# 4. Scansiona il QR code con Expo Go
# per testare su dispositivo fisico
```

### 🔧 Comandi Disponibili

| Comando | Descrizione |
|---------|-------------|
| `npm start` | Avvia il server di sviluppo con LAN |
| `npm run android` | Avvia su emulatore Android |
| `npm run ios` | Avvia su simulatore iOS |
| `npm run web` | Avvia versione web (limitata) |
| `npm run lint` | Esegue controllo qualità codice |

---

---

## 🚀 Avvio rapido

1. **Clona il repository:**
   ```sh
   git clone https://github.com/tuo-utente/KnowByV2.git
   cd KnowByV2
   ```
2. **Installa le dipendenze:**
   ```sh
   npm install
   # oppure
   yarn install
   ```
3. **Avvia l’app su dispositivo mobile:**
   ```sh
   npm start
   # oppure
   expo start
   ```
   Scansiona il QR code con l’app Expo Go su Android/iOS.

---

## 🔗 Integrazione API

L’app si collega al backend [KnowByAPI](https://github.com/FedericoLupoli/KnowByAPI) per mostrare tutor, recensioni e messaggi. Consulta la documentazione API per dettagli su endpoint e parametri.

---

## 🛠️ Dipendenze principali

- **expo**
- **react-native**
- **expo-linear-gradient**
- **@expo/vector-icons**

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

**👨‍� Sviluppato da [Federico Lupoli](https://github.com/FedericoLupoli)**

[![GitHub](https://img.shields.io/badge/GitHub-FedericoLupoli-black?style=for-the-badge&logo=github)](https://github.com/FedericoLupoli)
[![Repository](https://img.shields.io/badge/Repository-KnowByDEV-blue?style=for-the-badge&logo=git)](https://github.com/FedericoLupoli/KnowByDEV)

---

### 🙏 Ringraziamenti

Grazie a tutti i contributori e alla community React Native per il supporto continuo.

**⭐ Se questo progetto ti è stato utile, considera di dargli una stella!**

</div>

---

<div align="center">
<sub>Costruito con ❤️ usando React Native ed Expo</sub>
</div>

- L’app non è utilizzabile su web o tablet/iPad.
- Per aggiungere nuove schermate, crea un nuovo file in `src/screens/` e aggiorna la navigazione.
- Per aggiungere nuovi componenti riutilizzabili, usa `src/components/`.
- Le icone e immagini sono in `assets/`.

---

**KnowBy** © 2025 – Made with ❤️ by Federico Lupoli
