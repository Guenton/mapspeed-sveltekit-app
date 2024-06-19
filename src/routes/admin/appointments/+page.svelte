<script lang="ts">
	import IconAccountMultiple from '~icons/mdi/account-multiple';
	import IconCarMultiple from '~icons/mdi/car-multiple';
	import PageHeader from '$lib/components/content/PageHeader.svelte';
	import SurfaceContainer from '$lib/components/containers/SurfaceContainer.svelte';
	import SurfaceHeader from '$lib/components/content/SurfaceHeader.svelte';
	import MaterialTertiaryButton from '$lib/components/buttons/MaterialTertiaryButton.svelte';

	import type { Unsubscriber } from 'svelte/store';
	import type { FirebaseServiceFormat, ServiceTableRowFormat } from '$lib/types/service';
	import { Table, tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import { onValue } from 'firebase/database';
	import { getFirebaseUserId } from '$lib/firebase/auth';
	import { isAdminState } from '$lib/store/auth';
	import { getAllServiceRef } from '$lib/firebase/service';
	import {
		authLoginPage,
		homePage,
		adminUsersPage,
		adminAppointmentsPage,
		adminVehiclesPage,
	} from '$utils/pages';

	let uid = '';

	let serviceTable: ServiceTableRowFormat[] = [];

	let unsubServices: Unsubscriber;
	let unsubAdminWatcher: Unsubscriber;

	unsubAdminWatcher = isAdminState.subscribe((isAdmin) => {
		if (!isAdmin) goto(homePage);
	});

	const setServiceTableSource = (): TableSource => ({
		head: ['Vehicle Info', 'Vehicle VIN', 'Service Date', 'Remarks', 'STATUS'],
		body: tableMapperValues(serviceTable, [
			'vehicleInfo',
			'vin',
			'displayDate',
			'remarks',
			'status',
		]),
		meta: tableMapperValues(serviceTable, ['key']),
		foot: ['Totals', `<span class="badge variant-soft-primary">${serviceTable.length}<span>`],
	});
	$: serviceTableData = serviceTable && setServiceTableSource();

	const onServiceTableRowSelect = (event: CustomEvent) =>
		goto(`${adminAppointmentsPage}/${event.detail}`);

	const sortByDate = (a: ServiceTableRowFormat, b: ServiceTableRowFormat) => {
		return new Date(b.serviceDate).getTime() - new Date(a.serviceDate).getTime();
	};

	onMount(() => {
		uid = getFirebaseUserId();
		if (!uid) goto(authLoginPage);
		else document.cookie = `userId=${uid}; path=/;`;
	});

	onMount(() => {
		unsubServices = onValue(getAllServiceRef(), (snapshot) => {
			if (!snapshot.exists()) return;

			const list: ServiceTableRowFormat[] = [];

			snapshot.forEach((childSnapshot) => {
				const childKey = childSnapshot.key;
				const childData = childSnapshot.val() as FirebaseServiceFormat;
				list.push({ key: childKey, ...childData });
			});

			list.sort(sortByDate);

			serviceTable = list;
		});
	});

	onDestroy(() => unsubServices && unsubServices());
	onDestroy(() => unsubAdminWatcher && unsubAdminWatcher());
</script>

<PageHeader label="Administration" subLabel="View Upcoming Appointments" />

<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
	<MaterialTertiaryButton label="View Users" on:click={() => goto(adminUsersPage)}>
		<IconAccountMultiple />
	</MaterialTertiaryButton>

	<MaterialTertiaryButton label="View Vehicles" on:click={() => goto(adminVehiclesPage)}>
		<IconCarMultiple />
	</MaterialTertiaryButton>
</div>

<br />

<SurfaceContainer>
	<SurfaceHeader label="Service Appointments" />
	<Table interactive source={serviceTableData} on:selected={onServiceTableRowSelect} />
</SurfaceContainer>
