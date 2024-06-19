<script lang="ts">
	import IconAccountMultiple from '~icons/mdi/account-multiple';
	import IconCarMultiple from '~icons/mdi/car-multiple';
	import PageHeader from '$lib/components/content/PageHeader.svelte';
	import SurfaceContainer from '$lib/components/containers/SurfaceContainer.svelte';
	import SurfaceHeader from '$lib/components/content/SurfaceHeader.svelte';
	import MaterialTertiaryButton from '$lib/components/buttons/MaterialTertiaryButton.svelte';

	import type { Unsubscriber } from 'svelte/store';
	import type { FirebaseVehicleFormat, VehicleTableRowFormat } from '$lib/types/vehicle';
	import { Table, tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import { onValue } from 'firebase/database';
	import { isAdminState } from '$lib/store/auth';
	import { getFirebaseUserId } from '$lib/firebase/auth';
	import { getAllVehicleRef } from '$lib/firebase/vehicle';
	import { authLoginPage, homePage, adminAppointmentsPage, adminVehiclesPage } from '$utils/pages';

	let uid = '';

	let vehicleTable: VehicleTableRowFormat[] = [];

	let unsubVehicles: Unsubscriber;
	let unsubAdminWatcher: Unsubscriber;

	unsubAdminWatcher = isAdminState.subscribe((isAdmin) => {
		if (!isAdmin) goto(homePage);
	});

	const setVehicleTableSource = (): TableSource => ({
		head: ['Vin', 'Make', 'Model', 'Year', 'Fuel', 'Remarks'],
		body: tableMapperValues(vehicleTable, ['vin', 'make', 'model', 'year', 'fuel', 'remarks']),
		meta: tableMapperValues(vehicleTable, ['key']),
		foot: ['Totals', `<span class="badge variant-soft-primary">${vehicleTable.length}<span>`],
	});

	$: vehicleTableData = vehicleTable && setVehicleTableSource();

	const onTableRowSelect = (event: CustomEvent) => goto(`${adminVehiclesPage}/${event.detail}`);

	onMount(() => {
		uid = getFirebaseUserId();
		if (!uid) goto(authLoginPage);
		else document.cookie = `userId=${uid}; path=/;`;
	});

	onMount(() => {
		unsubVehicles = onValue(getAllVehicleRef(), (snapshot) => {
			if (!snapshot.exists()) return;

			const list: VehicleTableRowFormat[] = [];

			snapshot.forEach((childSnapshot) => {
				const childKey = childSnapshot.key;
				const childData = childSnapshot.val() as FirebaseVehicleFormat;
				list.push({ key: childKey, ...childData });
			});

			vehicleTable = list;
		});
	});

	onDestroy(() => unsubVehicles && unsubVehicles());
	onDestroy(() => unsubAdminWatcher && unsubAdminWatcher());
</script>

<PageHeader label="Administration" subLabel="View Users in System" />

<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
	<MaterialTertiaryButton label="View Appointments" on:click={() => goto(adminAppointmentsPage)}>
		<IconAccountMultiple />
	</MaterialTertiaryButton>

	<MaterialTertiaryButton label="View Vehicles" on:click={() => goto(adminVehiclesPage)}>
		<IconCarMultiple />
	</MaterialTertiaryButton>
</div>

<br />

<SurfaceContainer>
	<SurfaceHeader label="Registered Users" />
	<Table interactive source={vehicleTableData} on:selected={onTableRowSelect} />
</SurfaceContainer>
