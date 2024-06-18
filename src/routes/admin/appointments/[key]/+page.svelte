<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authLoginPage, servicePage } from '$utils/pages';
	import { getFirebaseUserId } from '$lib/firebase/auth';

	import IconComment from '~icons/mdi/comment-processing';
	import IconAccount from '~icons/mdi/account';
	import IconAt from '~icons/mdi/at';
	import IconPhone from '~icons/mdi/phone';
	import IconId from '~icons/mdi/identifier';
	import IconCarCog from '~icons/mdi/car-cog';
	import IconABC from '~icons/mdi/alphabetical-variant';
	import PageHeader from '$lib/components/content/PageHeader.svelte';
	import SurfaceContainer from '$lib/components/containers/SurfaceContainer.svelte';
	import SurfaceHeader from '$lib/components/content/SurfaceHeader.svelte';
	import MaterialInput from '$lib/components/inputs/MaterialInput.svelte';
	import MaterialSecondaryButton from '$lib/components/buttons/MaterialSecondaryButton.svelte';
	import MaterialTertiaryButton from '$lib/components/buttons/MaterialTertiaryButton.svelte';
	import VehicleSelect from '$lib/components/inputs/VehicleSelect.svelte';
	import DateTimeInput from '$lib/components/inputs/DateTimeInput.svelte';
	import ServiceTypeSelect from '$lib/components/inputs/ServiceTypeSelect.svelte';

	import type { Unsubscriber } from 'svelte/store';
	import type { FirebaseVehicleFormat, VehicleTableRowFormat } from '$lib/types/vehicle';
	import type { FirebaseServiceFormat, ServiceStatus, ServiceType } from '$lib/types/service';
	import isValidFirebaseServiceFormat from '$lib/validation/isValidFirebaseServiceFormat';
	import { analyticsServiceEditEvent } from '$lib/firebase/analytics';
	import { onValue } from 'firebase/database';
	import { page } from '$app/stores';
	import { getAllUserVehicleRef } from '$lib/firebase/vehicle';
	import {
		getUserServiceRef,
		removeFirebaseServiceAsync,
		updateFirebaseServiceAsync,
	} from '$lib/firebase/service';

	const key = $page.params.key;

	let uid: string = '';
	let vin: string = '';
	let vehicleKey: string = '';

	let serviceDate: string = '';
	let serviceType: ServiceType = 'BASIC';
	let vehicleInfo: string = '';
	let status: ServiceStatus = 'REQUESTED';
	let remarks: string = '';

	let firstName = '';
	let lastName = '';
	let email = '';
	let phone = '';

	$: displayDate = serviceDate && new Date(serviceDate).toLocaleDateString();

	let vehicleList: VehicleTableRowFormat[] = [];

	let unsubService: Unsubscriber;
	let unsubVehicleList: Unsubscriber;

	$: vehicleKey && watchVehicleInfo();

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
			serviceType,
			status: 'REQUESTED',
			firstName,
			lastName,
			email,
			phone,
		};

		if (!isValidFirebaseServiceFormat(serviceFormat)) return;

		updateFirebaseServiceAsync(key, serviceFormat)
			.then(() => goto(servicePage))
			.catch(() => null)
			.finally(() => analyticsServiceEditEvent(uid));
	};

	const remove = () => {
		removeFirebaseServiceAsync(key, uid)
			.then(() => goto(servicePage))
			.catch(() => {})
			.finally(() => analyticsServiceEditEvent(getFirebaseUserId()));
	};

	const watchVehicleInfo = () => {
		const userId = getFirebaseUserId();
		if (!userId) goto(authLoginPage);

		if (!key) console.log('Invalid key');
	};

	onMount(() => {
		const userId = getFirebaseUserId();
		if (!userId) goto(authLoginPage);

		if (!key) console.log('Invalid key');

		unsubService = onValue(getUserServiceRef(userId, key), (snapshot) => {
			if (!snapshot.exists()) return;

			const data = snapshot.val() as FirebaseServiceFormat;

			uid = data.uid;
			vin = data.vin;
			vehicleKey = data.vehicleKey;
			vehicleInfo = data.vehicleInfo;
			serviceDate = data.serviceDate;
			displayDate = data.displayDate;
			serviceType = data.serviceType;
			remarks = data.remarks;
			status = data.status;

			firstName = data.firstName;
			lastName = data.lastName;
			email = data.email;
			phone = data.phone;
		});

		unsubVehicleList = onValue(getAllUserVehicleRef(userId), (snapshot) => {
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
		if (unsubService) unsubService();
		if (unsubVehicleList) unsubVehicleList();
	});
</script>

<PageHeader
	label="Appointment Status - {status}"
	subLabel="{vehicleInfo}, Service Date: {displayDate}"
/>

<SurfaceContainer>
	<SurfaceHeader label="Edit Service Appointment" />
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
		<MaterialSecondaryButton label="Save Changes" on:click={store} />
		<MaterialTertiaryButton label="Cancel Appointment" on:click={remove} />
	</div>
</SurfaceContainer>
