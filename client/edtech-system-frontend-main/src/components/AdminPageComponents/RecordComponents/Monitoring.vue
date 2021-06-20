<template>
	<div class="staffContainer">
		<div v-if="load" class="loading">
			<v-progress-circular
				:size="50"
				:width="5"
				color="yellow darken-2"
				indeterminate
			></v-progress-circular>
		</div>

		<div v-if="error" class="error">
			<h1>There is something wrong</h1>
		</div>

		<div v-if="fetched">
			<div class="btnActions">
				<v-spacer></v-spacer>
				<v-btn @click="show = !show" v-if="records.length != 0">Edit</v-btn>
			</div>

			<div class="mainContent" v-if="records.length != 0">
				<div class="staffs" v-for="record in records" :key="record.id">
					<div class="staff">
						<div class="rightContent">
							<v-chip class="primary">
								{{ record.record_status }}
							</v-chip>
							<h2 class="time">{{ record.record_time }}</h2>
							<div class="chips">
								<p>Borrowed Equipments:</p>
								<v-chip
									v-for="(equipment, index) in record.borrowed_equipments"
									:key="index"
								>
									{{ equipment }}
								</v-chip>
							</div>
						</div>
						<div class="leftContent">
							<v-dialog transition="dialog-bottom-transition" max-width="1000">
								<template v-slot:activator="{ on, attrs }">
									<v-btn color="yellow darken-2" v-bind="attrs" v-on="on"
										>See more details</v-btn
									>
								</template>
								<template v-slot:default="dialog">
									<update-record
										:dialog="dialog"
										:record="record"
									></update-record>
								</template>
							</v-dialog>
						</div>
					</div>
					<v-dialog
						transition="dialog-bottom-transition"
						max-width="500"
						v-if="show"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-btn v-bind="attrs" v-on="on" class="success">Returned</v-btn>
						</template>
						<template v-slot:default="dialog">
							<returned-record
								:dialog="dialog"
								:record="record"
								@getRecords="getRecords()"
							></returned-record>
						</template>
					</v-dialog>
					<v-dialog
						transition="dialog-bottom-transition"
						max-width="500"
						v-if="show"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-btn v-bind="attrs" v-on="on" color="error">Delete</v-btn>
						</template>
						<template v-slot:default="dialog">
							<delete-record
								:dialog="dialog"
								:record="record"
								@getRecords="getRecords()"
							></delete-record>
						</template>
					</v-dialog>
				</div>
			</div>

			<div class="mainContent" v-if="records.length == 0">
				<p class="empty">Empty</p>
			</div>
		</div>
	</div>
</template>

<script>
	import UpdateRecord from "./MonitoringComponents/UpdateRecord.vue";
	import ReturnedRecord from "./MonitoringComponents/ReturnedRecord.vue";
	import DeleteRecord from "./MonitoringComponents/DeleteRecord.vue";

	import recordAPI from "../../../api/recordAPI";

	export default {
		components: {
			UpdateRecord,
			ReturnedRecord,
			DeleteRecord,
		},

		data() {
			return {
				show: false,
				records: [],
				load: false,
				error: null,
				fetched: null,
			};
		},

		methods: {
			async getRecords() {
				try {
					this.load = true;
					this.fetched = null;
					const records = await recordAPI.prototype.getAllRecords();
					this.records = records.data;

					this.records = this.records.reverse();
					this.records = this.records.filter((record) => {
						return record.record_status == "Borrowed";
					});
					this.fetched = records;
					this.load = false;
				} catch (error) {
					alert("An Error Occured");
					this.load = false;
					this.error = error;
				}
			},
		},

		async created() {
			await this.getRecords();
		},
	};
</script>

<style scoped>
	/* btnAction Container - start */

	.btnActions {
		display: flex;
		width: 100%;
		margin: 0px auto;
		padding: 0px 20px;
	}

	.v-btn {
		margin: 0px 5px;
	}

	/* btnAction Container - end */

	/* Main Content - Start */
	.mainContent {
		width: 100%;
		margin: 0px auto;
		padding: 0px 10px;
	}

	.staffs {
		display: flex;

		justify-content: center;
		align-items: center;
	}

	.staff {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: white;
		box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
			0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
		color: #1e1e1e;
		padding: 10px 20px;
		border-radius: 5px;
		margin: 5px auto;
		width: 100%;
	}

	.staff .rightContent {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.rightContent h2 {
		font-weight: normal;
		font-size: 18px;
	}

	.rightContent .time {
		font-size: 14px;
	}
	.staff .leftContent {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.staff .releaseCode {
		padding: 2px 10px;
		margin: 0px;
		background-color: white;
		box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
			0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
		color: #1e1e1e;
		border-radius: 10px;
		font-weight: 500;
	}

	.staff h2 {
		margin: 0px 20px;
	}

	.chips {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.chips p {
		margin: 0px;
		margin-left: 10px;
	}

	.chips .v-chip {
		margin: 0px 5px;
	}

	/* Main Content - End */

	.empty {
		text-align: center;
		padding: 10px;
		margin: 20px;
		font-size: 25px;
		font-weight: bold;
	}

	.loading {
		margin: auto;
		width: 100px;
		text-align: center;
	}
</style>
