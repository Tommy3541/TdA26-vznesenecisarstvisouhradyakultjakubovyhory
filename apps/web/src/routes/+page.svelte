<script lang="ts">
  import { onMount } from 'svelte';
  let organization: string | null = null;

  onMount(async () => {
    const res = await fetch(import.meta.env.VITE_API_URL);
    const json = await res.json();
    organization = json.organization;
  });
</script>

<h1>Hello TdA</h1>
{#if organization}
  <p>Organization: {organization}</p>
{/if}
