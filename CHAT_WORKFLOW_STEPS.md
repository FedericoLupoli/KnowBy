# 🚀 Workflow Implementazione Chat - KnowBy
## Approccio B: API REST + WebSockets

> **Obiettivo**: Implementare sistema di messaggistica real-time tra utenti  
> **Tempo Stimato**: 4-5 giorni  
> **Prerequisiti**: Backend Node.js funzionante, Database MySQL, App React Native

---

## 📋 FASI DI IMPLEMENTAZIONE

### 🔧 FASE 1: PREPARAZIONE BACKEND (Giorno 1 - Mattina)

#### 1.1 Database Schema

##### **Query per tabella `conversations`**
```sql
-- Crea tabella conversazioni
CREATE TABLE conversations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user1_id INT NOT NULL,
    user2_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_message_id INT DEFAULT NULL,
    
    -- Indici per performance
    INDEX idx_user1 (user1_id),
    INDEX idx_user2 (user2_id),
    INDEX idx_users_pair (user1_id, user2_id),
    INDEX idx_updated_at (updated_at),
    
    -- Constraint per evitare conversazioni duplicate
    UNIQUE KEY unique_conversation (LEAST(user1_id, user2_id), GREATEST(user1_id, user2_id)),
    
    -- Foreign Keys
    FOREIGN KEY (user1_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (user2_id) REFERENCES users(id) ON DELETE CASCADE
);
```

##### **Query per modificare tabella `messages`**
```sql
-- Aggiungi nuovi campi alla tabella messages esistente
ALTER TABLE messages 
ADD COLUMN conversation_id INT NOT NULL AFTER id,
ADD COLUMN message_type ENUM('text', 'image', 'file') DEFAULT 'text' AFTER content,
ADD COLUMN read_at TIMESTAMP NULL DEFAULT NULL AFTER sent_at,
ADD COLUMN edited_at TIMESTAMP NULL DEFAULT NULL AFTER read_at,
ADD COLUMN reply_to_message_id INT NULL DEFAULT NULL AFTER edited_at;

-- Aggiungi indici per performance
ALTER TABLE messages
ADD INDEX idx_conversation (conversation_id),
ADD INDEX idx_sender (sender_id),
ADD INDEX idx_receiver (receiver_id),
ADD INDEX idx_read_status (read_at),
ADD INDEX idx_sent_at (sent_at);

-- Aggiungi foreign keys
ALTER TABLE messages
ADD FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
ADD FOREIGN KEY (reply_to_message_id) REFERENCES messages(id) ON DELETE SET NULL;
```

##### **Query per tabella `user_typing` (opzionale)**
```sql
-- Crea tabella per indicatore "sta scrivendo"
CREATE TABLE user_typing (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    conversation_id INT NOT NULL,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Indici
    INDEX idx_conversation_typing (conversation_id),
    INDEX idx_user_typing (user_id),
    INDEX idx_started_at (started_at),
    
    -- Foreign Keys
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
    
    -- Un utente può "scrivere" solo in una conversazione alla volta
    UNIQUE KEY unique_user_typing (user_id, conversation_id)
);
```

##### **Stored Procedures Utili**
```sql
-- Procedure per creare/trovare conversazione
DELIMITER //
CREATE PROCEDURE GetOrCreateConversation(
    IN p_user1_id INT,
    IN p_user2_id INT,
    OUT p_conversation_id INT
)
BEGIN
    DECLARE conv_id INT DEFAULT NULL;
    
    -- Cerca conversazione esistente
    SELECT id INTO conv_id 
    FROM conversations 
    WHERE (user1_id = LEAST(p_user1_id, p_user2_id) AND user2_id = GREATEST(p_user1_id, p_user2_id))
    LIMIT 1;
    
    -- Se non esiste, creala
    IF conv_id IS NULL THEN
        INSERT INTO conversations (user1_id, user2_id) 
        VALUES (LEAST(p_user1_id, p_user2_id), GREATEST(p_user1_id, p_user2_id));
        SET conv_id = LAST_INSERT_ID();
    END IF;
    
    SET p_conversation_id = conv_id;
END //
DELIMITER ;

-- Procedure per contare messaggi non letti
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

-- Procedure per pulizia user_typing scaduti (da eseguire periodicamente)
DELIMITER //
CREATE PROCEDURE CleanupExpiredTyping()
BEGIN
    DELETE FROM user_typing 
    WHERE started_at < DATE_SUB(NOW(), INTERVAL 10 SECOND);
END //
DELIMITER ;
```

