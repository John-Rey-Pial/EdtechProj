<template>
	<div class="releaseCodeForm">
		<v-card>
			<v-card-text>
				<h2>View Release Code</h2>
				<br />

				<div class="inputs">
					<v-text-field
						placeholder="Password"
						filled
						rounded
						type="password"
						v-model="inputPassword"
					></v-text-field>
					<div class="btnActions">
						<v-dialog transition="dialog-bottom-transition" max-width="400">
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									color="yellow darken-2"
									v-bind="attrs"
									v-on="on"
									@click="validate"
									>Check</v-btn
								>
							</template>
							<div class="con"></div>
							<template v-slot:default="dialog">
								<v-card v-if="showForm">
									<br />
									<h2 class="subtitle">Do not share your release code</h2>
									<div class="codeContainer">
										<h2>
											{{ staff.releasedCode }}
										</h2>
									</div>
									<div class="btnActions">
										<v-btn color="yellow darken-2" @click="dialog.value = false"
											>Close</v-btn
										>
									</div>
									<br />
								</v-card>

								<v-card v-if="!showForm">
									<br />
									<h2 class="subtitle">Password incorrect</h2>
									<br />
								</v-card>
							</template>
						</v-dialog>
					</div>
				</div>
				<br />
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
	export default {
		name: "App",
		props: {
			dialog: Object,
			staff: Object,
		},
		data() {
			return {
				showForm: false,
				inputPassword: "",
			};
		},
		methods: {
			validate() {
				if (this.staff.password == this.inputPassword) {
					this.showForm = true;
				} else {
					this.showForm = false;
				}
			},
		},
	};
</script>

<style scoped>
	.inputs,
	.releasedCode {
		width: 80%;
		margin: auto;
	}

	.btnActions {
		margin: 0px auto;
		padding: 0px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	h2 {
		text-align: center;
		padding: 20px 10px;
	}

	.codeContainer {
		padding: 20px;
	}
	.codeContainer h2 {
		border: 1px solid grey;
		padding: 10px 10px;
		width: 90%;
		margin: auto;
		border-radius: 10px;
		color: rgb(39, 39, 39);
	}

	.subtitle {
		font-size: 20px;
		color: grey;
		font-weight: normal;
		margin: 0px;
		padding: 0px;
	}
</style>
