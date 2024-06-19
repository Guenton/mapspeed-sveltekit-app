<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authLoginPage, homePage, vehiclesPage } from '$utils/pages';
	import { getFirebaseUserId } from '$lib/firebase/auth';

	import IconComment from '~icons/mdi/comment-processing';
	import IconAccount from '~icons/mdi/account';
	import IconChatAlert from '~icons/mdi/chat-alert';
	import IconAt from '~icons/mdi/at';
	import IconPhone from '~icons/mdi/phone';
	import IconId from '~icons/mdi/identifier';
	import IconCarCog from '~icons/mdi/car-cog';
	import IconABC from '~icons/mdi/alphabetical-variant';
	import IconUpload from '~icons/mdi/upload';
	import PageHeader from '$lib/components/content/PageHeader.svelte';
	import SurfaceContainer from '$lib/components/containers/SurfaceContainer.svelte';
	import SurfaceHeader from '$lib/components/content/SurfaceHeader.svelte';
	import MaterialInput from '$lib/components/inputs/MaterialInput.svelte';
	import MaterialPrimaryFab from '$lib/components/buttons/MaterialPrimaryFab.svelte';

	import type { Unsubscriber } from 'svelte/store';
	import type { FirebaseVehicleFormat } from '$lib/types/vehicle';
	import isValidFirebaseVehicleFormat from '$lib/validation/isValidFirebaseVehicleFormat';
	import { analyticsVehicleEditEvent } from '$lib/firebase/analytics';
	import { onValue } from 'firebase/database';
	import { page } from '$app/stores';
	import {
		getUserVehicleRef,
		removeFirebaseVehicleAsync,
		storeFirebaseVehicleAdviceAsync,
		updateFirebaseVehicleAsync,
	} from '$lib/firebase/vehicle';

	const key = $page.params.key;

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
	let advice: string = '';
	let phone = '';
	let firstName = '';
	let lastName = '';
	let email = '';

	let unsubVehicle: Unsubscriber;

	const storeAdvice = () => storeFirebaseVehicleAdviceAsync(key, uid, advice).catch(() => {});

	onMount(() => {
		const userId = getFirebaseUserId();
		if (!userId) goto(authLoginPage);

		if (!key) console.log('Invalid key');

		unsubVehicle = onValue(getUserVehicleRef(userId, key), (snapshot) => {
			if (!snapshot.exists()) return;

			const data = snapshot.val() as FirebaseVehicleFormat;

			uid = data.uid;
			firstName = data.firstName;
			lastName = data.lastName;
			email = data.email;
			vin = data.vin;
			make = data.make;
			model = data.model;
			year = data.year;
			bodyClass = data.bodyClass;
			engineInfo = data.engineInfo;
			engineCC = data.engineCC;
			engineCylinders = data.engineCylinders;
			fuel = data.fuel;
			remarks = data.remarks;
			phone = data.phone;
			advice = data.advice;
		});
	});

	onDestroy(() => unsubVehicle());
</script>

<PageHeader label="Vehicle" subLabel="Edit {make} {model} {year || 'Vehicle'}, with VIN# {vin}" />
<SurfaceContainer>
	<SurfaceHeader label="Vin Number" />
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8 pb-2 mt-4 mx-4">
		<div class="cols-span-1 md:col-span-2">
			<MaterialInput
				name="vin"
				placeholder="Vehicle Identification Number (VIN)"
				value={vin}
				disabled
			>
				<IconABC />
			</MaterialInput>
		</div>
	</div>

	<br />

	<SurfaceHeader label="Vehicle Information" />
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
			<MaterialInput bind:value={remarks} name="remarks" placeholder="Remarks" disabled>
				<IconComment />
			</MaterialInput>
		</div>

		<div class="cols-span-1 md:col-span-2 lg:col-span-4">
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
</SurfaceContainer>