- [ ] **Eseguire tutte le query sopra nel database MySQL**
- [ ] **Verificare che le foreign key siano create correttamente**
- [ ] **Testare le stored procedures**

#### 1.2 API Endpoints - Pianificazione
- [ ] **Pianificare endpoint conversazioni**
  - GET `/api/conversations` - Lista conversazioni utente
  - POST `/api/conversations` - Crea nuova conversazione
  
- [ ] **Pianificare endpoint messaggi**
  - GET `/api/conversations/:id/messages` - Messaggi di una conversazione
  - POST `/api/conversations/:id/messages` - Invia nuovo messaggio
  - PUT `/api/messages/:id/read` - Segna come letto
  
- [ ] **Pianificare endpoint typing** (opzionale)
  - POST `/api/conversations/:id/typing` - Stato "sta scrivendo"

---

### 🌐 FASE 2: IMPLEMENTAZIONE API BACKEND (Giorno 1 - Pomeriggio)

#### 2.1 Endpoint Conversazioni

##### **Query per GET `/api/conversations`**
```sql
-- Query principale per lista conversazioni utente
SELECT 
    c.id as conversation_id,
    c.updated_at,
    c.created_at,
    -- Determina l'altro utente nella conversazione
    CASE 
        WHEN c.user1_id = ? THEN u2.id 
        ELSE u1.id 
    END as other_user_id,
    CASE 
        WHEN c.user1_id = ? THEN u2.name 
        ELSE u1.name 
    END as other_user_name,
    CASE 
        WHEN c.user1_id = ? THEN u2.role 
        ELSE u1.role 
    END as other_user_role,
    CASE 
        WHEN c.user1_id = ? THEN u2.email 
        ELSE u1.email 
    END as other_user_email,
    -- Ultimo messaggio
    m.content as last_message,
    m.sent_at as last_message_time,
    m.sender_id as last_message_sender_id,
    m.message_type as last_message_type,
    -- Conteggio messaggi non letti
    (SELECT COUNT(*) 
     FROM messages m2 
     WHERE m2.conversation_id = c.id 
     AND m2.receiver_id = ? 
     AND m2.read_at IS NULL) as unread_count
FROM conversations c
JOIN users u1 ON c.user1_id = u1.id
JOIN users u2 ON c.user2_id = u2.id
LEFT JOIN messages m ON c.last_message_id = m.id
WHERE c.user1_id = ? OR c.user2_id = ?
ORDER BY c.updated_at DESC
LIMIT ? OFFSET ?;

-- Parametri: userId (6 volte), limit, offset
```

##### **Query per POST `/api/conversations`**
```sql
-- Verifica che l'altro utente esista
SELECT id, name, role, email 
FROM users 
WHERE id = ? AND id != ?;

-- Usa la stored procedure per creare/trovare conversazione
CALL GetOrCreateConversation(?, ?, @conversation_id);
SELECT @conversation_id as conversation_id;

-- Query alternativa senza stored procedure
INSERT IGNORE INTO conversations (user1_id, user2_id) 
VALUES (LEAST(?, ?), GREATEST(?, ?));

-- Se non inserito (già esistente), recupera ID
SELECT id FROM conversations 
WHERE user1_id = LEAST(?, ?) AND user2_id = GREATEST(?, ?);
```

#### 2.2 Endpoint Messaggi

