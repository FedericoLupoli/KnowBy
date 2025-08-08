# KnowByAPI - Documentazione API

## Informazioni generali
- **Base URL**: `http://localhost:3000/api` (sviluppo) / `http://66.118.245.111/api` (produzione)
- **Versione**: 1.0.0
- **Formato**: JSON
- **Autenticazione**: JWT Bearer Token

---

## Autenticazione

### Registrazione utente/tutor/admin
**POST** `/register`

Registra un nuovo utente, tutor o admin nel sistema.

#### Parametri richiesti
```json
{
  "email": "string (obbligatorio)",
  "password": "string (obbligatorio, min 6 caratteri)",
  "name": "string (obbligatorio)",
  "role": "string (obbligatorio, 'student', 'tutor' o 'admin')",
  "bio": "string (opzionale, solo per tutor)",
  "subject": "string (obbligatorio solo per tutor, es: 'Matematica')",
  "hourlyRate": "number (opzionale solo per tutor, es: 25.5)"
}
```

#### Esempio richiesta (tutor)
```json
{
  "email": "tutor1@email.com",
  "password": "password123",
  "name": "Mario Rossi",
  "role": "tutor",
  "bio": "Esperto in matematica con 5 anni di esperienza",
  "subject": "Matematica",
  "hourlyRate": 25
}
```

#### Esempio richiesta (studente)
```json
{
  "email": "studente@email.com",
  "password": "password123",
  "name": "Giulia Bianchi",
  "role": "student"
}
```

#### Risposta di successo (201)
```json
{
  "message": "Utente registrato con successo",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "tutor1@email.com",
    "name": "Mario Rossi",
    "role": "tutor",
    "subject": "Matematica",
    "hourlyRate": 25
  }
}
```

#### Risposta di errore (400) - manca subject per tutor
```json
{
  "error": "La materia (subject) è obbligatoria per i tutor"
}
```

#### Risposta di errore (400) - hourlyRate non valido
```json
{
  "error": "La tariffa oraria (hourlyRate) deve essere un numero positivo"
}
```

---

### Login
**POST** `/login`

Autentica un utente esistente (studente, tutor o admin).

#### Parametri richiesti
```json
{
  "email": "string (obbligatorio)",
  "password": "string (obbligatorio)"
}
```

#### Esempio richiesta
```json
{
  "email": "mario.rossi@email.com",
  "password": "password123"
}
```

#### Risposta di successo (200)
```json
{
  "message": "Login effettuato con successo",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "mario.rossi@email.com",
    "name": "Mario Rossi",
    "role": "tutor"
  }
}
```

#### Risposta di errore (401)
```json
{
  "error": "Credenziali non valide"
}
```

---

### Profilo utente corrente
**GET** `/me`

Ottiene i dati dell'utente attualmente autenticato.

#### Headers
```
Authorization: Bearer <jwt_token>
```

#### Esempio richiesta
```
GET /api/me
```

#### Risposta di successo (200) - Tutor
```json
{
  "user": {
    "id": 1,
    "email": "mario.rossi@email.com",
    "name": "Mario Rossi",
    "role": "tutor",
    "bio": "Esperto in matematica con 5 anni di esperienza",
    "subject": "Matematica",
    "hourlyRate": 25,
    "rating": 4.5,
    "location": "Milano",
    "pro": true,
    "createdAt": "2024-01-10T10:30:00.000Z"
  }
}
```

#### Risposta di successo (200) - Studente
```json
{
  "user": {
    "id": 2,
    "email": "giulia.bianchi@email.com",
    "name": "Giulia Bianchi",
    "role": "student",
    "bio": "Studentessa universitaria",
    "location": "Roma",
    "pro": false,
    "createdAt": "2024-01-12T14:20:00.000Z"
  }
}
```

#### Risposta di errore (401)
```json
{
  "error": "Token mancante o non valido"
}
```

#### Risposta di errore (404)
```json
{
  "error": "Utente non trovato"
}
```

