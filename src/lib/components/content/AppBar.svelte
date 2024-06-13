<script>
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import IconLogout from '~icons/mdi/logout-variant';
	import IconAccount from '~icons/mdi/account';
	import IconInformation from '~icons/mdi/information-outline';
	import IconHamburger from '~icons/mdi/menu';
	import MaterialFab from '../buttons/MaterialFab.svelte';
	import Nav from './Nav.svelte';

	import { firebaseSignOut } from '$lib/firebase/auth';
	import { goto } from '$app/navigation';
	import { aboutPage, homePage, rootPage, userPage } from '$utils/pages';
	import { isDarkModeState } from '$lib/store';

	const logout = () => firebaseSignOut().then(() => goto(rootPage));
	const toggleDarkMode = () => isDarkModeState.set(!$isDarkModeState);
</script>

<AppBar shadow="shadow-2xl">
	<svelte:fragment slot="lead">
		<MaterialFab on:click={() => goto(homePage)}>
			<IconHamburger />
		</MaterialFab>
	</svelte:fragment>

	<div class="hidden md:flex mx-auto">
		<Nav />
	</div>

	<svelte:fragment slot="trail">
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
		<MaterialFab on:click={() => goto(userPage)}>
			<IconAccount />
		</MaterialFab>
		<MaterialFab on:click={() => goto(aboutPage)}>
			<IconInformation />
		</MaterialFab>
		<MaterialFab on:click={logout}>
			<IconLogout />
		</MaterialFab>
	</svelte:fragment>
</AppBar>
