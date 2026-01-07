<script>
  // Tato proměnná přijímá data z +page.server.js
  export let form;

  let username = "";
  let password = "";

</script>

<div class="header-area">
  <a href="/" class="logo-link">
    <div class="logo">
      <img src="Think-different-Academy_LOGO_erb.png" alt="Logo" class="logomain" />
    </div>
  </a>
  <a href="/" class="back-link">← Zpět</a>
</div>

<div class="login-wrapper">
  <div class="login-card">
    <h2>Přihlášení</h2>
    <p class="subtitle">Vítejte v TdA Education</p>

    <form method="POST">
      
      {#if form?.error}
        <p class="error-msg">{form.error}</p>
      {/if}

      <div class="input-group">
        <label for="username">Uživatelské jméno</label>
        <input 
          type="text" 
          id="username" 
          name="username" 
          bind:value={username} 
          placeholder="lecturer" 
          required 
        />
      </div>

      <div class="input-group">
        <label for="password">Heslo</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          bind:value={password} 
          placeholder="••••••••" 
          required 
        />
      </div>

      <button type="submit" class="login-btn">
        Přihlásit se
      </button>
    </form>

    <div class="register-link">
      Ještě nemáte účet? <a href="/register">Zaregistrovat se</a>
    </div>
  </div>
</div>

<style>
/* Umístění loga a odkazu zpět */
  .header-area {
    position: absolute;
    top: 20px;
    left: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .logo {
    font-size: 24px;
    font-weight: bold;
    color: #4fc3f7;
    cursor: pointer;
    transition: transform 0.3s;
  }

  .logo:hover {
    transform: scale(1.1) rotate(-2deg);
  }

  .logomain {
    height: 50px; /* Uprav si podle potřeby */
    display: block;
  }

  .logo-link {
    text-decoration: none;
  }

  .back-link {
    text-decoration: none;
    color: #666;
    font-size: 0.9rem;
    font-family: sans-serif;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: #40976c;
  }

  /* Zbytek stylů zůstává stejný */
  .login-wrapper {
    background-color: #6DD4B1;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; 
    font-family: sans-serif;
  }

  .login-card {
    background: #91F5AD;
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
    position: relative;
  }

  h2 {
    margin: 0 0 0.5rem 0;
    color: #333;
  }

  .subtitle {
    color: #666;
    margin-bottom: 2rem;
    font-size: 0.9rem;
  }

  .input-group {
    text-align: left;
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #444;
    font-size: 0.85rem;
  }

  input {
    background-color: rgb(120, 232, 176);
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #6DD4B1;
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 1rem;
  }

  input:focus {
    background-color: #7ee8b3;
    outline: none;
    border-color: #6DD4B1;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }

  .login-btn {
    width: 100%;
    padding: 0.75rem;
    background-color: #4eb883;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }

  .login-btn:hover {
    background-color: #40976c;
  }

  .register-link {
    margin-top: 1.5rem;
    font-size: 0.85rem;
    color: #666;
  }

  .register-link a {
    color: #40976c;
    text-decoration: none;
    font-weight: 600;
  }

  .register-link a:hover {
    text-decoration: underline;
  }
  .error-msg {
    color: #d32f2f;
    background-color: #fdecea;
    padding: 0.5rem;
    border-radius: 4px;
    font-size: 0.85rem;
    margin-bottom: 1rem;
    border: 1px solid #f5c6cb;
  }
</style>

