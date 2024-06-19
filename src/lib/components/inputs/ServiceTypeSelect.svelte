<script lang="ts">
	import IconCarWrench from '~icons/mdi/car-wrench';
	import type { ServiceType } from '$lib/types/service';

	export let value: ServiceType | '' = '';
	export let disabled: boolean = false;
</script>

<div class="input-group input-group-divider border-none grid-cols-[auto_1fr_auto]">
	<div class="input-group-shim"><IconCarWrench /></div>
	<select name="vehicleSelect" class="select border-none rounded-none" {disabled} bind:value>
		<option value={''} disabled>Select Service Type</option>
		<option value={'BASIC'}>BASIC</option>
		<option value={'PREMIUM'}>PREMIUM</option>
		<option value={'CUSTOM'}>CUSTOM</option>
	</select>
</div>
