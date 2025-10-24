/*
    Uppgift4: Frontend för inloggning och registrering.
    kurs: DT207G Backendbaserad webbutveckling
    författare: Maamoun Okla
    datum: 2025-10-13
*/
const API_URL = 'http://127.0.0.1:3000/api';
const message = document.getElementById('message');

// Registrera användare
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('regUsername').value;
  const password = document.getElementById('regPassword').value;

  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  message.textContent = data.message || 'Registrerad';
});

// Logga in användare
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();

  if (data.token) {
    sessionStorage.setItem('token', data.token);
    message.textContent = 'Inloggad! Token sparad.';
  } else {
    message.textContent = data.message || 'Fel vid inloggning';
  }
});
