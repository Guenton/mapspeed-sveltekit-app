<script lang="ts">
	import PageHeader from '$lib/components/content/PageHeader.svelte';
	import SurfaceContainer from '$lib/components/containers/SurfaceContainer.svelte';
	import SurfaceHeader from '$lib/components/content/SurfaceHeader.svelte';

	import type { Unsubscriber } from 'svelte/store';
	import type { FirebaseServiceFormat, ServiceTableRowFormat } from '$lib/types/service';
	import type { FirebaseVehicleFormat, VehicleTableRowFormat } from '$lib/types/vehicle';
	import { goto } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import { onValue } from 'firebase/database';
	import { getFirebaseUserId } from '$lib/firebase/auth';
	import { authLoginPage, vehiclesPage, servicePage } from '$utils/pages';
	import { Table, tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';
	import { getAllUserVehicleRef } from '$lib/firebase/vehicle';
	import { getAllUserServiceRef } from '$lib/firebase/service';

	let uid = '';

	let serviceTable: ServiceTableRowFormat[] = [];
	let vehicleTable: VehicleTableRowFormat[] = [];

	let unsubServices: Unsubscriber;
	let unsubVehicles: Unsubscriber;

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

	const setVehicleTableSource = (): TableSource => ({
		head: ['Vin', 'Make', 'Model', 'Year', 'Fuel', 'Remarks'],
		body: tableMapperValues(vehicleTable, ['vin', 'make', 'model', 'year', 'fuel', 'remarks']),
		meta: tableMapperValues(vehicleTable, ['key']),
		foot: ['Totals', `<span class="badge variant-soft-primary">${vehicleTable.length}<span>`],
	});

	$: vehicleTableData = vehicleTable && setVehicleTableSource();

	const onServiceTableRowSelect = (event: CustomEvent) => goto(`${servicePage}/${event.detail}`);
	const onVehicleTableRowSelect = (event: CustomEvent) => goto(`${vehiclesPage}/${event.detail}`);

	onMount(() => {
		uid = getFirebaseUserId();
		if (!uid) goto(authLoginPage);

		unsubServices = onValue(getAllUserServiceRef(uid), (snapshot) => {
			if (!snapshot.exists()) return;

			const list: ServiceTableRowFormat[] = [];

			snapshot.forEach((childSnapshot) => {
				const childKey = childSnapshot.key;
				const childData = childSnapshot.val() as FirebaseServiceFormat;
				list.push({ key: childKey, ...childData });
			});

			serviceTable = list;
		});

		unsubVehicles = onValue(getAllUserVehicleRef(uid), (snapshot) => {
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

	onDestroy(() => {
		if (unsubServices) unsubServices();
		if (unsubVehicles) unsubVehicles();
	});
</script>

<PageHeader label="Dashboard" subLabel="View General Information" />
<SurfaceContainer>
	<SurfaceHeader label="Service Appointments" />
	<Table interactive source={serviceTableData} on:selected={onServiceTableRowSelect} />
</SurfaceContainer>

<br />

<SurfaceContainer>
	<SurfaceHeader label="My Vehicles" />
	<Table interactive source={vehicleTableData} on:selected={onVehicleTableRowSelect} />
</SurfaceContainer>
