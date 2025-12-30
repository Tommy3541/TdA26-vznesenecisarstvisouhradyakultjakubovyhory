<script>
  let username = "";
  let password = "";

  function handleLogin() {
    // Tady se pak bude řešit ověření v DB
    console.log("Přihlašování:", { username, password });
  }
</script>

<div class="login-wrapper">
  <div class="login-card">
    <h2>Přihlášení</h2>
    <p class="subtitle">Vítejte v TdA Education</p>

    <form on:submit|preventDefault={handleLogin}>
      <div class="input-group">
        <label for="username">Uživatelské jméno</label>
        <input 
          type="text" 
          id="username" 
          bind:value={username} 
          placeholder="Zadejte jméno" 
          required 
        />
      </div>

      <div class="input-group">
        <label for="password">Heslo</label>
        <input 
          type="password" 
          id="password" 
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
  /* Vycentrování celé karty na střed obrazovky */
  .login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh; /* Aby to nebylo úplně nalepené nahoře */
    font-family: sans-serif;
  }

  .login-card {
    background: white;
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
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
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    box-sizing: border-box; /* Důležité, aby input nepřetékal */
    font-size: 1rem;
  }

  input:focus {
    outline: none;
    border-color: #007bff; /* Modrá barva při kliknutí */
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }

  .login-btn {
    width: 100%;
    padding: 0.75rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }

  .login-btn:hover {
    background-color: #0056b3;
  }

  .register-link {
    margin-top: 1.5rem;
    font-size: 0.85rem;
    color: #666;
  }

  .register-link a {
    color: #007bff;
    text-decoration: none;
    font-weight: 600;
  }

  .register-link a:hover {
    text-decoration: underline;
  }
</style>