##### **Query per GET `/api/conversations/:id/messages`**
```sql
-- Verifica che l'utente faccia parte della conversazione
SELECT id, user1_id, user2_id 
FROM conversations 
WHERE id = ? AND (user1_id = ? OR user2_id = ?);

-- Query messaggi con paginazione
SELECT 
    m.id,
    m.content,
    m.sender_id,
    m.receiver_id,
    m.sent_at,
    m.read_at,
    m.edited_at,
    m.reply_to_message_id,
    m.message_type,
    u.name as sender_name,
    u.role as sender_role,
    -- Se è una risposta, include il messaggio originale
    rm.content as reply_to_content,
    ru.name as reply_to_sender_name
FROM messages m
JOIN users u ON m.sender_id = u.id
LEFT JOIN messages rm ON m.reply_to_message_id = rm.id
LEFT JOIN users ru ON rm.sender_id = ru.id
WHERE m.conversation_id = ?
ORDER BY m.sent_at DESC
LIMIT ? OFFSET ?;

-- Parametri: conversationId, userId, userId, conversationId, limit, offset
```

##### **Query per POST `/api/conversations/:id/messages`**
```sql
-- Verifica conversazione e determina receiver
SELECT user1_id, user2_id 
FROM conversations 
WHERE id = ? AND (user1_id = ? OR user2_id = ?);

-- Inserisci nuovo messaggio
INSERT INTO messages (
    conversation_id, 
    sender_id, 
    receiver_id, 
    content, 
    message_type, 
    reply_to_message_id
) VALUES (?, ?, ?, ?, ?, ?);

-- Aggiorna last_message_id nella conversazione
UPDATE conversations 
SET last_message_id = LAST_INSERT_ID(), updated_at = NOW() 
WHERE id = ?;

-- Recupera il messaggio appena inserito
SELECT 
    m.id,
    m.content,
    m.sender_id,
    m.receiver_id,
    m.sent_at,
    m.message_type,
    m.reply_to_message_id,
    u.name as sender_name,
    u.role as sender_role
FROM messages m
JOIN users u ON m.sender_id = u.id
WHERE m.id = LAST_INSERT_ID();
```

##### **Query per PUT `/api/messages/:id/read`**
```sql
-- Verifica che il messaggio esista e sia destinato all'utente
SELECT id, conversation_id, sender_id, receiver_id, read_at 
FROM messages 
WHERE id = ? AND receiver_id = ?;

-- Aggiorna stato lettura solo se non già letto
UPDATE messages 
SET read_at = NOW() 
WHERE id = ? AND receiver_id = ? AND read_at IS NULL;

-- Query per segnare tutti i messaggi di una conversazione come letti
UPDATE messages 
SET read_at = NOW() 
WHERE conversation_id = ? AND receiver_id = ? AND read_at IS NULL;
```

##### **Query per POST `/api/conversations/:id/typing`**
```sql
-- Inserisci/aggiorna stato "sta scrivendo"
INSERT INTO user_typing (user_id, conversation_id) 
VALUES (?, ?) 
ON DUPLICATE KEY UPDATE started_at = NOW();

-- Rimuovi stato "sta scrivendo"
DELETE FROM user_typing 
WHERE user_id = ? AND conversation_id = ?;

-- Query per ottenere chi sta scrivendo in una conversazione
SELECT ut.user_id, u.name 
FROM user_typing ut
JOIN users u ON ut.user_id = u.id
WHERE ut.conversation_id = ? 
AND ut.user_id != ? 
AND ut.started_at > DATE_SUB(NOW(), INTERVAL 10 SECOND);
```

#### 2.3 Testing API
- [ ] **Testare con Postman/Insomnia**
  - Creare collection di test per tutti gli endpoint
  - Testare scenari di errore (utente non autorizzato, messaggi inesistenti)
  - Verificare formato JSON response

