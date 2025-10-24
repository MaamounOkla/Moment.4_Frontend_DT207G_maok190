
# Frontend för JWT-autentisering  
# moment4_frontend_DT207G  

## Författare  
- Maamoun Okla  

## Senaste uppdatering  
- 2025-10-24  

Detta repository innehåller koden för en **frontend-applikation** som kommunicerar med ett eget backend-API byggt med **Node.js**, **Express** och **MongoDB (Atlas)**.  
Syftet är att skapa en webblösning som hanterar **registrering, inloggning och åtkomst till skyddade sidor** genom användning av **JSON Web Tokens (JWT)**.  

Användaren kan skapa konto, logga in och nå en skyddad sida där data endast visas om en giltig token finns lagrad i webbläsarens `sessionStorage`.  

---

## Installation  
1. Klona repositoryt.  
2. Kör `npm install` för att installera alla beroenden.  
3. Starta utvecklingsservern med:  
```

npm start

```
Applikationen körs på `http://localhost:1234`.  

---

## Projektstruktur  
```

├── src/
│   ├── index.html
│   ├── protected.html
│   ├── main.js
│   └── styles.css
├── package.json
└── README.md

````

---

## Användning  

| Funktion | Sida | Beskrivning |
|-----------|------|-------------|
| Registrera användare | index.html | Skapar ett nytt konto genom att skicka POST `/api/register` till backend. |
| Logga in användare | index.html | Loggar in användare och sparar JWT-token i `sessionStorage`. |
| Gå till skyddad sida | protected.html | Hämtar data från GET `/api/protected` med giltig token i header. |

Exempel på JSON-data vid registrering/inloggning:  
```json
{
  "username": "admin",
  "password": "password123"
}
````

Svar vid lyckad inloggning:

```json
{
  "message": "User logged in successfully",
  "token": "<JWT-token>"
}
```

Frontend kommunicerar med backend-API på:

```
http://127.0.0.1:3000/api
```

För att komma åt skyddad data skickas JWT-token i headern:

```
Authorization: Bearer <token>
```

---

## Dependencies

* **Parcel**:  
  Används för att köra och paketera frontenden lokalt under utveckling.

```
```
