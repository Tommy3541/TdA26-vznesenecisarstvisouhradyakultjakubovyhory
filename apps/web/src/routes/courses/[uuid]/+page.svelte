<script lang="ts">
    export let data;
    const course = data.course;
</script>

<div class="detail-wrapper">
    <h1>{course.name}</h1>
    <p class="description">{course.description}</p>

    <h2>Studijní podklady</h2>
    <div class="materials-list">
        {#each course.materials as material}
            <div class="material-item">
                <div class="material-info">
                    {#if material.type === 'url'}
                        <img src="https://www.google.com/s2/favicons?domain={material.content}" alt="icon" />
                    {/if}
                    <strong>{material.name}</strong>
                    <p>{material.description}</p>
                </div>

                {#if material.type === 'file'}
                    <a href="/uploads/{material.content}" download class="download-btn">Stáhnout</a>
                {:else}
                    <a href={material.content} target="_blank" class="link-btn">Otevřít odkaz</a>
                {/if}
            </div>
        {each}
    </div>
</div>

<style>
    /* Použij opět brand barvy  */
    .download-btn {
        background: #0070BB; /* Modrá z manuálu  */
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        text-decoration: none;
    }
    .material-item {
        border: 1px solid #eaeaea;
        padding: 15px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 10px;
    }
</style>