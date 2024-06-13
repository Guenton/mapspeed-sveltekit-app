<script>
	import { createEventDispatcher } from 'svelte';
	import IconGestureTap from '~icons/mdi/gesture-tap';

	export let disabled = false;

	const dispatch = createEventDispatcher();
	const click = () => dispatch('click');
</script>

<button class="btn btn-icon bg-transparent dark:text-white" {disabled} on:click={click}>
	<slot><IconGestureTap /></slot>
</button>
