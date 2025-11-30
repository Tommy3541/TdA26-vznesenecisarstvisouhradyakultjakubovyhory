<script lang="ts">
    import { onMount } from 'svelte';
    import { PUBLIC_API_URL } from '$env/static/public';

    let users = $state<unknown>(null);

    onMount(async () => {
        const response = await fetch(`${PUBLIC_API_URL}/users`);
        users = await response.json();
    });
</script>
