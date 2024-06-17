<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';

	import LogoGuenton from '../images/LogoGuenton.svelte';
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<p class="ml-5 text-sm">Copyright © 2024. M.A.P. Speed</p>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<p class="text-sm">Powered By</p>
		<a href="mailto:guenton@gmail.com"><LogoGuenton /></a>
	</svelte:fragment>
</AppBar>
