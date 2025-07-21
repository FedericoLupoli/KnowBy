# Sistema di Account per KnowBy

KnowBy è una piattaforma mobile di ricerca tutoring per ogni materia scolastica. Ogni persona può registrarsi come **utente** (studente) o **tutor**. L’app prevede:
- Sistema di recensioni e votazioni dei tutor da parte degli utenti
- Messaggistica tra tutor e studente
- (In futuro: altre funzionalità evolute)

Questa guida spiega come strutturare il sistema di account e autenticazione per supportare queste funzionalità, usando una VPS con database MySQL.

---

## Architettura Consigliata

- **Frontend (Mobile App):** React Native/Expo (già esistente)
- **Backend (API):** Node.js (Express) oppure Python (FastAPI/Flask)
- **Database:** MySQL su VPS
- **Autenticazione:** JWT (JSON Web Token)
- **Sicurezza:** HTTPS, hashing password, CORS, rate limiting
- **Servizi aggiuntivi:**
  - Sistema di messaggistica (es. WebSocket, Firebase, o custom)
  - Gestione ruoli (utente/tutor)
  - Sistema di recensioni e voti

---

## Flusso di Registrazione e Login

1. **Registrazione**
   - L’utente sceglie se registrarsi come studente o tutor
   - Inserisce email, password, dati profilo (es. nome, materia, bio per tutor)
   - Il backend valida i dati, cripta la password (es. bcrypt) e salva l’utente nel database, assegnando il ruolo
   - Risposta: conferma registrazione o errore

2. **Login**
   - L’utente invia email e password all’API
   - Il backend verifica le credenziali
   - Se corrette, genera un JWT con info su ruolo e id utente
   - Il client salva il token (es. AsyncStorage)

3. **Accesso a risorse protette**
   - Il client invia il JWT nelle richieste API
   - Il backend verifica il token e il ruolo prima di rispondere

---

## Struttura delle Tabelle MySQL (Esempio semplificato)

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('student', 'tutor','admin') NOT NULL,
  name VARCHAR(255),
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tutor_id INT NOT NULL,
  student_id INT NOT NULL,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tutor_id) REFERENCES users(id),
  FOREIGN KEY (student_id) REFERENCES users(id)
);

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  content TEXT NOT NULL,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (receiver_id) REFERENCES users(id)
);
```

---

## Esempio di Endpoint API

- `POST /api/register` — Registra un nuovo utente/tutor
- `POST /api/login` — Login utente/tutor, restituisce JWT
- `GET /api/profile` — Restituisce dati utente (protetto da JWT)
- `POST /api/review` — Invia una recensione a un tutor
- `GET /api/tutors` — Ricerca tutor per materia
- `POST /api/message` — Invia un messaggio
- `GET /api/messages` — Recupera conversazioni

---

## Sicurezza

- **Hashing password:** usa sempre bcrypt o argon2
- **HTTPS:** obbligatorio in produzione
- **CORS:** limita i domini che possono accedere all’API
- **Rate limiting:** previene brute force
- **Validazione input:** sempre, sia lato client che server
- **Controllo ruoli:** verifica che solo i tutor possano ricevere recensioni

---

## Integrazione con l’App

- Usa `fetch` o librerie come `axios` per chiamare le API dal frontend
- Salva il JWT in modo sicuro (es. AsyncStorage)
- Invia il JWT nell’header `Authorization` per le richieste protette
- Mostra UI differenziata per studente/tutor
- Gestisci la logica di ricerca, recensioni e messaggi tramite chiamate API

---

## Suggerimenti Pratici

- Testa sempre le API con Postman/Insomnia prima di integrarle nell’app
- Prevedi endpoint per reset password e verifica email
- Logga gli accessi e gli errori lato server
- Aggiorna regolarmente le dipendenze del backend
- Per la messaggistica, valuta WebSocket o servizi esterni per real-time

---

## Roadmap Funzionalità (Esempio)
- [ ] Registrazione/login utente e tutor
- [ ] Ricerca tutor per materia
- [ ] Sistema recensioni e voti
- [ ] Messaggistica tutor-studente
- [ ] Notifiche push
- [ ] Dashboard tutor e storico lezioni
- [ ] Funzionalità avanzate (da definire)

---

## Risorse Utili
- [Node.js + MySQL + JWT Tutorial](https://jasonwatmore.com/post/2020/07/18/nodejs-mysql-authentication-api-with-jwt)
- [bcrypt npm](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken npm](https://www.npmjs.com/package/jsonwebtoken)
- [WebSocket per Node.js](https://www.npmjs.com/package/ws)

---

Se vuoi un esempio di codice backend pronto all’uso per una di queste funzionalità, chiedi pure! 