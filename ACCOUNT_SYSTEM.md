# Sistema di Account per KnowBy

KnowBy è una piattaforma mobile di ricerca tutoring per ogni materia scolastica. Ogni persona può registrarsi come **utente** (studente) o **tutor**. L’app prevede:
- Sistema di## Integrazione con l'App

### A## Suggerimenti Pratici

### Sviluppo e Testing
- Testa sempre le API con Postman/Insomnia prima di integrarle nell'app
- Prevedi endpoint per reset password e verifica email
- Logga gli accessi e gli errori lato server
- Aggiorna regolarmente le dipendenze del backend

### Sistema Messaggistica
- **WebSocket**: Usa Socket.io o WebSocket nativo per real-time
- **Database Optimization**: Implementa indici per performance messaggi
- **Stored Procedures**: Usa procedure per operazioni complesse
- **Connection Pooling**: Configura pool connessioni database
- **Rate Limiting**: Previeni spam nei messaggi
- **Message Encryption**: Considera cifratura end-to-end per sicurezza
- **File Upload**: Implementa upload sicuro per immagini/file
- **Backup Strategy**: Backup regolari delle conversazioni

### Monitoring e Manutenzione
- Monitor performance query messaggi
- Cleanup automatico typing indicators scaduti
- Archiviazione conversazioni vecchie
- Monitoraggio connessioni WebSocket attiveazione
- Usa `fetch` o librerie come `axios` per chiamare le API dal frontend
- Salva il JWT in modo sicuro (es. AsyncStorage)
- Invia il JWT nell'header `Authorization` per le richieste protette
- Mostra UI differenziata per studente/tutor

### Sistema Messaggistica
- **WebSocket Connection**: Stabilisci connessione WebSocket per real-time
- **Gestione Conversazioni**: Carica e organizza le conversazioni dell'utente
- **Real-time Messages**: Ricevi messaggi istantaneamente via WebSocket
- **Typing Indicators**: Mostra quando l'altro utente sta scrivendo
- **Read Status**: Gestisci stato letto/non letto dei messaggi
- **Auto-reconnect**: Implementa riconnessione automatica WebSocket
- **Offline Support**: Cache messaggi localmente per uso offline

### Performance e UX
- Implementa paginazione per messaggi e conversazioni
- Cache conversazioni recenti per accesso veloce
- Comprimi immagini prima dell'invio
- Gestisci keyboard-aware scroll nelle chat
- Implementa pull-to-refresh nelle listeioni e votazioni dei tutor da parte degli utenti
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

## Struttura delle Tabelle MySQL

