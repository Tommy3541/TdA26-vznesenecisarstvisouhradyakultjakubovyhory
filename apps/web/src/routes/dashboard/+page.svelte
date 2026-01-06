<script lang="ts">
    // lang="ts" řeší chybu "Type annotations can only be used in TypeScript files"
    export let data;
    // Fallback data pro případ, že by data nebyla načtena
    const { course, materials } = data || { course: { title: 'Nadpis' }, materials: [] };

    let fileInput: HTMLInputElement;

    // Klientská validace zůstává pro lepší UX
    function validateSize(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file && file.size > 30 * 1024 * 1024) {
            alert("Soubor je příliš velký (max 30 MB)");
            input.value = ''; // Vymaže výběr
        }
    }
</script>

<div class="page-layout">
    <header class="top-nav">
        <div class="nav-container">
            <div class="logo">
                <img src="/Think-different-Academy_LOGO_erb.png" alt="Logo" class="logo-img" />
            </div>
            <nav class="nav-links">
                <span>Kapitola 1</span>
                <span>Kapitola 2</span>
                <span>Kapitola 3</span>
                <span>Kapitola 4</span>
                <span>Kapitola 5</span>
                <button class="profile-btn">Profil</button>
            </nav>
        </div>
    </header>

    <main class="main-content">
        <div class="title-section">
            <h1>{course.title}</h1>
        </div>

        <section class="admin-section">
            <div class="forms-container">
                <form 
                    method="POST" 
                    action="?/uploadFile" 
                    enctype="multipart/form-data" 
                    class="form-card"
                >
                    <h3>Soubor</h3>
                    <input type="text" name="title" placeholder="Název" class="input-field" required />
                    <textarea name="description" placeholder="Popis" class="input-field no-resize"></textarea>
                    <input 
                        type="file" 
                        name="file" 
                        class="file-input" 
                        on:change={validateSize} 
                        required 
                    />
                    <button type="submit" class="action-btn">Uložit soubor</button>
                </form>

                <form 
                    method="POST" 
                    action="?/uploadLink" 
                    class="form-card"
                >
                    <h3>Odkaz (URL)</h3>
                    <input type="text" name="title" placeholder="Název" class="input-field" required />
                    <input type="url" name="url" placeholder="URL adresa" class="input-field" required />
                    <textarea name="description" placeholder="Popis" class="input-field no-resize"></textarea>
                    <button type="submit" class="action-btn">Uložit odkaz</button>
                </form>
            </div>

            <div class="list-container">
                {#each materials as material}
                    <div class="material-row">
                        <div class="material-icon">
                            {#if material.type === 'LINK'}
                                <img src="https://www.google.com/s2/favicons?domain={material.url}&sz=32" alt="icon" />
                            {:else}
                                <span class="emoji-icon">📄</span>
                            {/if}
                        </div>
                        <div class="material-info">
                            <strong>{material.title}</strong>
                            <p>{material.description}</p>
                            {#if material.type === 'LINK'}
                                <small style="color: blue;">{material.url}</small>
                            {/if}
                        </div>
                        <div class="material-actions">
                            <button class="icon-btn">✏️</button>
                            <button class="icon-btn">🗑️</button>
                        </div>
                    </div>
                {:else}
                    <p class="empty-msg">Zatím nebyly přidány žádné materiály.</p>
                {/each}
            </div>
        </section>
    </main>

    <footer class="bottom-footer">
        <p>Kontakt: info@example.com</p>
        <p>Adresa: Ulice 123, 100 00 Praha</p>
        <p>&copy; 2025 Moje Webová Stránka</p>
    </footer>
</div>

<style>
    /* Styly zůstávají zachovány podle tvého zadání */
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
    }

    .page-layout {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        background-color: #f0f0f0;
    }

    .top-nav {
        background-color: #111;
        color: white;
        padding: 10px 40px;
    }

    .nav-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
    }

    .logo-img {
        height: 40px;
    }

    .nav-links {
        display: flex;
        gap: 20px;
        align-items: center;
    }

    .profile-btn {
        background: none;
        border: 1px solid white;
        color: white;
        padding: 5px 15px;
        border-radius: 20px;
        cursor: pointer;
    }

    .main-content {
        flex: 1;
        padding-bottom: 40px;
    }

    .title-section {
        background: white;
        padding: 60px 20px;
        text-align: center;
        border-bottom: 1px solid #ddd;
    }

    .title-section h1 {
        font-size: 3rem;
        margin: 0;
    }

    .admin-section {
        max-width: 1000px;
        margin: 40px auto;
        padding: 0 20px;
    }

    .forms-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        margin-bottom: 40px;
    }

    .form-card {
        background-color: #d0d0d0;
        padding: 25px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .input-field {
        display: block;
        width: 100%;
        margin-bottom: 15px;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    .no-resize {
        resize: none;
        height: 80px;
    }

    .action-btn {
        background-color: #4caf50;
        color: white;
        border: none;
        padding: 12px;
        width: 100%;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
    }

    .list-container {
        background-color: #d0d0d0;
        padding: 20px;
        border-radius: 10px;
    }

    .material-row {
        background: white;
        display: flex;
        align-items: center;
        padding: 15px;
        margin-bottom: 10px;
        border-radius: 8px;
        gap: 20px;
    }

    .material-info {
        flex: 1;
    }

    .material-info p {
        margin: 5px 0 0 0;
        color: #666;
        font-size: 0.9rem;
    }

    .bottom-footer {
        background-color: #111;
        color: white;
        text-align: center;
        padding: 30px 20px;
        font-size: 0.85rem;
    }

    .icon-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
    }

    .empty-msg {
        text-align: center;
        color: #666;
    }
</style>
