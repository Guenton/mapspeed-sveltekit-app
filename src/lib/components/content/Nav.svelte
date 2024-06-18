<script lang="ts">
	import { page } from '$app/stores';
	import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import { homePage, vehiclesPage, servicePage, adminPage } from '$utils/pages';
	import { isAdminState } from '$lib/store/auth';
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

	<TabAnchor href={vehiclesPage} selected={$page.url.pathname.startsWith(vehiclesPage)}>
		<span>Vehicles</span>
	</TabAnchor>

	<TabAnchor href={servicePage} selected={$page.url.pathname.startsWith(servicePage)}>
		<span>Service</span>
	</TabAnchor>

	{#if $isAdminState}
		<TabAnchor href={adminPage} selected={$page.url.pathname.startsWith(adminPage)}>
			<span>Admin</span>
		</TabAnchor>
	{/if}
</TabGroup>
