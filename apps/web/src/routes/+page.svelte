<script lang="ts">
	import { onMount } from 'svelte';

	let users = $state<unknown>(null);

	onMount(async () => {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`);

		users = await response.json();
	});
</script>

<div>
	<pre>
		{JSON.stringify(users, null, 2)}
	</pre>
	<div>
		<section>
			<h2>API Status</h2>
		</section>
	</div>
</div>
