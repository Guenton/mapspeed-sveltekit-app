<script lang="ts">
	import IconAccountMultiple from '~icons/mdi/account-multiple';
	import PageHeader from '$lib/components/content/PageHeader.svelte';
	import SurfaceContainer from '$lib/components/containers/SurfaceContainer.svelte';
	import SurfaceHeader from '$lib/components/content/SurfaceHeader.svelte';

	import type { Unsubscriber } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import { onValue } from 'firebase/database';
	import { getAllUserRef, getFirebaseUserId } from '$lib/firebase/auth';
	import {
		authLoginPage,
		servicePage,
		homePage,
		adminAppointmentsPage,
		adminVehiclesPage,
	} from '$utils/pages';
	import { Table, tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';
	import { isAdminState } from '$lib/store/auth';
	import MaterialTertiaryButton from '$lib/components/buttons/MaterialTertiaryButton.svelte';
	import type { FirebaseDatabaseUserFormat } from '$lib/types/auth';

	let uid = '';

	let userTable: FirebaseDatabaseUserFormat[] = [];

	let unsubUsers: Unsubscriber;
	let unsubAdminWatcher: Unsubscriber;

	unsubAdminWatcher = isAdminState.subscribe((isAdmin) => {
		if (!isAdmin) goto(homePage);
	});

	const setUserTableSource = (): TableSource => ({
		head: ['First Name', 'Last Name', 'Email', 'Tel'],
		body: tableMapperValues(userTable, ['firstName', 'lastName', 'email', 'phone']),
		meta: tableMapperValues(userTable, ['uid']),
		foot: ['Totals', `<span class="badge variant-soft-primary">${userTable.length}<span>`],
	});
	$: userTableData = userTable && setUserTableSource();

	const onuserTableRowSelect = (event: CustomEvent) => {};

	onMount(() => {
		uid = getFirebaseUserId();
		if (!uid) goto(authLoginPage);
		else document.cookie = `userId=${uid}; path=/;`;
	});

	onMount(() => {
		unsubUsers = onValue(getAllUserRef(), (snapshot) => {
			if (!snapshot.exists()) return;

			const list: FirebaseDatabaseUserFormat[] = [];

			snapshot.forEach((childSnapshot) => {
				const childData = childSnapshot.val() as FirebaseDatabaseUserFormat;
				list.push(childData);
			});

			userTable = list;
		});
	});

	onDestroy(() => unsubUsers && unsubUsers());
	onDestroy(() => unsubAdminWatcher && unsubAdminWatcher());
</script>

<PageHeader label="Administration" subLabel="View Users in System" />

<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
	<MaterialTertiaryButton label="View Appointments" on:click={() => goto(adminAppointmentsPage)}>
		<IconAccountMultiple />
	</MaterialTertiaryButton>

	<MaterialTertiaryButton label="View Vehicles" on:click={() => goto(adminVehiclesPage)}>
		<IconAccountMultiple />
	</MaterialTertiaryButton>
</div>

<br />

<SurfaceContainer>
	<SurfaceHeader label="Registered Users" />
	<Table interactive source={userTableData} on:selected={onuserTableRowSelect} />
</SurfaceContainer>
