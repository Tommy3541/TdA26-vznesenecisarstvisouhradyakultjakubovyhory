<script lang="ts">
    // Přidáním lang="ts" zmizí ta červená chyba z tvého obrázku!
    export let data;
    const { course, materials } = data;

    let fileInput: HTMLInputElement;
    let fileName = '';
    let fileDesc = '';

    function handleUpload() {
        const file = fileInput.files?.[0];
        if (!file) return;

        // Kontrola velikosti: max 30 MB
        if (file.size > 30 * 1024 * 1024) {
            alert("Soubor je příliš velký (max 30 MB)");
            return;
        }
        
        // Logika pro odeslání na API...
    }
</script>

<div class="main-container">
    <div class="header-section">
        <h1>{course.title}</h1>
    </div>

    <div class="admin-grid">
        <div class="purple-box">
            <h3>Soubor</h3>
            <input type="text" bind:value={fileName} placeholder="Název" />
            <textarea bind:value={fileDesc} placeholder="Popis"></textarea>
            <input type="file" bind:this={fileInput} />
            <button on:click={handleUpload} class="save-btn">Uložit soubor</button>
        </div>

        <div class="purple-box">
            <h3>Odkaz (URL)</h3>
            <input type="text" placeholder="Název" />
            <input type="url" placeholder="URL adresa" />
            <textarea placeholder="Popis"></textarea>
            <button class="save-btn">Uložit odkaz</button>
        </div>
    </div>

    <div class="yellow-list">
        {#each materials as material}
            <div class="material-item">
                <div class="icon">
                    {#if material.type === 'LINK'}
                        <img src="https://www.google.com/s2/favicons?domain={material.url}&sz=32" alt="icon" />
                    {:else}
                        <span>📄</span>
                    {/if}
                </div>
                <div class="text">
                    <strong>{material.title}</strong>
                    <p>{material.description}</p>
                </div>
                <div class="controls">
                    <button>✏️</button>
                    <button>🗑️</button>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .main-container {
        background-color: #000000; /* Modré pozadí z tvého návrhu */
        min-height: 100vh;
        padding: 20px;
    }
    .header-section {
        background: white;
        padding: 40px;
        text-align: center;
        margin-bottom: 20px;
    }
    .admin-grid {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
    }
    .purple-box {
        background-color: #b1b1b1; /* Fialové boxy */
        padding: 20px;
        flex: 1;
        border-radius: 8px;
    }
    .purple-box input, .purple-box textarea {
        display: block;
        width: 100%;
        margin-bottom: 10px;
        background: black;
        color: white;
        border: none;
        padding: 10px;
    }
    .yellow-list {
        background-color: #c9c9c9; /* Žlutý seznam */
        padding: 20px;
        border-radius: 8px;
    }
    .material-item {
        background: white;
        display: flex;
        align-items: center;
        padding: 15px;
        margin-bottom: 10px;
        border-radius: 5px;
        gap: 15px;
    }
    .save-btn {
        background-color: #4caf50;
        color: white;
        border: none;
        padding: 10px;
        width: 100%;
        cursor: pointer;
    }
</style>