##### **Query di Testing e Debug**
```sql
-- Query per verificare struttura dati
DESCRIBE conversations;
DESCRIBE messages;
DESCRIBE user_typing;

-- Query per debug: mostra tutte le conversazioni con dettagli
SELECT 
    c.id,
    c.user1_id,
    u1.name as user1_name,
    c.user2_id,
    u2.name as user2_name,
    c.created_at,
    c.updated_at,
    c.last_message_id,
    m.content as last_message_content
FROM conversations c
JOIN users u1 ON c.user1_id = u1.id
JOIN users u2 ON c.user2_id = u2.id
LEFT JOIN messages m ON c.last_message_id = m.id
ORDER BY c.updated_at DESC;

-- Query per debug: mostra tutti i messaggi di una conversazione
SELECT 
    m.id,
    m.content,
    m.sender_id,
    u.name as sender_name,
    m.sent_at,
    m.read_at,
    CASE WHEN m.read_at IS NULL THEN 'Non letto' ELSE 'Letto' END as read_status
FROM messages m
JOIN users u ON m.sender_id = u.id
WHERE m.conversation_id = ?
ORDER BY m.sent_at ASC;

-- Query per debug: conteggio messaggi non letti per utente
SELECT 
    c.id as conversation_id,
    COUNT(m.id) as unread_messages
FROM conversations c
LEFT JOIN messages m ON c.id = m.conversation_id 
    AND m.receiver_id = ? 
    AND m.read_at IS NULL
WHERE c.user1_id = ? OR c.user2_id = ?
GROUP BY c.id;

-- Query per pulizia dati di test
-- ATTENZIONE: Usare solo in sviluppo!
DELETE FROM user_typing;
DELETE FROM messages;
DELETE FROM conversations;

-- Reset AUTO_INCREMENT
ALTER TABLE conversations AUTO_INCREMENT = 1;
ALTER TABLE messages AUTO_INCREMENT = 1;
ALTER TABLE user_typing AUTO_INCREMENT = 1;
```

##### **Query per Performance Monitoring**
```sql
-- Analizza performance query conversazioni
EXPLAIN SELECT 
    c.id as conversation_id,
    c.updated_at,
    CASE WHEN c.user1_id = 1 THEN u2.name ELSE u1.name END as other_user_name,
    (SELECT COUNT(*) FROM messages m2 WHERE m2.conversation_id = c.id AND m2.receiver_id = 1 AND m2.read_at IS NULL) as unread_count
FROM conversations c
JOIN users u1 ON c.user1_id = u1.id
JOIN users u2 ON c.user2_id = u2.id
WHERE c.user1_id = 1 OR c.user2_id = 1
ORDER BY c.updated_at DESC;

-- Verifica utilizzo indici
SHOW INDEX FROM conversations;
SHOW INDEX FROM messages;

-- Statistiche tabelle
SELECT 
    TABLE_NAME,
    TABLE_ROWS,
    DATA_LENGTH,
    INDEX_LENGTH
FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = 'knowby_db' 
AND TABLE_NAME IN ('conversations', 'messages', 'user_typing');
```

---

### ⚡ FASE 3: WEBSOCKET SERVER (Giorno 2 - Mattina)

#### 3.1 Setup WebSocket Server
- [ ] **Installare dipendenze WebSocket**
  - `npm install ws socket.io` (scegliere uno dei due)
  - Considerare vantaggi/svantaggi di ciascuno

- [ ] **Creare server WebSocket separato**
  - Porta diversa dal backend principale (es. 8080)
  - Autenticazione JWT nell'handshake
  - Gestione connessioni utente in Map/Set

#### 3.2 Gestione Connessioni
- [ ] **Implementare connection manager**
  - Tracciare connessioni attive per utente
  - Gestire room per conversazioni
  - Auto-reconnect e heartbeat

#### 3.3 Eventi WebSocket
- [ ] **Definire tipi di messaggi WebSocket**
  - `join_conversation` - Entra in room conversazione
  - `leave_conversation` - Esce da room conversazione
  - `typing_start/stop` - Indicatori typing
  - `new_message` - Notifica nuovo messaggio
  - `message_read` - Notifica messaggio letto

#### 3.4 Integrazione con API
- [ ] **Collegare WebSocket con API REST**
  - Quando API salva messaggio → notifica WebSocket
  - Quando API marca come letto → notifica WebSocket
  - Gestire fallback se WebSocket non disponibile

---

### 📱 FASE 4: FRONTEND PREPARATION (Giorno 2 - Pomeriggio)

#### 4.1 Dipendenze Frontend
- [ ] **Installare librerie necessarie**
  - `socket.io-client` o WebSocket nativo
  - `react-native-vector-icons` per icone chat
  - `@react-native-community/netinfo` per status rete
  - `react-native-keyboard-aware-scroll-view`

#### 4.2 Configurazione
- [ ] **Creare file configurazione**
  - `src/config/chat.js` con URL API e WebSocket
  - Costanti per timeout, retry, limiti caratteri
  - Settings per UI (colori, dimensioni)

