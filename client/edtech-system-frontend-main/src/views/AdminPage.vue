<template>
	<v-app>
		<div class="app"></div>
		<v-main class="background">
			<v-main>
				<Navigation />
				<div class="main">
					<router-view />
				</div>
			</v-main>
		</v-main>
	</v-app>
</template>

<script>
	import Navigation from "../components/Navigation.vue";
	export default {
		components: { Navigation },
		name: "App",
		data() {
			return {};
		},
		async created() {
			if (localStorage.getItem("token")) {
				console.log("heyyy");
			} else {
				this.$router.push("/accessdenied");
			}
		},
	};
</script>

<style scoped>
	.background {
		background-color: rgba(241, 241, 241, 0.952);
		background-image: url("../assets/edtechlogo.png");
		background-position: center;
		display: flex;
		background-size: 100%;
		background-blend-mode: overlay;
	}

	.main {
		width: 85%;
		margin: 0px auto;
		margin-top: -80px;
	}
</style>
