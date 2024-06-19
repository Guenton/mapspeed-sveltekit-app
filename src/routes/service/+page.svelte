<script lang="ts">
	import IconAccount from '~icons/mdi/account';
	import IconAt from '~icons/mdi/at';
	import IconPhone from '~icons/mdi/phone';
	import IconId from '~icons/mdi/identifier';
	import IconABC from '~icons/mdi/alphabetical-variant';
	import IconComment from '~icons/mdi/comment-processing';
	import VehicleSelect from '$lib/components/inputs/VehicleSelect.svelte';
	import MaterialInput from '$lib/components/inputs/MaterialInput.svelte';
	import PageHeader from '$lib/components/content/PageHeader.svelte';
	import DateTimeInput from '$lib/components/inputs/DateTimeInput.svelte';
	import SurfaceContainer from '$lib/components/containers/SurfaceContainer.svelte';
	import SurfaceHeader from '$lib/components/content/SurfaceHeader.svelte';
	import ServiceTypeSelect from '$lib/components/inputs/ServiceTypeSelect.svelte';
	import MaterialPrimaryButton from '$lib/components/buttons/MaterialPrimaryButton.svelte';

	import type { Unsubscriber } from 'svelte/store';
	import type { FirebaseVehicleFormat, VehicleTableRowFormat } from '$lib/types/vehicle';
	import type { FirebaseDatabaseUserFormat } from '$lib/types/auth';
	import type {
		FirebaseServiceFormat,
		ServiceStatus,
		ServiceTableRowFormat,
		ServiceType,
	} from '$lib/types/service';
	import { Table, tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authLoginPage, servicePage } from '$utils/pages';
	import { getFirebaseUserId, getUserRef } from '$lib/firebase/auth';
	import { onValue } from 'firebase/database';
	import { getAllUserVehicleRef } from '$lib/firebase/vehicle';
	import isValidFirebaseServiceFormat from '$lib/validation/isValidFirebaseServiceFormat';
	import { getAllUserServiceRef, storeNewFirebaseServiceAsync } from '$lib/firebase/service';
	import { analyticsServiceEntryEvent } from '$lib/firebase/analytics';

	let uid: string = '';
	let vin: string = '';
	let vehicleKey: string = '';
	let serviceDate: string = '';
	let serviceType: ServiceType = 'BASIC';
	let remarks: string = '';
	let advice: string = '';
	let status: ServiceStatus = 'REQUESTED';
	let firstName = '';
	let lastName = '';
	let email = '';
	let phone = '';

	$: displayDate = serviceDate && new Date(serviceDate).toLocaleDateString();
	$: vehicleInfo = vehicleKey && setVehicleInfo();

	let serviceTable: ServiceTableRowFormat[] = [];
	let vehicleList: VehicleTableRowFormat[] = [];

	let unsubUserInformation: Unsubscriber;
	let unsubServices: Unsubscriber;
	let unsubVehicles: Unsubscriber;

	const setVehicleInfo = () => {
		const foundVehicle = vehicleList.find((vehicle) => vehicle.key === vehicleKey);
		if (!foundVehicle) return '';

		vin = foundVehicle.vin;
		return `${foundVehicle.make} ${foundVehicle.model} ${foundVehicle.year}`;
	};

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

	const onTableRowSelect = (event: CustomEvent) => goto(`${servicePage}/${event.detail}`);

	const store = () => {
		const userId = getFirebaseUserId();
		if (!userId) return;

		const serviceFormat: FirebaseServiceFormat = {
			uid,
			vin,
			vehicleKey,
			vehicleInfo,
			serviceDate,
			displayDate,
			remarks,
			advice,
			serviceType,
			status,
			firstName,
			lastName,
			email,
			phone,
		};

		if (!isValidFirebaseServiceFormat(serviceFormat)) return;

		storeNewFirebaseServiceAsync(serviceFormat)
			.then((newKey) => console.log(newKey))
			.catch(() => null)
			.finally(() => analyticsServiceEntryEvent(uid));
	};

	onMount(() => {
		uid = getFirebaseUserId();
		if (!uid) goto(authLoginPage);

		uid = getFirebaseUserId();
		if (!uid) goto(authLoginPage);

		unsubUserInformation = onValue(getUserRef(uid), (snapshot) => {
			if (!snapshot.exists()) return;

			const data = snapshot.val() as FirebaseDatabaseUserFormat;
			firstName = data.firstName;
			lastName = data.lastName;
			email = data.email;
			phone = data.phone;
		});

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

			vehicleList = list;
		});
	});

	onDestroy(() => {
		if (unsubUserInformation) unsubUserInformation();
		if (unsubServices) unsubServices();
		if (unsubVehicles) unsubVehicles();
	});
</script>

<PageHeader label="Service" subLabel="Service Appointment Information" />
<SurfaceContainer>
	<SurfaceHeader label="Service Appointments" />
	<Table interactive source={serviceTableData} on:selected={onTableRowSelect} />
</SurfaceContainer>

<br />

<SurfaceContainer>
	<SurfaceHeader label="Request New Service Appointment" />
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8 pb-2 mt-4 mx-4">
		<VehicleSelect bind:vehicleList bind:value={vehicleKey} />
		<MaterialInput name="vin" placeholder="Selected Vehicle VIN" value={vin} disabled>
			<IconABC />
		</MaterialInput>

		<DateTimeInput bind:value={serviceDate} />
		<ServiceTypeSelect bind:value={serviceType} />
		<div class="cols-span-1 md:col-span-2">
			<MaterialInput bind:value={remarks} name="remarks" placeholder="Remarks">
				<IconComment />
			</MaterialInput>
		</div>
	</div>

	<br />

	<SurfaceHeader label="Main Contact Information" />
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8 pb-2 mt-4 mx-4">
		<div class="cols-span-1 md:col-span-2">
			<MaterialInput value={uid} name="uid" placeholder="User Id" disabled>
				<IconId />
			</MaterialInput>
		</div>

		<MaterialInput value={firstName} name="firstName" placeholder="First Name" disabled>
			<IconAccount />
		</MaterialInput>

		<MaterialInput value={lastName} name="lastName" placeholder="Last Name" disabled>
			<IconAccount />
		</MaterialInput>

		<MaterialInput value={email} name="email" placeholder="Email" disabled>
			<IconAt />
		</MaterialInput>

		<MaterialInput value={phone} name="phone" placeholder="Phone" disabled>
			<IconPhone />
		</MaterialInput>
	</div>

	<div class="flex items-center justify-center gap-8 my-5 mx-4 mt-8">
		<MaterialPrimaryButton on:click={store} />
	</div>
</SurfaceContainer>