#### 4.3 Struttura Directory
- [ ] **Organizzare cartelle**
  - `src/screens/` per MessagesScreen, ChatScreen
  - `src/components/chat/` per componenti riutilizzabili
  - `src/services/` per API calls e WebSocket
  - `src/context/` per state management

---

### 🎨 FASE 5: COMPONENTS & SERVICES (Giorno 3)

#### 5.1 Servizi API
- [ ] **Creare `src/services/chatService.js`**
  - Funzioni per chiamare tutti gli endpoint chat
  - Gestione errori e retry automatico
  - Cache locale per performance

- [ ] **Creare `src/services/websocketService.js`**
  - Manager per connessioni WebSocket
  - Auto-reconnect con backoff exponential
  - Event emitter per componenti React

#### 5.2 Context Providers
- [ ] **Implementare ChatContext**
  - State globale per conversazioni e messaggi
  - Funzioni per CRUD operazioni
  - Integration con WebSocket events

- [ ] **Implementare WebSocketContext**
  - Gestione connessione WebSocket
  - Status connessione (connected, reconnecting, failed)
  - Helper functions per join/leave rooms

#### 5.3 Componenti Base
- [ ] **Pianificare componenti chat**
  - `ConversationCard` - Item lista conversazioni
  - `MessageBubble` - Singolo messaggio nella chat
  - `ChatInput` - Input per scrivere messaggi
  - `TypingIndicator` - "Sta scrivendo..."
  - `MessageStatus` - Stato messaggio (inviato/letto)

---

### 📺 FASE 6: SCHERMATE PRINCIPALI (Giorno 4)

#### 6.1 MessagesScreen - Lista Conversazioni
- [ ] **Layout e struttura**
  - Header con titolo "Messaggi"
  - FlatList delle conversazioni
  - Pull-to-refresh e infinite scroll
  - Empty state se nessuna conversazione

- [ ] **Funzionalità**
  - Caricamento conversazioni al mount
  - Navigazione a ChatScreen al tap
  - Badge con conteggio messaggi non letti
  - Swipe actions (elimina, archivia) - opzionale

#### 6.2 ChatScreen - Conversazione Singola
- [ ] **Layout e struttura**
  - Header con nome utente e status online
  - FlatList messaggi con scroll invertito
  - Input fisso in basso con send button
  - Keyboard-aware behavior

- [ ] **Funzionalità**
  - Caricamento messaggi paginato
  - Invio messaggi con feedback visivo
  - Auto-scroll a nuovi messaggi
  - Indicatore typing in tempo reale
  - Segna come letti messaggi visualizzati

#### 6.3 Integrazione WebSocket
- [ ] **Real-time updates**
  - Subscribe a eventi WebSocket quando entra in chat
  - Unsubscribe quando esce dalla chat
  - Update UI in tempo reale per nuovi messaggi
  - Gestire eventi typing di altri utenti

---

### 🔗 FASE 7: NAVIGAZIONE E INTEGRAZIONE (Giorno 4 - Sera)

#### 7.1 Navigation Setup
- [ ] **Aggiornare App.js**
  - Aggiungere ChatProvider e WebSocketProvider
  - Wrappare navigation con provider
  - Aggiungere nuove screen nel Stack.Navigator

- [ ] **Definire navigation flow**
  - HomeScreen → MessagesScreen (nuovo tab)
  - MessagesScreen → ChatScreen
  - TutorCard → ChatScreen (diretto)
  - ProfilePage → MessagesScreen

#### 7.2 Footer Update
- [ ] **Aggiungere icona Messaggi**
  - Quarta icona nel Footer component
  - Badge per messaggi non letti totali
  - Highlight quando attiva

#### 7.3 TutorCard Integration
- [ ] **Modificare pulsante messaggio**
  - Rimuovere alert placeholder
  - Navigare direttamente a chat con quel tutor
  - Creare conversazione se non esiste

---

### 🧪 FASE 8: TESTING E DEBUG (Giorno 5)

