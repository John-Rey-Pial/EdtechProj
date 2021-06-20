<template>
	<div class="releaseCodeForm">
		<v-card>
			<form action="" @submit.prevent="deleteRecord">
				<v-card-text>
					<h2 class="red--text">Delete Record</h2>
					<br />

					<div class="inputs">
						<v-text-field
							placeholder="Deleted By"
							filled
							rounded
							required
							v-model="deletedBy"
						></v-text-field>

						<v-text-field
							placeholder="Code"
							filled
							rounded
							type="password"
							v-model="code"
							required
						></v-text-field>
						<div class="btnActions">
							<v-btn color="red darken-2" type="submit">Delete</v-btn>
						</div>

						<v-dialog hide-overlay persistent width="300" v-model="dialog2">
							<v-card color="white" light>
								<v-card-text>
									<p mt-5>Deleting Record. Please wait</p>
									<v-progress-linear
										indeterminate
										color="black"
										class="mb-0 mt-5"
									></v-progress-linear>
								</v-card-text>
							</v-card>
						</v-dialog>
					</div>
					<br />
				</v-card-text>
			</form>
		</v-card>
	</div>
</template>

<script>
	import recordAPI from "../../../../api/recordAPI";

	export default {
		name: "App",
		props: {
			dialog: Object,
			record: Object,
		},

		data() {
			const date = new Date();
			const current =
				date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();

			let time = date.getHours();

			if (time < 12) {
				time =
					date.getHours() +
					":" +
					date.getMinutes() +
					":" +
					date.getSeconds() +
					" am";
			} else {
				time =
					date.getHours() -
					12 +
					":" +
					date.getMinutes() +
					":" +
					date.getSeconds() +
					" pm";
			}
			return {
				showForm: false,
				deletedBy: "",
				code: "",
				dialog2: false,
				time: current + " " + time,
			};
		},
		methods: {
			async deleteRecord() {
				try {
					this.updatedRecord = {
						record_time: this.time,
						record_status: "Deleted",
						borrower_division: this.record.borrower_division,
						borrower_office: this.record.borrower_office,
						borrower_teacher: this.record.borrower_teacher,
						borrower_student: this.record.borrower_student,
						borrowed_equipments: this.record.borrowed_equipments,
						releaser_name: this.deletedBy,
						releaser_code: this.code,
					};
					this.record.record_time = this.updatedRecord.record_time;

					this.dialog2 = true;
					await recordAPI.prototype.updateRecord(
						this.record.id,
						this.updatedRecord
					);
					alert("Successfully deleted");

					this.dialog.value = false;
					this.dialog2 = false;
					this.$emit("getRecords");
					this.dialog2 = false;
				} catch (error) {
					alert("An Error Occured");
					this.dialog2 = false;
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
