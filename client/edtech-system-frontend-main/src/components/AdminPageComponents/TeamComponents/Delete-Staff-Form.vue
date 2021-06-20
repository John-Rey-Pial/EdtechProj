<template>
	<div class="releaseCodeForm">
		<v-card>
			<form action="" @submit.prevent="deleteStaff">
				<v-card-text>
					<h2>Delete Staff?</h2>

					<div class="inputs">
						<h2>
							This action cannot be undone. This data will be deleted
							permanently.
						</h2>
					</div>
				</v-card-text>
				<v-card-actions>
					<div class="btns">
						<v-btn class="white--text" color="red darken-2" type="submit">
							Delete Staff
						</v-btn>
					</div>

					<v-dialog hide-overlay persistent width="300" v-model="dialog2">
						<v-card color="white" light>
							<v-card-text>
								<p mt-5>Adding Staff. Please wait</p>
								<v-progress-linear
									indeterminate
									color="black"
									class="mb-0 mt-5"
								></v-progress-linear>
							</v-card-text>
						</v-card>
					</v-dialog>
				</v-card-actions>
				<br />
			</form>
		</v-card>
	</div>
</template>

<script>
	import staffAPI from "../../../api/staffAPI";

	export default {
		name: "App",
		props: {
			dialog: Object,
			staff: Object,
		},
		data() {
			return {
				showForm: false,
				dialog2: false,
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

			async deleteStaff() {
				try {
					this.dialog2 = true;
					const staff = await staffAPI.prototype.deleteStaff(this.staff.id);
					alert("Successfully deleted.");
					console.log(staff);
					this.dialog2 = false;
					this.dialog.value = false;
					this.$emit("refresh");
				} catch (error) {
					alert("An Error Occured.");
					this.dialog2 = false;
					this.dialog.value = false;
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

	.btns {
		display: flex;
		justify-content: center;

		margin: auto;
	}

	.inputs h2 {
		margin: 0px;
		padding: 0px;
		color: #1e1e1e;
		font-weight: normal;
	}
</style>
