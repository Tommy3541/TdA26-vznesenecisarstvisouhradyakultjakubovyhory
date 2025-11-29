<script lang="ts">
    import { onMount } from 'svelte';

    let users: unknown = null;
    let loading = true;
    let error: string | null = null;

    onMount(async () => {
        try {
            const response = await fetch('/api/users');
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            users = await response.json();
        } catch (err) {
            error = String(err);
        } finally {
            loading = false;
        }
    });
</script>

<div>
    {#if loading}
        <p>Načítám data...</p>
    {:else if error}
        <p style="color: red">Chyba: {error}</p>
    {:else}
        <pre>{JSON.stringify(users, null, 2)}</pre>
    {/if}

    <section>
        <h2>API StatuS</h2>
    </section>
</div>
