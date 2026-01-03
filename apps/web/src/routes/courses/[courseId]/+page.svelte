<script lang="ts">
    // Tady load funkci nepíšeme, jen přijímáme data
    export let data;
</script>

<h1>Kurzy</h1>
<div id="courses-list">
    {#if data.courses && data.courses.length > 0}
        {#each data.courses as course}
            <div class="course-card">
                <h2>{course.name}</h2>
                <p>{course.description}</p>
            </div>
        {/each}
    {:else}
        <p>Zatím nejsou vypsány žádné kurzy.</p>
    {/if}
</div>