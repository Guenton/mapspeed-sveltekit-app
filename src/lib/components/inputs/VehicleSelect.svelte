<script lang="ts">
	import IconCarSelect from '~icons/mdi/car-select';
	import type { VehicleTableRowFormat } from '$lib/types/vehicle';

	export let value: string = '';
	export let vehicleList: VehicleTableRowFormat[] = [];
</script>

<div class="input-group input-group-divider border-none grid-cols-[auto_1fr_auto]">
	<div class="input-group-shim"><IconCarSelect /></div>
	<select name="vehicleSelect" class="select border-none rounded-none" bind:value>
		<option value={''} disabled>Select Vehicle</option>
		{#each vehicleList as vehicle}
			<option value={vehicle.key}>{`${vehicle.make} ${vehicle.model} ${vehicle.year}`}</option>
		{/each}
	</select>
</div>
