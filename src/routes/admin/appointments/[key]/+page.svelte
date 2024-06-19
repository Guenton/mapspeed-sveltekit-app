<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { adminAppointmentsPage, authLoginPage, servicePage } from '$utils/pages';
	import { getFirebaseUserId } from '$lib/firebase/auth';

	import IconComment from '~icons/mdi/comment-processing';
	import IconAccount from '~icons/mdi/account';
	import IconAt from '~icons/mdi/at';
	import IconPhone from '~icons/mdi/phone';
	import IconId from '~icons/mdi/identifier';
	import IconUpload from '~icons/mdi/upload';
	import IconChatAlert from '~icons/mdi/chat-alert';
	import IconABC from '~icons/mdi/alphabetical-variant';
	import IconCheckAll from '~icons/mdi/check-all';
	import IconThumbUp from '~icons/mdi/thumb-up';
	import IconThumbDown from '~icons/mdi/thumb-down';
	import PageHeader from '$lib/components/content/PageHeader.svelte';
	import SurfaceContainer from '$lib/components/containers/SurfaceContainer.svelte';
	import SurfaceHeader from '$lib/components/content/SurfaceHeader.svelte';
	import MaterialInput from '$lib/components/inputs/MaterialInput.svelte';
	import MaterialSecondaryButton from '$lib/components/buttons/MaterialSecondaryButton.svelte';
	import MaterialTertiaryButton from '$lib/components/buttons/MaterialTertiaryButton.svelte';
	import MaterialPrimaryFab from '$lib/components/buttons/MaterialPrimaryFab.svelte';
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
		storeFirebaseServiceAdviceAsync,
		updateFirebaseServiceAsync,
	} from '$lib/firebase/service';
	import MaterialSuccessButton from '$lib/components/buttons/MaterialSuccessButton.svelte';
	import MaterialPrimaryButton from '$lib/components/buttons/MaterialPrimaryButton.svelte';

	const key = $page.params.key;

	let uid: string = '';
	let vin: string = '';
	let vehicleKey: string = '';

	let serviceDate: string = '';
	let serviceType: ServiceType = 'BASIC';
	let vehicleInfo: string = '';
	let status: ServiceStatus = 'REQUESTED';
	let remarks: string = '';
	let advice: string = '';

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
			advice,
			serviceType,
			status,
			firstName,
			lastName,
			email,
			phone,
		};

		if (!isValidFirebaseServiceFormat(serviceFormat)) return;

		updateFirebaseServiceAsync(key, serviceFormat)
			.then(() => goto(adminAppointmentsPage))
			.catch(() => null)
			.finally(() => analyticsServiceEditEvent(uid));
	};

	const storeAdvice = () => storeFirebaseServiceAdviceAsync(key, uid, advice).catch(() => {});

	const accept = () => {
		status = 'ACCEPTED';
		store();
	};
	const complete = () => {
		status = 'COMPLETED';
		store();
	};
	const decline = () => {
		status = 'DECLINED';
		store();
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
			advice = data.advice;
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

<PageHeader label="Appointment Information" subLabel="{vehicleInfo}, Service Date: {displayDate}" />

<SurfaceContainer>
	<SurfaceHeader label="Service Appointment" />
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8 pb-2 mt-4 mx-4">
		<VehicleSelect bind:vehicleList bind:value={vehicleKey} disabled />
		<MaterialInput name="vin" placeholder="Selected Vehicle VIN" value={vin} disabled>
			<IconABC />
		</MaterialInput>
		<DateTimeInput bind:value={serviceDate} disabled />
		<ServiceTypeSelect bind:value={serviceType} disabled />

		<div class="cols-span-1 md:col-span-2">
			<MaterialInput bind:value={remarks} name="remarks" placeholder="Remarks" disabled>
				<IconComment />
			</MaterialInput>
		</div>

		<div class="cols-span-1 md:col-span-2">
			<div class="flex gap-4">
				<MaterialInput bind:value={advice} name="advice" placeholder="Mechanic Advice">
					<IconChatAlert />
				</MaterialInput>
				<MaterialPrimaryFab on:click={storeAdvice}>
					<IconUpload />
				</MaterialPrimaryFab>
			</div>
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
		<MaterialSecondaryButton label="Accept" on:click={accept}>
			<IconThumbUp />
		</MaterialSecondaryButton>
		<MaterialPrimaryButton label="Complete" on:click={complete}>
			<IconCheckAll />
		</MaterialPrimaryButton>
		<MaterialTertiaryButton label="Decline" on:click={decline}>
			<IconThumbDown />
		</MaterialTertiaryButton>
	</div>
</SurfaceContainer>
