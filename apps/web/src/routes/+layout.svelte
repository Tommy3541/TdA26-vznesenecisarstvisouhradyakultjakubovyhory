<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
<link href="https://fonts.googleapis.com/css2?family=Dosis:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

{@render children?.()}
