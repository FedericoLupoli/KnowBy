# KnowByV2

KnowByV2 è una mobile app sviluppata con React Native (Expo), progettata per funzionare **solo su smartphone Android/iOS**. L'app offre una UI moderna con header, body e un footer “volante” con pulsanti-icona.

## Funzionalità principali

- **Header**: Gradient moderno, titolo dell’app.
- **Body**: Area centrale per i contenuti (attualmente placeholder).
- **Footer volante**: Pulsanti-icona (Home, Search, User, Settings) ancorati in basso, con effetto floating e selezione attiva.
- **Responsive**: UI ottimizzata per qualsiasi smartphone.
- **Blocco tablet/web**: L’app mostra un messaggio di blocco se aperta su tablet, iPad o web.

## Struttura delle cartelle

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

## Avvio rapido

1. Installa le dipendenze:
   ```
   npm install
   ```
2. Avvia l’app su dispositivo mobile:
   ```
   npm start
   ```
   oppure
   ```
   expo start
   ```

## Dipendenze principali

- **expo**
- **react-native**
- **expo-linear-gradient**
- **@expo/vector-icons**

## Note

- L’app non è utilizzabile su web o tablet/iPad.
- Per aggiungere nuove schermate, crea un nuovo file in `src/screens/` e aggiorna la navigazione.
- Per aggiungere nuovi componenti riutilizzabili, usa `src/components/`.

---

## Prossimi passi consigliati

- Separare Header, Footer e Body in componenti dedicati in `src/components/`.
- Spostare la logica della schermata principale in `src/screens/HomeScreen.js`.
- Aggiornare i path degli import di stili e componenti.
- Spostare le icone e immagini nelle rispettive sottocartelle in `assets/`. 