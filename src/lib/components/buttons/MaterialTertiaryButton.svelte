<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import IconDelete from '~icons/mdi/delete-alert';

	export let label = 'Delete';
	export let disabled = false;

	const dispatch = createEventDispatcher();
	const click = () => dispatch('click');
</script>

<button class="btn px-6 variant-filled-tertiary w-full max-w-md" {disabled} on:click={click}>
	<span>{label}</span>
	<slot><IconDelete /></slot>
</button>
