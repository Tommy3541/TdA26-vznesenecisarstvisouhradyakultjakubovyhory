<script lang="ts">
  import { onMount } from 'svelte';
  import { PUBLIC_API_URL } from '$env/static/public';

  let organization: string | null = null;

  onMount(async () => {
    const res = await fetch(PUBLIC_API_URL);
    const json = await res.json();
    organization = json.organization;
  });
</script>
