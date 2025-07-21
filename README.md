# KnowByV2

![Expo](https://img.shields.io/badge/Expo-React%20Native-blueviolet?logo=expo)
![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-green)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

KnowByV2 è una mobile app moderna sviluppata con **React Native (Expo)**, progettata per aiutare studenti e tutor a connettersi facilmente. L'app offre una UI elegante, animazioni micro-interattive e un tema scuro con dettagli verdi.

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

```
src/
  components/    // Componenti riutilizzabili (Header, Footer, Body)
  screens/       // Schermate principali (HomeScreen)
  styles/        // File di stile JS
  utils/         // Utility varie
assets/
  icons/         // Icone dell’app
  images/        // Immagini (splash, background, ecc.)
```

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

L’app si collega al backend [KnowByAPI](https://github.com/tuo-utente/KnowByAPI) per mostrare tutor, recensioni e messaggi. Consulta la documentazione API per dettagli su endpoint e parametri.

---

## 🛠️ Dipendenze principali

- **expo**
- **react-native**
- **expo-linear-gradient**
- **@expo/vector-icons**

---

## 🤝 Contribuire

Contributi, segnalazioni di bug e suggerimenti sono benvenuti! Apri una issue o una pull request.

1. Fai fork del progetto
2. Crea un branch per la tua feature (`git checkout -b feature/NomeFeature`)
3. Fai commit delle modifiche (`git commit -am 'Aggiunta nuova feature'`)
4. Push sul branch (`git push origin feature/NomeFeature`)
5. Apri una Pull Request

---

## 📄 Licenza

Questo progetto è distribuito sotto licenza MIT. Vedi il file LICENSE per dettagli.

---

## 📋 Note aggiuntive

- L’app non è utilizzabile su web o tablet/iPad.
- Per aggiungere nuove schermate, crea un nuovo file in `src/screens/` e aggiorna la navigazione.
- Per aggiungere nuovi componenti riutilizzabili, usa `src/components/`.
- Le icone e immagini sono in `assets/`.

---

**KnowBy** © 2025 – Made with ❤️ by Federico Lupoli