#### Note
- Questo endpoint restituisce tutti i dati dell'utente autenticato
- I campi restituiti variano in base al ruolo (tutor vs student)
- Utile per popolare il profilo utente nell'app

---

## Gestione Tutor

### Ricerca tutor
**GET** `/tutors`

Cerca tutor disponibili con filtri opzionali.

#### Parametri query
- `subject` (opzionale): Materia di insegnamento
- `rating` (opzionale): Rating minimo (1-5)
- `location` (opzionale): Località del tutor

#### Esempio richiesta
```
GET /api/tutors?subject=matematica&rating=4
```

#### Risposta di successo (200)
```json
{
  "message": "Ricerca tutor",
  "tutors": [
    {
      "id": 1,
      "name": "Mario Rossi",
      "bio": "Esperto in matematica con 5 anni di esperienza",
      "role": "tutor",
      "subject": "Matematica",
      "rating": 4.5,
      "location": "Milano"
    },
    {
      "id": 2,
      "name": "Luca Verdi",
      "bio": "Tutor di fisica e matematica",
      "role": "tutor",
      "subject": "Fisica",
      "rating": 4.2,
      "location": "Roma"
    }
  ]
}
```

---

### Profilo tutor specifico
**GET** `/tutors/{id}`

Ottiene il profilo dettagliato di un tutor specifico.

#### Parametri path
- `id` (obbligatorio): ID del tutor

#### Esempio richiesta
```
GET /api/tutors/1
```

#### Risposta di successo (200)
```json
{
  "message": "Profilo tutor",
  "tutor": {
    "id": 1,
    "name": "Mario Rossi",
    "bio": "Esperto in matematica con 5 anni di esperienza",
    "role": "tutor",
    "subject": "Matematica",
    "rating": 4.5,
    "hourlyRate": 25
  }
}
```

#### Risposta di errore (404)
```json
{
  "error": "Tutor non trovato"
}
```

---

## Sistema Recensioni

### Invia recensione
**POST** `/review`

Invia una recensione a un tutor (richiede autenticazione).

#### Headers
```
Authorization: Bearer <jwt_token>
```

#### Parametri richiesti
```json
{
  "tutorId": "number (obbligatorio)",
  "rating": "number (obbligatorio, 1-5)",
  "comment": "string (opzionale)"
}
```

#### Esempio richiesta
```json
{
  "tutorId": 1,
  "rating": 5,
  "comment": "Ottimo tutor, molto chiaro nelle spiegazioni"
}
```

