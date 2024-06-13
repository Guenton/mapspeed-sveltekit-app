<script lang="ts">
	import FlatAlert from '$lib/components/content/FlatAlert.svelte';
	import SubHeader from '../content/SubHeader.svelte';
	import LogoGuenton from '../images/LogoGuenton.svelte';
	import Banner from '../images/Banner.svelte';
	import DarkSwitch from '../buttons/DarkSwitch.svelte';

	export let label: string;
</script>

<div class="flex flex-col justify-items-center w-full p-10">
	<div class="flex flex-col items-center my-4">
		<Banner />
		<SubHeader {label} />
	</div>

	<div class="flex-1 flex flex-col gap-8 w-full max-w-md place-self-center">
		<slot />
	</div>

	<div class="flex w-full max-w-lg place-self-center m-3">
		<FlatAlert />
	</div>

	<div class="w-full flex justify-between items-center self-center mt-4 max-w-lg">
		<a href="mailto:guenton@gmail.com"><LogoGuenton /></a>
		<DarkSwitch />
	</div>
</div>
