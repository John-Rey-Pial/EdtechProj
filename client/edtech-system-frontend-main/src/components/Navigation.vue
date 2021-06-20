<template>
	<nav>
		<v-app-bar app>
			<v-app-bar-nav-icon
				class="black--text"
				@click="drawer = !drawer"
			></v-app-bar-nav-icon>
			<v-toolbar-title class="text-uppercase black--text">
				<span class="font-weight-light">Educational </span>
				<span>Technology |</span>
				<v-chip class="black--text subheading ml-3" color="yellow darken-2">
					<strong>{{ current }}</strong>
				</v-chip>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn width="110px" @click="signOut">
				<span>Sign Out</span>
				<v-icon>mdi-exit-to-app</v-icon>
			</v-btn>
			<v-navigation-drawer
				flat
				app
				v-model="drawer"
				temporary
				width="200"
				class="grey darken-2"
				style="z-index: 1"
			>
				<div class="navHeader">
					<v-avatar size="150" class="mt-10">
						<img src="@/assets/edtechlogo.png" />
					</v-avatar>
					<p class="white--text heading  mt-8">ADMINISTRATOR</p>
					<v-divider class="grey darken-1"> </v-divider>
				</div>
				<v-list>
					<v-list-item
						v-for="link in links"
						:key="link.text"
						:to="link.route"
						class="subheading"
					>
						<v-icon class="white--text ml-4">{{ link.icon }}</v-icon>
						<v-list-item-title class="white--text ml-4">{{
							link.text
						}}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-navigation-drawer>
		</v-app-bar>
	</nav>
</template>

<script>
	const date = new Date();
	const current =
		date.getMonth() + " / " + date.getDate() + " / " + date.getFullYear();
	export default {
		data() {
			return {
				drawer: false,
				current: current,
				links: [
					{ icon: "mdi-folder", text: "Records", route: "/records" },
					{ icon: "mdi-account", text: "My Team", route: "/myteam" },
				],
			};
		},

		methods: {
			signOut() {
				this.$router.push("/logOut");
			},
		},
	};
</script>

<style>
	.navHeader {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
</style>
