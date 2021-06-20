<template>
	<v-app>
		<div class="app"></div>
		<v-main class="mx-3 mb-3 background">
			<div class="main">
				<router-view />
			</div>
		</v-main>
	</v-app>
</template>

<script>
	export default {
		name: "App",
		data() {
			return {};
		},
	};
</script>

<style scoped>
	.background {
		background-color: rgba(241, 241, 241, 0.952);
		background-image: url("./assets/edtechlogo.png");
		background-position: center;
		display: flex;
		background-size: 100%;
		background-blend-mode: overlay;
	}
</style>
