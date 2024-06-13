<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { isDarkModeState } from '$lib/store';

	const toggleDarkMode = () => isDarkModeState.set(!$isDarkModeState);
</script>

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
		bgLight="bg-primary-500 dark:bg-surface-700"
		bgDark="bg-surface-300 dark:bg-primary-500"
	/>
</div>
