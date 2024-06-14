<script lang="ts">
	import IconAt from '~icons/mdi/at';
	import IconPhone from '~icons/mdi/phone';
	import IconAccount from '~icons/mdi/account';
	import PageHeader from '$lib/components/content/PageHeader.svelte';
	import SurfaceContainer from '$lib/components/containers/SurfaceContainer.svelte';
	import SurfaceHeader from '$lib/components/content/SurfaceHeader.svelte';
	import MaterialInput from '$lib/components/inputs/MaterialInput.svelte';

	import type { FirebaseDatabaseUserFormat } from '$lib/types/auth';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authLoginPage, homePage, rootPage } from '$utils/pages';
	import isValidFirebaseUserFormat from '$lib/validation/isValidFirebaseUserFormat';
	import { analyticsDeleteUserEvent, analyticsUpdateUserEvent } from '$lib/firebase/analytics';
	import {
		firebaseSignOut,
		getFirebaseDisplayName,
		getFirebaseUserEmail,
		getFirebaseUserId,
		removeFirebaseUserAsync,
		storeFirebaseUserAsync,
	} from '$lib/firebase/auth';
	import MaterialPrimaryButton from '$lib/components/buttons/MaterialPrimaryButton.svelte';
	import MaterialTertiaryButton from '$lib/components/buttons/MaterialTertiaryButton.svelte';

	let uid = '';
	let firstName = '';
	let lastName = '';
	let email = '';
	let phone = '';

	let firstNameRef: HTMLInputElement;
	let lastNameRef: HTMLInputElement;

	onMount(() => {
		firstNameRef.focus();
		uid = getFirebaseUserId();
		if (!uid) return goto(authLoginPage);

		const fullName = getFirebaseDisplayName();
		if (!fullName) return;
		[firstName, lastName] = fullName.split(' ');

		email = getFirebaseUserEmail();
	});

	const store = () => {
		const userFormat: FirebaseDatabaseUserFormat = {
			uid,
			firstName,
			lastName,
			email,
			phone,
			isAdmin: false,
		};
		if (!isValidFirebaseUserFormat(userFormat)) return;

		storeFirebaseUserAsync(userFormat)
			.then(() => goto(homePage))
			.catch(() => null)
			.finally(() => analyticsUpdateUserEvent(uid));
	};

	const purge = () => {
		removeFirebaseUserAsync(uid)
			.then(() => firebaseSignOut())
			.then(() => goto(rootPage))
			.catch(() => null)
			.finally(() => analyticsDeleteUserEvent(getFirebaseUserId()));
	};
</script>

<PageHeader label="User Information" subLabel="Adjust your user information" />
<SurfaceContainer>
	<SurfaceHeader label="Personal Information" />
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8 pb-2 mt-4 mx-4">
		<MaterialInput
			bind:value={firstName}
			bind:ref={firstNameRef}
			on:enter={() => lastNameRef.focus()}
			name="firstName"
			placeholder="First Name"
		>
			<IconAccount />
		</MaterialInput>

		<MaterialInput
			bind:value={lastName}
			bind:ref={lastNameRef}
			name="lastName"
			placeholder="Last Name"
		/>

		<MaterialInput bind:value={email} name="email" placeholder="Email" disabled>
			<IconAt />
		</MaterialInput>

		<MaterialInput value={phone} name="phone" placeholder="Phone" disabled>
			<IconPhone />
		</MaterialInput>
	</div>

	<div class="flex items-center justify-center gap-8 my-5 mx-4 mt-8">
		<MaterialPrimaryButton on:click={store} />
		<MaterialTertiaryButton on:click={purge} />
	</div>
</SurfaceContainer>
