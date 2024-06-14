<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import IconSend from '~icons/mdi/send';

	export let label = 'Submit';
	export let disabled = false;

	const dispatch = createEventDispatcher();
	const click = () => dispatch('click');
</script>

<button
	class="btn px-6 bg-gradient-to-t variant-gradient-tertiary-primary w-full max-w-md"
	{disabled}
	on:click={click}
>
	<span>{label}</span>
	<slot><IconSend /></slot>
</button>
