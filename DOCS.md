# KnowByAPI - Documentazione API

## Informazioni generali
- **Base URL**: `http://localhost:3000/api` (sviluppo) / `https://your-domain.com/api` (produzione)
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

## Messaggistica

### Invia messaggio
**POST** `/message`

Invia un messaggio a un altro utente (richiede autenticazione).

#### Headers
```
Authorization: Bearer <jwt_token>
```

#### Parametri richiesti
```json
{
  "receiverId": "number (obbligatorio)",
  "content": "string (obbligatorio)"
}
```

#### Esempio richiesta
```json
{
  "receiverId": 1,
  "content": "Ciao! Hai disponibilità per una lezione di matematica?"
}
```

#### Risposta di successo (201)
```json
{
  "message": "Messaggio inviato - placeholder",
  "messageData": {
    "id": 1,
    "senderId": 2,
    "receiverId": 1,
    "content": "Ciao! Hai disponibilità per una lezione di matematica?",
    "sentAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### Conversazioni utente
**GET** `/messages`

Ottiene tutte le conversazioni dell'utente autenticato.

#### Headers
```
Authorization: Bearer <jwt_token>
```

#### Risposta di successo (200)
```json
{
  "message": "Conversazioni - placeholder",
  "conversations": [
    {
      "id": 1,
      "otherUser": {
        "id": 2,
        "name": "Mario Rossi",
        "role": "tutor"
      },
      "lastMessage": "Ciao! Hai disponibilità per una lezione di matematica?",
      "lastMessageTime": "2024-01-15T10:30:00.000Z",
      "unreadCount": 1
    }
  ]
}
```

---

### Messaggi di una conversazione
**GET** `/messages/{conversationId}`

Ottiene tutti i messaggi di una conversazione specifica.

#### Headers
```
Authorization: Bearer <jwt_token>
```

#### Parametri path
- `conversationId` (obbligatorio): ID della conversazione

#### Risposta di successo (200)
```json
{
  "message": "Messaggi conversazione - placeholder",
  "messages": [
    {
      "id": 1,
      "senderId": 2,
      "content": "Ciao! Hai disponibilità per una lezione di matematica?",
      "sentAt": "2024-01-15T09:30:00.000Z"
    },
    {
      "id": 2,
      "senderId": 1,
      "content": "Sì, sono disponibile! Quando preferisci?",
      "sentAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

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
- I placeholder attuali verranno sostituiti con logica reale in futuro
- Per testare gli endpoint, usa Postman, Insomnia o curl 

---

## Gestione Utente

La logica di modifica utente (PUT /users/:id) e di recupero dati utente (GET /users/:id) si trova nel file:
- `controllers/authController.js` (funzioni `updateUser` e `getUserById`)
- `routes/user.js` (definizione delle route)

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