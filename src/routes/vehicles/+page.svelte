<script lang="ts">
	import IconComment from '~icons/mdi/comment-processing';
	import IconAccount from '~icons/mdi/account';
	import IconAt from '~icons/mdi/at';
	import IconPhone from '~icons/mdi/phone';
	import IconId from '~icons/mdi/identifier';
	import IconABC from '~icons/mdi/alphabetical-variant';
	import IconCarSearch from '~icons/mdi/car-search';
	import IconCarCog from '~icons/mdi/car-cog';
	import PageHeader from '$lib/components/content/PageHeader.svelte';
	import SurfaceContainer from '$lib/components/containers/SurfaceContainer.svelte';
	import SurfaceHeader from '$lib/components/content/SurfaceHeader.svelte';
	import MaterialInput from '$lib/components/inputs/MaterialInput.svelte';
	import MaterialPrimaryButton from '$lib/components/buttons/MaterialPrimaryButton.svelte';
	import MaterialSecondaryButton from '$lib/components/buttons/MaterialSecondaryButton.svelte';

	import type { Unsubscriber } from 'svelte/store';
	import type { FirebaseDatabaseUserFormat } from '$lib/types/auth';
	import type { FirebaseVehicleFormat } from '$lib/types/vehicle';

	import { goto } from '$app/navigation';
	import { onValue } from 'firebase/database';
	import { onDestroy, onMount } from 'svelte';
	import { authLoginPage, homePage } from '$utils/pages';
	import { getFirebaseUserId, getUserRef } from '$lib/firebase/auth';
	import { analyticsLogEntryEvent } from '$lib/firebase/analytics';
	import { storeNewFirebaseVehicleAsync } from '$lib/firebase/vehicle';
	import decodeVinWithNhtsa from '$lib/services/decodeVinWithNhtsa';
	import isValidVinFormat from '$lib/validation/isValidVinFormat';
	import isValidFirebaseVehicleFormat from '$lib/validation/isValidFirebaseVehicleFormat';

	let uid = '';
	let vin: string = '';

	let make: string = '';
	let model: string = '';
	let year: string = '';
	let bodyClass: string = '';
	let engineInfo: string = '';
	let engineCC: string = '';
	let engineCylinders: string = '';
	let fuel: string = '';
	let remarks: string = '';
	let phone = '';
	let firstName = '';
	let lastName = '';
	let email = '';

	let unsubUserInformation: Unsubscriber;

	const vinLookup = () => {
		if (!isValidVinFormat(vin)) return;

		decodeVinWithNhtsa(vin)
			.then((vehicleInfo) => {
				make = vehicleInfo.make;
				model = vehicleInfo.model;
				year = vehicleInfo.year;
				bodyClass = vehicleInfo.bodyClass;
				engineInfo = vehicleInfo.engineInfo;
				engineCC = vehicleInfo.engineCC;
				engineCylinders = vehicleInfo.engineCylinders;
				fuel = vehicleInfo.fuel;
			})
			.catch(() => {});
	};

	const store = () => {
		uid = getFirebaseUserId();
		if (!uid) goto(authLoginPage);

		const vehicleFormat: FirebaseVehicleFormat = {
			uid,
			vin,
			make,
			model,
			year,
			bodyClass,
			engineInfo,
			engineCC,
			engineCylinders,
			fuel,
			remarks,
			firstName,
			lastName,
			phone,
			email,
		};

		if (!isValidFirebaseVehicleFormat(vehicleFormat)) return;

		storeNewFirebaseVehicleAsync(vehicleFormat)
			.then((newKey) => {
				console.log(newKey);
			})
			.catch(() => null)
			.finally(() => analyticsLogEntryEvent(uid));
	};

	onMount(() => {
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
	});

	onDestroy(() => unsubUserInformation());
</script>

<PageHeader label="Vehicles" subLabel="Manage your vehicle fleet" />

<SurfaceContainer>
	<SurfaceHeader label="Vin Input" />
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8 pb-2 mt-4 mx-4">
		<MaterialInput
			name="vin"
			placeholder="Vehicle Identification Number (VIN)"
			on:enter={vinLookup}
			bind:value={vin}
		>
			<IconABC />
		</MaterialInput>
		<MaterialSecondaryButton label="Vin Search" on:click={vinLookup} disabled={!vin}>
			<IconCarSearch />
		</MaterialSecondaryButton>
	</div>

	<br />

	<SurfaceHeader label="New Entry" />
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 m-4">
		<MaterialInput bind:value={make} name="make" placeholder="Make" />
		<MaterialInput bind:value={model} name="model" placeholder="Model" />
		<MaterialInput bind:value={year} name="year" placeholder="Year" />
		<MaterialInput bind:value={bodyClass} name="bodyClass" placeholder="Body Class" />

		<MaterialInput bind:value={engineInfo} name="engineInfo" placeholder="Engine Information">
			<IconCarCog />
		</MaterialInput>
		<MaterialInput bind:value={engineCC} name="engineCC" placeholder="Displacement (CC)">
			<IconCarCog />
		</MaterialInput>
		<MaterialInput bind:value={engineCylinders} name="engineCylinders" placeholder="Cylinders">
			<IconCarCog />
		</MaterialInput>
		<MaterialInput bind:value={fuel} name="fuel" placeholder="Fuel Type">
			<IconCarCog />
		</MaterialInput>

		<div class="cols-span-1 md:col-span-2 lg:col-span-4">
			<MaterialInput bind:value={remarks} name="remarks" placeholder="Remarks">
				<IconComment />
			</MaterialInput>
		</div>
	</div>

	<br />

	<SurfaceHeader label="User Meta Information" />
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