#### Risposta di successo (201)
```json
{
  "message": "Recensione creata - placeholder",
  "review": {
    "id": 1,
    "tutorId": 1,
    "studentId": 2,
    "rating": 5,
    "comment": "Ottimo tutor, molto chiaro nelle spiegazioni",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### Recensioni di un tutor
**GET** `/reviews/{tutorId}`

Ottiene tutte le recensioni di un tutor specifico.

#### Parametri path
- `tutorId` (obbligatorio): ID del tutor

#### Esempio richiesta
```
GET /api/reviews/1
```

#### Risposta di successo (200)
```json
{
  "message": "Recensioni tutor - placeholder",
  "reviews": [
    {
      "id": 1,
      "tutorId": 1,
      "studentName": "Giulia Bianchi",
      "rating": 5,
      "comment": "Ottimo tutor, molto chiaro nelle spiegazioni",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

## Sistema Conversazioni e Messaggistica

### Lista conversazioni utente
**GET** `/conversations`

Ottiene tutte le conversazioni dell'utente autenticato con paginazione.

#### Headers
```
Authorization: Bearer <jwt_token>
```

#### Parametri query (opzionali)
- `page`: Numero di pagina (default: 1)
- `limit`: Elementi per pagina (default: 10, max: 50)

#### Esempio richiesta
```
GET /api/conversations?page=1&limit=10
```

#### Risposta di successo (200)
```json
{
  "message": "Lista conversazioni recuperata con successo",
  "conversations": [
    {
      "id": 1,
      "otherUser": {
        "id": 2,
        "name": "Mario Rossi",
        "role": "tutor",
        "email": "mario@email.com"
      },
      "lastMessage": "Perfetto, ci sentiamo domani!",
      "lastMessageTime": "2024-01-15T10:30:00.000Z",
      "lastMessageSenderId": 2,
      "lastMessageType": "text",
      "unreadCount": 2,
      "createdAt": "2024-01-10T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

### Crea nuova conversazione
**POST** `/conversations`

Crea una nuova conversazione con un altro utente o restituisce quella esistente.

#### Headers
```
Authorization: Bearer <jwt_token>
```

#### Parametri richiesti
```json
{
  "otherUserId": "number (obbligatorio)"
}
```

#### Esempio richiesta
```json
{
  "otherUserId": 2
}
```

#### Risposta di successo (201 - nuova / 200 - esistente)
```json
{
  "message": "Conversazione creata con successo",
  "conversation": {
    "id": 1,
    "otherUser": {
      "id": 2,
      "name": "Mario Rossi",
      "role": "tutor",
      "email": "mario@email.com"
    },
    "lastMessage": null,
    "lastMessageTime": null,
    "unreadCount": 0,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Errori possibili
- **400**: "Non puoi creare una conversazione con te stesso"
- **404**: "Utente non trovato"

---

### Messaggi di una conversazione
**GET** `/conversations/{id}/messages`

Ottiene tutti i messaggi di una conversazione specifica con paginazione.

#### Headers
```
Authorization: Bearer <jwt_token>
```

#### Parametri path
- `id` (obbligatorio): ID della conversazione

#### Parametri query (opzionali)
- `page`: Numero di pagina (default: 1)
- `limit`: Elementi per pagina (default: 20, max: 100)

#### Esempio richiesta
```
GET /api/conversations/1/messages?page=1&limit=20
```

#### Risposta di successo (200)
```json
{
  "message": "Messaggi conversazione recuperati con successo",
  "conversation": {
    "id": 1,
    "otherUser": {
      "id": 2,
      "name": "Mario Rossi",
      "role": "tutor"
    }
  },
  "messages": [
    {
      "id": 1,
      "content": "Ciao! Hai disponibilità per una lezione di matematica?",
      "senderId": 1,
      "receiverId": 2,
      "senderName": "Giulia Bianchi",
      "senderRole": "student",
      "sentAt": "2024-01-15T09:30:00.000Z",
      "readAt": "2024-01-15T10:00:00.000Z",
      "editedAt": null,
      "messageType": "text",
      "replyToMessageId": null,
      "replyToContent": null,
      "replyToSenderName": null
    },
    {
      "id": 2,
      "content": "Sì, sono disponibile! Quando preferisci?",
      "senderId": 2,
      "receiverId": 1,
      "senderName": "Mario Rossi",
      "senderRole": "tutor",
      "sentAt": "2024-01-15T10:30:00.000Z",
      "readAt": null,
      "editedAt": null,
      "messageType": "text",
      "replyToMessageId": 1,
      "replyToContent": "Ciao! Hai disponibilità per una lezione di matematica?",
      "replyToSenderName": "Giulia Bianchi"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

#### Errori possibili
- **403**: "Non autorizzato ad accedere a questa conversazione"

---

### Invia messaggio
**POST** `/conversations/{id}/messages`

Invia un nuovo messaggio in una conversazione.

#### Headers
```
Authorization: Bearer <jwt_token>
```

#### Parametri path
- `id` (obbligatorio): ID della conversazione

#### Parametri richiesti
```json
{
  "content": "string (obbligatorio, max 2000 caratteri)",
  "messageType": "string (opzionale: 'text', 'image', 'file', default: 'text')",
  "replyToMessageId": "number (opzionale)"
}
```

#### Esempio richiesta - Messaggio normale
```json
{
  "content": "Perfetto! Possiamo fare domani alle 15:00?",
  "messageType": "text"
}
```

#### Esempio richiesta - Risposta a messaggio
```json
{
  "content": "Sì, va benissimo!",
  "messageType": "text",
  "replyToMessageId": 5
}
```

#### Risposta di successo (201)
```json
{
  "message": "Messaggio inviato con successo",
  "messageData": {
    "id": 3,
    "content": "Perfetto! Possiamo fare domani alle 15:00?",
    "senderId": 1,
    "receiverId": 2,
    "senderName": "Giulia Bianchi",
    "senderRole": "student",
    "sentAt": "2024-01-15T11:00:00.000Z",
    "readAt": null,
    "messageType": "text",
    "replyToMessageId": null,
    "conversationId": 1
  }
}
```

#### Errori possibili
- **403**: "Non autorizzato ad accedere a questa conversazione"
- **400**: "Messaggio di riferimento non trovato in questa conversazione"

---

### Segna messaggio come letto
**PUT** `/messages/{id}/read`

Segna un singolo messaggio come letto.

#### Headers
```
Authorization: Bearer <jwt_token>
```

#### Parametri path
- `id` (obbligatorio): ID del messaggio

#### Esempio richiesta
```
PUT /api/messages/5/read
```

#### Risposta di successo (200)
```json
{
  "message": "Messaggio segnato come letto",
  "readAt": "2024-01-15T11:30:00.000Z"
}
```

#### Errori possibili
- **404**: "Messaggio non trovato"
- **400**: "Messaggio già segnato come letto"

---

### Segna tutti i messaggi come letti
**PUT** `/conversations/{id}/read-all`

Segna tutti i messaggi non letti di una conversazione come letti.

#### Headers
```
Authorization: Bearer <jwt_token>
```

#### Parametri path
- `id` (obbligatorio): ID della conversazione

#### Esempio richiesta
```
PUT /api/conversations/1/read-all
```

#### Risposta di successo (200)
```json
{
  "message": "Tutti i messaggi sono stati segnati come letti",
  "messagesMarked": 3,
  "readAt": "2024-01-15T11:30:00.000Z"
}
```

#### Errori possibili
- **403**: "Non autorizzato ad accedere a questa conversazione"

---

## Codici di stato HTTP

| Codice | Descrizione |
|--------|-------------|
| 200 | OK - Richiesta completata con successo |
| 201 | Created - Risorsa creata con successo |
| 400 | Bad Request - Parametri mancanti o non validi |
| 401 | Unauthorized - Token mancante o non valido |
| 403 | Forbidden - Accesso negato |
| 404 | Not Found - Risorsa non trovata |
| 500 | Internal Server Error - Errore interno del server |

---

## Gestione errori

Tutti gli endpoint restituiscono errori nel seguente formato:

```json
{
  "error": "Descrizione dell'errore"
}
```

---

## Note

- Tutti gli endpoint che richiedono autenticazione devono includere il header `Authorization: Bearer <jwt_token>`
- I token JWT scadono dopo 24 ore
- Tutte le date sono in formato ISO 8601
- **Differenza tra `/me` e `/users/{id}`**:
  - `/me` restituisce i dati dell'utente autenticato (basato sul token JWT)
  - `/users/{id}` restituisce i dati di un utente specifico tramite ID
- La logica di modifica utente (PUT /users/:id) e di recupero dati utente (GET /users/:id) si trova nel file:
  - `controllers/authController.js` (funzioni `updateUser` e `getUserById`)
  - `routes/user.js` (definizione delle route)

### Note sui Messaggi e Conversazioni
- **Paginazione**: Tutti gli endpoint che restituiscono liste supportano paginazione
- **Stato lettura**: I messaggi possono essere segnati come letti singolarmente o tutti insieme
- **Reply**: È possibile rispondere a messaggi specifici usando `replyToMessageId`
- **Tipi messaggio**: Supporta 'text', 'image', 'file' (attualmente implementato solo 'text')
- **Sicurezza**: Solo i partecipanti di una conversazione possono accedervi
- **Ordine messaggi**: I messaggi sono ordinati dal più recente (ORDER BY sent_at DESC)

---

## Sicurezza e Best Practice

- **Validazione input**: Tutti gli endpoint che accettano dati dall’utente usano validazione avanzata con express-validator. Gli errori di validazione restituiscono status 400 e dettagli sugli errori.
- **CORS restrittivo**: Solo i domini autorizzati possono accedere alle API.
- **Rate limiting**: Gli endpoint di login e registrazione sono protetti da rate limiting per prevenire brute force.
- **Ruoli e permessi**: La logica di controllo ruoli è centralizzata in middleware dedicati (`middlewares/roleMiddleware.js`).
- **Logging avanzato**: Gli accessi, errori e tentativi sospetti sono loggati tramite il sistema di logging del backend.

### Esempio di errore di validazione
```json
{
  "errors": [
    { "msg": "Email non valida", "param": "email", "location": "body" },
    { "msg": "Password troppo corta", "param": "password", "location": "body" }
  ]
}
```

### Esempi di Test con cURL

#### Test completo workflow conversazioni
```bash
# 1. Login per ottenere token
curl -X POST "http://localhost:3000/api/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@email.com", "password": "password123"}'

# 2. Crea conversazione
curl -X POST "http://localhost:3000/api/conversations" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"otherUserId": 2}'

# 3. Invia messaggio
curl -X POST "http://localhost:3000/api/conversations/1/messages" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"content": "Ciao! Come stai?", "messageType": "text"}'

# 4. Lista conversazioni
curl -X GET "http://localhost:3000/api/conversations?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"

# 5. Segna tutti come letti
curl -X PUT "http://localhost:3000/api/conversations/1/read-all" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Gestione Utente

### Profilo utente specifico
**GET** `/users/{id}`

Ottiene i dati di un utente specifico (richiede autenticazione).

#### Headers
```
Authorization: Bearer <jwt_token>
```

#### Parametri path
- `id` (obbligatorio): ID dell'utente

#### Esempio richiesta
```
GET /api/users/1
```

#### Risposta di successo (200)
```json
{
  "user": {
    "id": 1,
    "email": "mario.rossi@email.com",
    "name": "Mario Rossi",
    "role": "tutor",
    "bio": "Esperto in matematica con 5 anni di esperienza",
    "subject": "Matematica",
    "hourlyRate": 25,
    "rating": 4.5,
    "location": "Milano",
    "pro": true
  }
}
```

#### Risposta di errore (404)
```json
{
  "error": "Utente non trovato"
}
```

---

### Modifica dati utente
**PUT** `/users/{id}`

Modifica i dati di un utente. Solo l'utente stesso o un admin può modificare. Tutti i campi tranne rating sono modificabili.

#### Headers
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

#### Parametri path
- `id` (obbligatorio): ID dell'utente da modificare

#### Body (almeno un campo tra quelli modificabili)
```json
{
  "name": "Nuovo Nome",
  "bio": "Nuova bio",
  "subject": "Fisica",
  "email": "nuova@email.com",
  "password": "nuovapassword",
  "role": "tutor",
  "location": "Roma",
  "hourlyRate": 30
}
```

#### Risposta di successo (200)
```json
{
  "message": "Dati utente aggiornati con successo"
}
```

#### Risposta di errore (403 - non autorizzato)
```json
{
  "error": "Non autorizzato"
}
```

#### Risposta di errore (400 - nessun campo da aggiornare)
```json
{
  "error": "Nessun campo da aggiornare"
}
```

#### Risposta di errore (401 - token mancante o non valido)
```json
{
  "error": "Token mancante"
}
```

#### Note
- Il campo `rating` non è modificabile tramite questa API.
- Se viene fornita una nuova password, sarà automaticamente hashata.
- Solo l'utente stesso o un admin può modificare i dati di un utente. 