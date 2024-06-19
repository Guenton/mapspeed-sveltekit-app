<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import IconSend from '~icons/mdi/send';

	export let label = 'Submit';
	export let disabled = false;

	const dispatch = createEventDispatcher();
	const click = () => dispatch('click');
</script>

<button class="btn px-6 variant-filled-success w-full max-w-md" {disabled} on:click={click}>
	<span>{label}</span>
	<slot><IconSend /></slot>
</button>
