<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import FlatAlert from '$lib/components/content/FlatAlert.svelte';
	import SubHeader from '../content/SubHeader.svelte';
	import LogoGuenton from '../images/LogoGuenton.svelte';
	import Banner from '../images/Banner.svelte';
	import { isDarkModeState } from '$lib/store';

	export let label: string;
	const toggleDarkMode = () => isDarkModeState.set(!$isDarkModeState);
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
		<div class="flex gap-1 items-center">
			{#if $isDarkModeState}
				<span class="text-xs">Go Light</span>
			{:else}
				<span class="text-xs">Go Dark</span>
			{/if}
			<LightSwitch
				ring="border-none"
				on:click={toggleDarkMode}
				fillLight="text-black"
				bgLight="bg-secondary-500 dark:bg-surface-700"
				bgDark="bg-surface-300 dark:bg-secondary-500"
			/>
		</div>
	</div>
</div>
