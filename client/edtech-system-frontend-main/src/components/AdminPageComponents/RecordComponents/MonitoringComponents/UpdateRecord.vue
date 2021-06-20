<template>
	<div class="addRecord">
		<form action="" @submit.prevent="updateRecord">
			<br />
			<h1 class="updateTitle">Update Record</h1>
			<br />
			<div class="mainCon">
				<div class="rightCon">
					<div class="inputs">
						<div class="field">
							<p class="fieldTitle">Borrower's Division</p>
							<v-select
								:items="items"
								rounded
								filled
								v-model="record.borrower_division"
							></v-select>
						</div>

						<div class="field">
							<p class="fieldTitle">Office | Building | Room</p>
							<v-text-field
								placeholder="Office | Building | Room"
								required
								rounded
								filled
								v-model="record.borrower_office"
							></v-text-field>
						</div>

						<div class="field">
							<p class="fieldTitle">Teacher Borrower</p>
							<v-text-field
								placeholder="Teacher Borrower"
								required
								filled
								rounded
								v-model="record.borrower_teacher"
							></v-text-field>
						</div>

						<div class="field">
							<p class="fieldTitle">Student Borrower</p>
							<v-text-field
								placeholder="Student Borrower"
								required
								filled
								rounded
								v-model="record.borrower_student"
							></v-text-field>
						</div>
					</div>
				</div>
				<div class="leftCon">
					<div class="inputs">
						<div class="field">
							<p class="fieldTitle">Equipments (ALT+',' TO ADD)</p>
							<v-text-field
								placeholder="Equipments (ALT+',' TO ADD)"
								rounded
								filled
								v-model="tempEquip"
								@keyup.alt="addEquip"
							></v-text-field>
						</div>
						<div class="selectedEquip">
							<label>Selected Equipments</label>
							<br />
							<div
								v-for="equip in record.borrowed_equipments"
								:key="equip"
								class="pill"
							>
								<v-chip @click="deleteEquip(equip)">{{ equip }}</v-chip>
							</div>
						</div>

						<br />

						<div class="field">
							<p class="fieldTitle">Released By</p>
							<v-text-field
								placeholder="Released By"
								required
								rounded
								filled
								v-model="record.staff.fullname"
							></v-text-field>
						</div>

						<div class="field">
							<p class="fieldTitle">Release Code</p>
							<v-text-field
								placeholder="Release Code"
								required
								rounded
								filled
								type="password"
								v-model="releaser_code"
							></v-text-field>
						</div>
					</div>
				</div>
			</div>
			<div class="btnAction">
				<div class="terms">
					<input type="checkbox" required />
					<label>The data above are accepted.</label>
				</div>
				<v-btn color="yellow darken-2" type="submit">Update Record</v-btn>
				<v-dialog hide-overlay persistent width="300" v-model="dialog2">
					<v-card color="white" light>
						<v-card-text>
							<p mt-5>Updating Record. Please wait</p>
							<v-progress-linear
								indeterminate
								color="black"
								class="mb-0 mt-5"
							></v-progress-linear>
						</v-card-text>
					</v-card>
				</v-dialog>
			</div>
		</form>
	</div>
</template>

<script>
	import recordAPI from "../../../../api/recordAPI";

	export default {
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
				items: ["CEDAS", "SHS", "CET", "CABE", "GRAD SCHOOL"],
				tempEquip: "",
				now: current,
				equips: [],
				releaser_code: "",
				dialog2: false,
				updatedRecord: {
					record_time: current + " " + time,
					record_status: "Borrowed",
					borrower_division: "",
					borrower_office: "",
					borrower_teacher: "",
					borrower_student: "",
					borrowed_equipments: [],
					releaser_name: "",
					releaser_code: "",
				},
			};
		},
		methods: {
			addEquip(e) {
				if (e.key == "," && this.tempEquip) {
					if (!this.record.borrowed_equipments.includes(this.tempEquip)) {
						this.record.borrowed_equipments.push(this.tempEquip);
					}
					this.tempEquip = "";
				}
			},
			deleteEquip(equip) {
				this.record.borrowed_equipments = this.record.borrowed_equipments.filter(
					(item) => {
						return equip !== item;
					}
				);
			},
			async updateRecord() {
				if (this.record.borrowed_equipments.length == 0) {
					alert("No equipments added");
				} else {
					try {
						this.updatedRecord = {
							record_time: this.updatedRecord.record_time,
							record_status: "Borrowed",
							borrower_division: this.record.borrower_division,
							borrower_office: this.record.borrower_office,
							borrower_teacher: this.record.borrower_teacher,
							borrower_student: this.record.borrower_student,
							borrowed_equipments: this.record.borrowed_equipments,
							releaser_name: this.record.staff.fullname,
							releaser_code: this.releaser_code,
						};
						this.record.record_time = this.updatedRecord.record_time;
						this.record.record_status = this.updatedRecord.record_status;

						this.dialog2 = true;
						await recordAPI.prototype.updateRecord(
							this.record.id,
							this.updatedRecord
						);
						alert("Success");
						this.dialog.value = false;
						this.dialog2 = false;
					} catch (error) {
						this.dialog2 = false;
						alert("Error. Incorrect  Code");
					}
				}
			},
		},
	};
</script>

<style scoped>
	.addRecord {
		margin: -10px auto;
		padding: 20px;
		border-radius: 10px;
		background-color: white;
		box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
			0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
	}

	.addRecord h1 {
		color: rgb(100, 100, 100);
		font-size: 30px;
	}

	.mainCon {
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}

	.rightCon,
	.leftCon {
		padding: 20px 20px;
		width: 50%;
	}

	.selectedEquip {
		padding: 8px 20px;
		margin-top: -20px;
	}

	.pill {
		display: inline-block;
		margin: 5px;
		cursor: pointer;
	}

	.btnAction {
		margin: auto;
		text-align: center;
	}

	.btnAction .terms label {
		padding: 5px;
	}

	.btnAction .v-btn {
		margin: 10px 0px;
	}

	.field .fieldTitle {
		font-weight: bold;
		color: grey;
	}

	.updateTitle {
		text-align: center;
	}
</style>