#### 8.1 Testing Scenarios
- [ ] **Test flusso completo**
  - Registrazione → Login → Cerca tutor → Avvia chat
  - Invio messaggi bidirezionale
  - Refresh app con chat attive
  - Reconnect WebSocket dopo perdita connessione

- [ ] **Test edge cases**
  - Connessione internet instabile
  - App in background/foreground
  - Messaggi molto lunghi
  - Utente non esistente

#### 8.2 Performance Testing
- [ ] **Ottimizzazioni**
  - Memory leaks nei WebSocket
  - Performance FlatList con molti messaggi
  - Paginazione efficiente
  - Cache gestione conversazioni

#### 8.3 UI/UX Polish
- [ ] **Miglioramenti interfaccia**
  - Loading states appropriati
  - Error handling user-friendly
  - Animazioni smooth
  - Dark theme consistency

---

### 🚀 FASE 9: DEPLOY E MONITORAGGIO (Giorno 5 - Fine)

#### 9.1 Backend Deploy
- [ ] **Setup produzione**
  - Configurare WebSocket server su VPS
  - Reverse proxy per WebSocket (nginx)
  - SSL certificate per wss://
  - Monitor logs e performance

#### 9.2 Frontend Build
- [ ] **Test finale**
  - Build produzione Expo
  - Test su dispositivi reali
  - Verificare performance su network lenti
  - Test notifiche (se implementate)

#### 9.3 Documentation
- [ ] **Documentare implementazione**
  - API documentation aggiornata
  - Setup instructions per sviluppatori
  - Troubleshooting guide
  - Performance best practices

---

## 🎯 PRIORITÀ E FOCUS

### ✅ MUST HAVE (Core Features)
1. Lista conversazioni funzionante
2. Chat 1-on-1 con messaggi real-time
3. Integrazione con TutorCard
4. Stato letto/non letto messaggi

### 🔥 SHOULD HAVE (Enhanced UX)
1. Indicatore "sta scrivendo"
2. Auto-reconnect WebSocket robusto
3. Performance ottimizzate (paginazione, cache)
4. Error handling completo

### 💡 COULD HAVE (Future Enhancements)
1. Messaggi vocali
2. Condivisione immagini
3. Notifiche push
4. Ricerca nelle conversazioni
5. Chat di gruppo

---

## 🔧 TROUBLESHOOTING CHECKLIST

### Backend Issues
- [ ] Database connection pooling configurato
- [ ] JWT secret uguale tra API e WebSocket
- [ ] CORS configurato per frontend domain
- [ ] Rate limiting per evitare spam

### WebSocket Issues  
- [ ] Firewall aperto su porta WebSocket
- [ ] SSL configurato per wss:// in produzione
- [ ] Heartbeat/ping configurato correttamente
- [ ] Memory leaks nelle Map di connessioni

### Frontend Issues
- [ ] Network permission su Android
- [ ] AsyncStorage access per JWT
- [ ] Keyboard behavior su iOS/Android
- [ ] FlatList performance con VirtualizedList

---

## 📚 QUERY DI MANUTENZIONE E OTTIMIZZAZIONE

### Query per Manutenzione Periodica
```sql
-- Pulizia user_typing scaduti (eseguire ogni minuto via cron)
DELETE FROM user_typing 
WHERE started_at < DATE_SUB(NOW(), INTERVAL 30 SECOND);

-- Archivia conversazioni vecchie senza attività (opzionale)
UPDATE conversations 
SET archived = 1 
WHERE updated_at < DATE_SUB(NOW(), INTERVAL 6 MONTH)
AND last_message_id IS NOT NULL;

-- Elimina messaggi molto vecchi (solo se necessario)
DELETE FROM messages 
WHERE sent_at < DATE_SUB(NOW(), INTERVAL 2 YEAR);
```

