<script lang="ts">
    export let data;
    // 'data.course' pochází z návratové hodnoty funkce load v +page.ts
</script>

<h1>Detail kurzu</h1>
{#if data.course}
    <section>
        <h2>{data.course.name || data.course.title}</h2>
        <p>{data.course.description}</p>
    </section>
{:else}
    <p>Načítání...</p>
{/if}
