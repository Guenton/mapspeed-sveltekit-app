<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import IconCarInfo from '~icons/mdi/car-info';

	export let value: string = '';
	export let disabled: boolean = false;
	export let name: HTMLInputAttributes['name'];
	export let autocomplete: HTMLInputAttributes['autocomplete'] = 'off';
	export let placeholder: HTMLInputAttributes['placeholder'] = null;
	export let ref: HTMLInputElement | null = null;

	const dispatch = createEventDispatcher();
	const enter = () => dispatch('enter');
</script>

<div class="input-group input-group-divider border-none grid-cols-[auto_1fr_auto]">
	<div class="input-group-shim">
		<slot><IconCarInfo /></slot>
	</div>
	<input
		class="input border-none rounded-none"
		type="text"
		{name}
		{autocomplete}
		{placeholder}
		{disabled}
		bind:value
		on:keyup={(event) => event.key === 'Enter' && enter()}
		bind:this={ref}
	/>
</div>
