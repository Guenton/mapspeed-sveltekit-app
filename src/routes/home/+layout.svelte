<script lang="ts">
	import AppContainer from '$lib/components/containers/AppContainer.svelte';

	import type { Unsubscriber } from 'svelte/store';
	import { onDestroy, onMount } from 'svelte';
	import { onValue } from 'firebase/database';
	import { isDarkModeState } from '$lib/store';
	import { isAdminState } from '$lib/store/auth';
	import { getFirebaseUserId, getUserRef } from '$lib/firebase/auth';
	import { goto } from '$app/navigation';
	import { homePage } from '$utils/pages';

	let unsubDarkMode: Unsubscriber;
	let unsubUser: Unsubscriber;

	onMount(() => {
		unsubDarkMode = isDarkModeState.subscribe((isDarkMode) => {
			if (isDarkMode) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		});
	});

	onMount(() => {
		const uid = getFirebaseUserId();
		if (!uid) return;

		unsubUser = onValue(getUserRef(uid), (snapshot) => {
			if (!snapshot.exists()) return;

			const isAdmin = snapshot.val().isAdmin;
			isAdminState.set(isAdmin);

			if (!isAdmin) goto(homePage);
		});
	});

	onDestroy(() => unsubDarkMode && unsubDarkMode());
	onDestroy(() => unsubUser && unsubUser());
</script>

<AppContainer>
	<slot />
</AppContainer>
