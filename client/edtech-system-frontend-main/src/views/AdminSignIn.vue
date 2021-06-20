<template>
	<div class="adminSignIn">
		<div class="con">
			<v-card light max-width="400" height="550px" color="white">
				<img src="../assets/edtechlogo.png" alt="" />

				<form action="" enctype="multipart/form-data" @submit.prevent="signIn">
					<v-card-title>
						<div class="div">
							<h2>Admin Sign-in</h2>
						</div>
					</v-card-title>
					<br />
					<v-card-text>
						<v-container>
							<v-row>
								<v-text-field
									label="Username*"
									required
									v-model="admin.username"
									dense
									outlined
								></v-text-field>

								<v-text-field
									label="Password*"
									required
									v-model="admin.password"
									dense
									type="password"
									outlined
								></v-text-field>
							</v-row>
						</v-container>
						<small>*indicates required field</small>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>

						<v-btn
							class="black--text"
							color="white lighten-4"
							type="submit"
							dark
						>
							Sign-In
						</v-btn>

						<v-spacer></v-spacer>
						<v-dialog hide-overlay persistent width="300" v-model="dialog2">
							<v-card color="white" light>
								<v-card-text>
									<p mt-5>Signing in. Please wait.</p>
									<v-progress-linear
										indeterminate
										color="black"
										class="mb-0 mt-5"
									></v-progress-linear>
								</v-card-text>
							</v-card>
						</v-dialog>
					</v-card-actions>
				</form>
			</v-card>
		</div>
	</div>
</template>

<script>
	import adminSignIn from "../api/adminSignInAPI";

	export default {
		data: () => ({
			admin: {
				username: "",
				password: "",
			},
			dialog2: false,
		}),
		methods: {
			async signIn() {
				try {
					this.dialog2 = true;
					const admin = await adminSignIn.prototype.logIn(this.admin);
					this.dialog2 = false;
					localStorage.setItem("token", admin.data.admin.token);
					this.$router.push("/adminPage");
				} catch (error) {
					this.dialog2 = false;
					if (error.message == "Network Error") {
						alert(error.message);
					} else {
						alert("Email or Password is incorrect!");
					}
				}
			},
		},

		created() {
			if (localStorage.getItem("token")) {
				this.$router.push("/adminPage");
			}
		},
	};
</script>

<style scoped>
	.adminSignIn {
		width: 90%;
		margin: 100px auto;
		text-align: center;
	}

	.con {
		display: flex;
		justify-content: center;
	}

	.div {
		text-align: center;
		margin: auto;
	}

	.v-card {
		padding: 20px;
	}

	.v-text-field {
		margin-top: 0px;
		margin-bottom: 0px;
	}

	img {
		width: 170px;
	}
</style>