### Query per Ottimizzazione Performance
```sql
-- Analizza query lente
SELECT 
    sql_text,
    execution_count,
    avg_timer_wait/1000000000 as avg_time_seconds
FROM performance_schema.events_statements_summary_by_digest 
WHERE sql_text LIKE '%conversations%' OR sql_text LIKE '%messages%'
ORDER BY avg_timer_wait DESC
LIMIT 10;

-- Ottimizza tabelle
OPTIMIZE TABLE conversations;
OPTIMIZE TABLE messages;
OPTIMIZE TABLE user_typing;

-- Analizza cardinalità indici
SELECT 
    TABLE_NAME,
    INDEX_NAME,
    CARDINALITY,
    SUB_PART,
    NULLABLE
FROM information_schema.STATISTICS 
WHERE TABLE_SCHEMA = 'knowby_db'
AND TABLE_NAME IN ('conversations', 'messages')
ORDER BY TABLE_NAME, INDEX_NAME;
```

### Query per Monitoring e Statistiche
```sql
-- Statistiche generali chat
SELECT 
    (SELECT COUNT(*) FROM conversations) as total_conversations,
    (SELECT COUNT(*) FROM messages) as total_messages,
    (SELECT COUNT(*) FROM messages WHERE read_at IS NULL) as unread_messages,
    (SELECT COUNT(*) FROM user_typing) as users_currently_typing;

-- Top 10 utenti più attivi in chat
SELECT 
    u.id,
    u.name,
    COUNT(m.id) as messages_sent,
    MAX(m.sent_at) as last_message_time
FROM users u
JOIN messages m ON u.id = m.sender_id
GROUP BY u.id, u.name
ORDER BY messages_sent DESC
LIMIT 10;

-- Conversazioni più attive
SELECT 
    c.id,
    CONCAT(u1.name, ' <-> ', u2.name) as participants,
    COUNT(m.id) as message_count,
    MAX(m.sent_at) as last_activity
FROM conversations c
JOIN users u1 ON c.user1_id = u1.id
JOIN users u2 ON c.user2_id = u2.id
LEFT JOIN messages m ON c.id = m.conversation_id
GROUP BY c.id, u1.name, u2.name
HAVING message_count > 0
ORDER BY message_count DESC
LIMIT 10;

-- Utilizzo chat per fasce orarie
SELECT 
    HOUR(sent_at) as hour_of_day,
    COUNT(*) as message_count
FROM messages 
WHERE sent_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
GROUP BY HOUR(sent_at)
ORDER BY hour_of_day;
```

### Backup e Recovery
```sql
-- Backup specifico tabelle chat
CREATE TABLE conversations_backup AS SELECT * FROM conversations;
CREATE TABLE messages_backup AS SELECT * FROM messages;

-- Export per backup esterno
SELECT * FROM conversations 
INTO OUTFILE '/tmp/conversations_backup.csv'
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n';

-- Verifica integrità referenziale
SELECT 'conversations_orphaned' as type, COUNT(*) as count
FROM conversations c
LEFT JOIN users u1 ON c.user1_id = u1.id
LEFT JOIN users u2 ON c.user2_id = u2.id
WHERE u1.id IS NULL OR u2.id IS NULL

UNION ALL

SELECT 'messages_orphaned' as type, COUNT(*) as count
FROM messages m
LEFT JOIN conversations c ON m.conversation_id = c.id
WHERE c.id IS NULL

UNION ALL

SELECT 'messages_invalid_users' as type, COUNT(*) as count
FROM messages m
LEFT JOIN users u1 ON m.sender_id = u1.id
LEFT JOIN users u2 ON m.receiver_id = u2.id
WHERE u1.id IS NULL OR u2.id IS NULL;
```

---

## 📊 METRICS DI SUCCESSO

### Funzionalità
- ✅ Utente può vedere lista conversazioni
- ✅ Utente può inviare/ricevere messaggi in real-time  
- ✅ Messaggi persistiti correttamente nel database
- ✅ WebSocket reconnect automatico funziona
- ✅ UI responsive e user-friendly

### Performance
- ⚡ Lista conversazioni carica in <2 secondi
- ⚡ Invio messaggio con feedback in <500ms
- ⚡ WebSocket reconnect in <5 secondi
- ⚡ App non crasha con 100+ messaggi

### UX
- 😊 Flusso intuitivo per avviare chat
- 😊 Visual feedback chiaro per azioni utente
- 😊 Error states informativi
- 😊 Comportamento coerente con resto app

---

**🎯 Focus**: Implementa step by step, testa ogni fase prima di procedere alla successiva. Non saltare il testing dei singoli componenti!
