<script lang="ts">
  import { onMount } from 'svelte';


  let organization: string | null = null;

  onMount(async () => {
    const res = await fetch('/api/<endpoint>');
    const json = await res.json();
    organization = json.organization;
    console.log("Testovací print, organizace: ")
    console.log(organization)
  });
</script>

<h1>Hello TdA</h1>
  <p>Organization: {organization}</p>
<p>test api</p>
