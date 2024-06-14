<script lang="ts">
	let srcLight = '/images/logoLight.png';
	let srcDark = '/images/logoDark.png';
</script>

<div class="block dark:hidden">
	<img src={srcLight} alt="MapSpeed Banner" width="150" height="50" />
</div>

<div class="hidden dark:block">
	<img src={srcDark} alt="MapSpeed Banner" width="150" height="50" />
</div>
