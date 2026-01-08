<script lang="ts">
    import { page } from '$app/stores';
    import { invalidateAll } from '$app/navigation';

    export let data;

    // Lokální stav pro formulář
    let name = '';
    let type = 'url';
    let url = '';
    let description = '';
    let fileInput: HTMLInputElement;
    let loading = false;
    let errorMessage = '';

    async function handleSubmit() {
        loading = true;
        errorMessage = '';
        const courseId = $page.params.uuid;

        try {
            let body;
            let headers: Record<string, string> = {};

            if (type === 'url') {
                body = JSON.stringify({ name, type, url, description });
                headers['Content-Type'] = 'application/json';
            } else {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('type', 'file');
                formData.append('description', description);
                if (fileInput.files?.[0]) {
                    formData.append('file', fileInput.files[0]);
                } else {
                    throw new Error('Vyberte soubor');
                }
                body = formData;
                // U FormData prohlížeč nastaví boundary automaticky, headers necháme prázdné
            }

            // VOLÁNÍ TVÉHO API: /courses/[uuid]/materials
            const response = await fetch(`/courses/${courseId}/materials`, {
                method: 'POST',
                headers,
                body
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Něco se nepovedlo');
            }

            // Reset formuláře a refresh dat
            name = '';
            url = '';
            description = '';
            if (fileInput) fileInput.value = '';
            
            // Toto vynutí znovunačtení dat v +page.ts bez reloadu stránky
            await invalidateAll();
            
        } catch (err: any) {
            errorMessage = err.message;
        } finally {
            loading = false;
        }
    }
</script>

<div class="course-detail">
    {#if data.course}
        <header class="course-header">
            <h1>{data.course.name}</h1>
            <p class="description">{data.course.description || 'Bez popisu'}</p>
        </header>

        <section class="upload-section">
            <h3>Přidat nový materiál</h3>
            <form on:submit|preventDefault={handleSubmit} class="material-form">
                <input type="text" bind:value={name} placeholder="Název materiálu" required />
                <textarea bind:value={description} placeholder="Popis (volitelné)"></textarea>
                
                <div class="type-selector">
                    <label>
                        <input type="radio" bind:group={type} value="url" /> Odkaz
                    </label>
                    <label>
                        <input type="radio" bind:group={type} value="file" /> Soubor
                    </label>
                </div>

                {#if type === 'url'}
                    <input type="url" bind:value={url} placeholder="https://..." required />
                {:else}
                    <input type="file" bind:this={fileInput} required />
                {/if}

                <button type="submit" disabled={loading}>
                    {loading ? 'Ukládám...' : 'Uložit materiál'}
                </button>

                {#if errorMessage}
                    <p class="error-msg">{errorMessage}</p>
                {/if}
            </form>
        </section>

        <section class="materials-section">
            <h2>Studijní materiály</h2>
            
            <div class="materials-list">
                {#if data.course.materials && data.course.materials.length > 0}
                    {#each data.course.materials as material}
                        <div class="material-item">
                            <div class="material-info">
                                <div>
                                    <span class="material-name">{material.name}</span>
                                    <p class="mat-desc">{material.description || ''}</p>
                                </div>
                                <a 
                                    href={material.type === 'URL' ? material.url : material.fileUrl} 
                                    target="_blank" 
                                    class="download-link"
                                >
                                    {material.type === 'URL' ? 'Otevřít' : 'Zobrazit'}
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
            <a href="/courses">Zpět na seznam kurzů</a>
        </div>
    {/if}
</div>

<style>
    /* ... tvoje stávající styly ... */
    
    .upload-section {
        background: #eee;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 2rem;
    }

    .material-form {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }

    .material-form input, .material-form textarea {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .type-selector {
        display: flex;
        gap: 1rem;
    }

    .error-msg {
        color: red;
        font-size: 0.9rem;
    }

    .mat-desc {
        font-size: 0.85rem;
        color: #888;
        margin: 0;
    }

    /* Ostatní tvoje CSS zůstává stejné */
</style>
