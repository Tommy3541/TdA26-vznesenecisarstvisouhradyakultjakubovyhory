<script lang="ts">
	import { onMount } from 'svelte';

	let users = $state<unknown>(null);

	onMount(async () => {
		const response = await fetch('/api/users');
		users = await response.json();
	});
</script>


<style>
body{
	background-color: red;
}
</style>
