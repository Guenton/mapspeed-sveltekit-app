<script>
	let srcLight = '/images/logo.png';
	let srcDark = '/images/logo.png';
</script>

<div class="block dark:hidden">
	<img src={srcLight} alt="MapSpeed Logo" width="50" height="50" />
</div>

<div class="hidden dark:block">
	<img src={srcDark} alt="MapSpeed Logo" width="50" height="50" />
</div>
