<template>
	<div class="addRecord">
		<form action="">
			<br />
			<h1 class="updateTitle">Details</h1>
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
								disabled
								v-model="record.borrower_division"
							></v-select>
						</div>

						<div class="field">
							<p class="fieldTitle">Office | Building | Room</p>
							<v-text-field
								placeholder="Office | Building | Room"
								required
								rounded
								disabled
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
								disabled
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
								disabled
								v-model="record.borrower_student"
							></v-text-field>
						</div>
					</div>
				</div>
				<div class="leftCon">
					<div class="inputs">
						<div>
							<div class="field">
								<label class="fieldTitle">Returned Equipments</label>
							</div>
							<br />
							<div
								v-for="equip in record.borrowed_equipments"
								:key="equip"
								class="pill"
							>
								<v-chip>{{ equip }}</v-chip>
							</div>
						</div>

						<br />

						<div class="field">
							<p class="fieldTitle">Received by</p>
							<v-text-field
								placeholder="Received By"
								required
								rounded
								filled
								v-model="record.staff.fullname"
								disabled
							></v-text-field>
						</div>

						<div class="field">
							<p class="fieldTitle">Received On</p>
							<v-text-field
								placeholder="Received On"
								required
								rounded
								filled
								v-model="record.record_time"
								disabled
							></v-text-field>
						</div>
					</div>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
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
