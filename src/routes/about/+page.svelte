<script lang="ts">
	import PageHeader from '$lib/components/content/PageHeader.svelte';
	import SurfaceContainer from '$lib/components/containers/SurfaceContainer.svelte';
	import SurfaceHeader from '$lib/components/content/SurfaceHeader.svelte';
	import MaterialInput from '$lib/components/inputs/MaterialInput.svelte';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authLoginPage, homePage } from '$utils/pages';
	import { getFirebaseUserId, storeFirebaseFeedbackAsync } from '$lib/firebase/auth';
	import IconAppBrackets from '~icons/mdi/application-brackets';
	import IconUpload from '~icons/mdi/upload';
	import IconRfcCheck from '~icons/mdi/check-all';
	import FeedbackInput from '$lib/components/inputs/FeedbackInput.svelte';
	import LogoGuenton from '$lib/components/images/LogoGuenton.svelte';
	import MaterialPrimaryFab from '$lib/components/buttons/MaterialPrimaryFab.svelte';

	let uid = '';
	let feedback = '';

	onMount(() => {
		uid = getFirebaseUserId();
		if (!uid) return goto(authLoginPage);
	});

	const sendFeedback = () =>
		storeFirebaseFeedbackAsync(uid, feedback).then(() => goto(homePage).catch(() => {}));
</script>

<PageHeader label="About" subLabel="General Information about this application" />
<SurfaceContainer>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8 pb-2 mt-4 mx-4">
		<SurfaceHeader label="Current App Version" />
		<MaterialInput name="version" value="1.1.0">
			<IconAppBrackets />
		</MaterialInput>

		<SurfaceHeader label="Changes this version" />
		<ul class="list">
			<li>
				<span><IconRfcCheck /></span>
				<span class="flex-auto">Created Admin Dashboard</span>
			</li>
		</ul>

		<SurfaceHeader label="Feedback" />
		<div class="flex gap-3 items-center">
			<FeedbackInput bind:value={feedback} />
			<MaterialPrimaryFab on:click={sendFeedback}>
				<IconUpload />
			</MaterialPrimaryFab>
		</div>

		<SurfaceHeader label="Powered By" />
		<a href="mailto:guenton@gmail.com" class="mt-2"><LogoGuenton /></a>

		<SurfaceHeader label="App Source Code" />
		<a href="https://github.com/Guenton/mapspeed-sveltekit-app" target="_blank" class="anchor"
			>View Source code on GitHub</a
		>
	</div>
</SurfaceContainer>
