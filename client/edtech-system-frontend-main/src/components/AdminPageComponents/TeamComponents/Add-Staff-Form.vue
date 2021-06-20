<template>
	<div class="releaseCodeForm">
		<v-card>
			<form action="" @submit.prevent="addStaff">
				<v-card-text>
					<h2>Add Staff</h2>
					<br />

					<div class="inputs">
						<v-text-field
							placeholder="Full Name"
							filled
							rounded
							v-model="staff.fullname"
							required
						></v-text-field>
						<v-text-field
							placeholder="Password"
							filled
							rounded
							type="password"
							v-model="staff.password"
							required
						></v-text-field>
						<v-text-field
							placeholder="Release Code"
							filled
							rounded
							v-model="staff.releasedCode"
							required
							type="password"
						></v-text-field>
					</div>
				</v-card-text>
				<v-card-actions>
					<div class="btns">
						<v-btn class="black--text" color="yellow darken-2" type="submit">
							Add Staff
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
			staffs: Array,
		},
		data() {
			return {
				showForm: false,
				staff: {
					fullname: "",
					password: "",
					releasedCode: "",
				},
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

			async addStaff() {
				try {
					this.dialog2 = true;
					const staff = await staffAPI.prototype.createStaff(this.staff);
					alert("Successfully created.");
					this.staffs.push(staff.data.staff);
					this.dialog2 = false;
					this.dialog.value = false;
					this.staff = {};
				} catch (error) {
					alert("Staff already exists.");
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
</style>
