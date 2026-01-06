<script lang="ts">
    export let data;
    // Data pocházejí z +page.ts, kde jsme je fetchli z API
</script>

<div class="course-detail">
    {#if data.course}
        <header class="course-header">
            <h1>{data.course.name}</h1>
            <p class="description">{data.course.description || 'Bez popisu'}</p>
        </header>

        <section class="materials-section">
            <h2>Studijní materiály</h2>
            
            <div class="materials-list">
                {#if data.course.materials && data.course.materials.length > 0}
                    {#each data.course.materials as material}
                        <div class="material-item">
                            <div class="material-info">
                                <span class="material-name">{material.name}</span>
                                <a 
                                    href="/api/materials/download/{material.uuid}" 
                                    target="_blank" 
                                    class="download-link"
                                >
                                    Stáhnout / Zobrazit
                                </a>
                            </div>
                        </div>
                    {/each}
                {:else}
                    <p>Pro tento kurz zatím nejsou nahrány žádné materiály.</p>
                {/if}
            </div>
        </section>

        <a href="/courses" class="back-link">← Zpět na seznam kurzů</a>
    {:else}
        <div class="error">
            <h1>Kurz nenalezen</h1>
            <p>Litujeme, ale požadovaný kurz neexistuje nebo nemáte oprávnění k jeho prohlížení.</p>
            <a href="/courses">Zpět na seznam kurzů</a>
        </div>
    {/if}
</div>

<style>
    .course-detail {
        max-width: 800px;
        margin: 2rem auto;
        padding: 0 1rem;
        font-family: sans-serif;
    }

    .course-header {
        border-bottom: 2px solid #eee;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
    }

    .description {
        color: #666;
        font-size: 1.1rem;
    }

    .materials-section {
        background: #f9f9f9;
        padding: 1.5rem;
        border-radius: 8px;
    }

    .materials-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;
    }

    .material-item {
        background: white;
        padding: 1rem;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        border-left: 4px solid #4fc3f7;
    }

    .material-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .material-name {
        font-weight: bold;
    }

    .download-link {
        background-color: #4fc3f7