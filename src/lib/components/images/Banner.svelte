<script lang="ts">
	let srcLight = '/images/logoLight.png';
	let srcDark = '/images/logoDark.png';
</script>

<div class="block dark:hidden">
	<img src={srcLight} alt="MapSpeed Banner" width="300" height="150" />
</div>

<div class="hidden dark:block">
	<img src={srcDark} alt="MapSpeed Banner" width="300" height="150" />
</div>