### Tabelle Base
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
```

### Sistema Messaggistica Avanzato
```sql
-- Tabella conversazioni per organizzare i messaggi
CREATE TABLE conversations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user1_id INT NOT NULL,
  user2_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_message_id INT DEFAULT NULL,
  INDEX idx_user1 (user1_id),
  INDEX idx_user2 (user2_id),
  INDEX idx_users_pair (user1_id, user2_id),
  INDEX idx_updated_at (updated_at),
  FOREIGN KEY (user1_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (user2_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabella messaggi estesa con nuove funzionalità
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  conversation_id INT NOT NULL,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  content TEXT NOT NULL,
  message_type ENUM('text', 'image', 'file') DEFAULT 'text',
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP NULL DEFAULT NULL,
  edited_at TIMESTAMP NULL DEFAULT NULL,
  reply_to_message_id INT NULL DEFAULT NULL,
  INDEX idx_conversation (conversation_id),
  INDEX idx_sender (sender_id),
  INDEX idx_receiver (receiver_id),
  INDEX idx_read_status (read_at),
  INDEX idx_sent_at (sent_at),
  FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (reply_to_message_id) REFERENCES messages(id) ON DELETE SET NULL
);

-- Tabella per indicatore "sta scrivendo"
CREATE TABLE user_typing (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  conversation_id INT NOT NULL,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_conversation_typing (conversation_id),
  INDEX idx_user_typing (user_id),
  INDEX idx_started_at (started_at),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_typing (user_id, conversation_id)
);
```

### Stored Procedures per Efficienza
```sql
-- Procedure per gestire conversazioni
DELIMITER //
CREATE PROCEDURE GetOrCreateConversation(
    IN p_user1_id INT,
    IN p_user2_id INT,
    OUT p_conversation_id INT
)
BEGIN
    DECLARE conv_id INT DEFAULT NULL;
    SELECT id INTO conv_id 
    FROM conversations 
    WHERE (user1_id = LEAST(p_user1_id, p_user2_id) AND user2_id = GREATEST(p_user1_id, p_user2_id))
    LIMIT 1;
    
    IF conv_id IS NULL THEN
        INSERT INTO conversations (user1_id, user2_id) 
        VALUES (LEAST(p_user1_id, p_user2_id), GREATEST(p_user1_id, p_user2_id));
        SET conv_id = LAST_INSERT_ID();
    END IF;
    
    SET p_conversation_id = conv_id;
END //
DELIMITER ;

-- Procedure per conteggio messaggi non letti
DELIMITER //
CREATE PROCEDURE GetUnreadMessagesCount(
    IN p_user_id INT,
    IN p_conversation_id INT,
    OUT p_unread_count INT
)
BEGIN
    SELECT COUNT(*) INTO p_unread_count
    FROM messages 
    WHERE conversation_id = p_conversation_id 
    AND receiver_id = p_user_id 
    AND read_at IS NULL;
END //
DELIMITER ;
```
---

## Esempio di Endpoint API

### Autenticazione
- `POST /api/register` — Registra un nuovo utente/tutor
- `POST /api/login` — Login utente/tutor, restituisce JWT
- `GET /api/profile` — Restituisce dati utente (protetto da JWT)

### Ricerca e Recensioni
- `POST /api/review` — Invia una recensione a un tutor
- `GET /api/tutors` — Ricerca tutor per materia

### Sistema Messaggistica Real-time
- `GET /api/conversations` — Lista conversazioni dell'utente
- `POST /api/conversations` — Crea nuova conversazione
- `GET /api/conversations/:id/messages` — Messaggi di una conversazione
- `POST /api/conversations/:id/messages` — Invia nuovo messaggio
- `PUT /api/messages/:id/read` — Segna messaggio come letto
- `POST /api/conversations/:id/typing` — Gestisce stato "sta scrivendo"

### WebSocket Events (Real-time)
- `join_conversation` — Entra in room conversazione
- `leave_conversation` — Esce da room conversazione
- `typing_start/stop` — Indicatori typing
- `new_message` — Notifica nuovo messaggio
- `message_read` — Notifica messaggio letto

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

## Roadmap Funzionalità

### Fase 1 - Core (Completato ✅)
- [x] Registrazione/login utente e tutor
- [x] Database schema per messaggistica avanzata
- [x] Stored procedures per performance

### Fase 2 - Sistema Messaggistica (In Corso 🔄)
- [ ] API REST per conversazioni e messaggi
- [ ] WebSocket server per real-time
- [ ] Frontend React Native per chat
- [ ] Indicatori typing e read status

### Fase 3 - Funzionalità Base
- [ ] Ricerca tutor per materia
- [ ] Sistema recensioni e voti
- [ ] Integrazione chat con TutorCard

### Fase 4 - Funzionalità Avanzate
- [ ] Notifiche push
- [ ] Upload immagini/file in chat
- [ ] Dashboard tutor e storico conversazioni
- [ ] Backup e archiviazione messaggi

### Fase 5 - Ottimizzazioni
- [ ] Cache e performance optimization
- [ ] Monitoring e analytics
- [ ] Security audit e penetration testing
- [ ] Load balancing e scalabilità

---

## Risorse Utili

### Autenticazione e Backend Base
- [Node.js + MySQL + JWT Tutorial](https://jasonwatmore.com/post/2020/07/18/nodejs-mysql-authentication-api-with-jwt)
- [bcrypt npm](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken npm](https://www.npmjs.com/package/jsonwebtoken)

### Sistema Messaggistica Real-time
- [Socket.io Documentation](https://socket.io/docs/v4/)
- [WebSocket per Node.js](https://www.npmjs.com/package/ws)
- [React Native WebSocket](https://reactnative.dev/docs/network#websocket-support)
- [Socket.io Client React Native](https://www.npmjs.com/package/socket.io-client)

### Database e Performance
- [MySQL Performance Tuning](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)
- [Database Indexing Best Practices](https://dev.mysql.com/doc/refman/8.0/en/mysql-indexes.html)
- [Connection Pooling Node.js](https://www.npmjs.com/package/mysql2)

### React Native Chat UI
- [react-native-gifted-chat](https://github.com/FaridSafi/react-native-gifted-chat)
- [react-native-keyboard-aware-scroll-view](https://github.com/APSL/react-native-keyboard-aware-scroll-view)
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)

---

Se vuoi un esempio di codice backend pronto all’uso per una di queste funzionalità, chiedi pure! 
