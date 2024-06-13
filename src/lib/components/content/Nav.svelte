<script>
	import { page } from '$app/stores';
	import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import { homePage, logsPage, statsPage } from '$utils/pages';
</script>

<TabGroup
	class="bg-transparent w-full"
	justify="justify-center"
	active="underline hover:text-secondary-500"
	hover="hover:text-secondary-500"
	flex="flex-1 lg:flex-none"
	rounded=""
	border=""
>
	<TabAnchor href={homePage} selected={$page.url.pathname.startsWith(homePage)}>
		<span>Home</span>
	</TabAnchor>

	<TabAnchor href={logsPage} selected={$page.url.pathname.startsWith(logsPage)}>
		<span>Vehicles</span>
	</TabAnchor>

	<TabAnchor href={statsPage} selected={$page.url.pathname.startsWith(statsPage)}>
		<span>History</span>
	</TabAnchor>
</TabGroup>
