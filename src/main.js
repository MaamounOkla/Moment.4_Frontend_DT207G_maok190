/*
  Uppgift4: Frontend för inloggning och registrering.
  kurs: DT207G Backendbaserad webbutveckling
  författare: Maamoun Okla
  datum: 2025-10-13
*/
const API_URL = 'http://127.0.0.1:3002/api';

//register  
const regForm = document.getElementById('registerForm');
if (regForm) {
  const regMsg = document.getElementById('regMsg');
  const regBtn = document.getElementById('regBtn');
  // submit event
  regForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const uEl = document.getElementById('regUsername');
    const pEl = document.getElementById('regPassword');
    const username = (uEl.value || '').trim();
    const password = pEl.value || '';

    regMsg.textContent = '';
    regMsg.className = 'msg';
    regBtn.disabled = true;
    const oldText = regBtn.textContent;
    regBtn.textContent = 'Registrerar...';
    // fetch
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      let data = {}; try { data = await res.json(); } catch {}
      if (!res.ok) {
        regMsg.textContent = data?.message || `Registrering misslyckades (${res.status})`;
        regMsg.className = 'msg err';
      } else {
        regMsg.textContent = data?.message || 'Registrerad!';
        regMsg.className = 'msg ok';
        uEl.value = '';
        pEl.value = '';
      }
    } catch (err) {
      regMsg.textContent = `Nätverksfel: ${err.message}`;
      regMsg.className = 'msg err';
    } finally {
      pEl.value = '';
      regBtn.disabled = false;
      regBtn.textContent = oldText;
    }
  });
}

// login 
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  const loginMsg = document.getElementById('loginMsg');
  const loginBtn = document.getElementById('loginBtn');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const uEl = document.getElementById('loginUsername');
    const pEl = document.getElementById('loginPassword');
    const username = (uEl.value || '').trim();
    const password = pEl.value || '';

    loginMsg.textContent = '';
    loginMsg.className = 'msg';
    loginBtn.disabled = true;
    const oldText = loginBtn.textContent;
    loginBtn.textContent = 'Loggar in...';

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      let data = {}; try { data = await res.json(); } catch {}
      if (!res.ok) {
        loginMsg.textContent = data?.message || `Fel vid inloggning (${res.status})`;
        loginMsg.className = 'msg err';
      } else if (data?.token) {
        sessionStorage.setItem('token', data.token);
        loginMsg.textContent = 'Inloggad! Omdirigerar...';
        loginMsg.className = 'msg ok';
        uEl.value = '';
        pEl.value = '';
        setTimeout(() => { window.location.href = './protected.html'; }, 800);
      } else {
        loginMsg.textContent = data?.message || 'Ingen token mottagen';
        loginMsg.className = 'msg err';
      }
    } catch (err) {
      loginMsg.textContent = `Nätverksfel: ${err.message}`;
      loginMsg.className = 'msg err';
    } finally {
      pEl.value = '';
      loginBtn.disabled = false;
      loginBtn.textContent = oldText;
    }
  });
}

// PROTECTED  
const loadBtn = document.getElementById('loadBtn');
const output = document.getElementById('output');
const logoutBtn = document.getElementById('logoutBtn');

if (loadBtn && output) {
  // redirect to login if missing token
  if (!sessionStorage.getItem('token')) {
    window.location.href = 'index.html';
  }

  async function fetchProtected() {
    output.textContent = 'Laddar...';
    try {
      // read token fresh each time
      const token = sessionStorage.getItem('token');
      const res = await fetch(`${API_URL}/protected`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
      });
      if (!res.ok) {
        const text = await res.text();
        output.textContent = `Fel (${res.status}): ${text || res.statusText}`;
        if (res.status === 401 || res.status === 403) {
          sessionStorage.removeItem('token');
          window.location.href = 'index.html';
        }
        return;
      }
      const data = await res.json();
      output.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
      output.textContent = `Nätverksfel: ${err.message}`;
    }
  }

  loadBtn.addEventListener('click', fetchProtected);
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('token');
      window.location.href = 'index.html';
    });
  }
  // auto-load on page load
  fetchProtected();
}
