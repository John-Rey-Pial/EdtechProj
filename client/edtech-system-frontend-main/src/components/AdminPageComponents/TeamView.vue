<template>
	<div class="staffContainer">
		<h1>MY TEAM</h1>
		<div class="btnActions">
			<v-spacer></v-spacer>

			<v-btn @click="show = !show" v-if="staffs.length != 0">Edit</v-btn>

			<v-dialog transition="dialog-bottom-transition" max-width="500">
				<template v-slot:activator="{ on, attrs }">
					<v-btn color="yellow darken-2" v-bind="attrs" v-on="on"
						>Add Staff</v-btn
					>
				</template>
				<template v-slot:default="dialog">
					<add-staff-form :dialog="dialog" :staffs="staffs"></add-staff-form>
				</template>
			</v-dialog>
		</div>

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
			<div class="mainContent" v-if="staffs.length != 0">
				<div class="staffs" v-for="staff in staffs" :key="staff.id">
					<div class="staff">
						<div class="rightContent">
							<v-avatar size="50">
								<img
									src="https://www.stratapt.com/wp2/wp-content/uploads/2020/02/placeholder-avatar-4-300x300.jpg"
									alt=""
								/>
							</v-avatar>
							<h2>{{ staff.fullname }}</h2>
						</div>
						<div class="leftContent">
							<v-dialog transition="dialog-bottom-transition" max-width="500">
								<template v-slot:activator="{ on, attrs }">
									<v-btn color="yellow darken-2" v-bind="attrs" v-on="on"
										>View release code</v-btn
									>
								</template>
								<template v-slot:default="dialog">
									<view-release-code
										:dialog="dialog"
										:staff="staff"
									></view-release-code>
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
							<v-btn v-bind="attrs" v-on="on">Edit</v-btn>
						</template>
						<template v-slot:default="dialog">
							<edit-staff-form
								:dialog="dialog"
								:staff="staff"
							></edit-staff-form>
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
							<delete-staff-form
								:dialog="dialog"
								:staff="staff"
								@refresh="getStaffs"
							></delete-staff-form>
						</template>
					</v-dialog>
				</div>
			</div>
			<div class="mainContent" v-if="staffs.length == 0">
				<p class="empty">Empty</p>
			</div>
		</div>
	</div>
</template>

<script>
	import AddStaffForm from "./TeamComponents/Add-Staff-Form.vue";
	import DeleteStaffForm from "./TeamComponents/Delete-Staff-Form.vue";
	import EditStaffForm from "./TeamComponents/Edit-Staff-Form.vue";
	import ViewReleaseCode from "./TeamComponents/View-Release-Code.vue";
	import staffAPI from "../../api/staffAPI";
	export default {
		components: {
			ViewReleaseCode,
			AddStaffForm,
			EditStaffForm,
			DeleteStaffForm,
		},

		data() {
			return {
				show: false,
				staffs: [],
				load: false,
				error: null,
				fetched: null,
			};
		},

		async created() {
			await this.getStaffs();
		},

		methods: {
			async getStaffs() {
				try {
					this.load = true;
					const staffs = await staffAPI.prototype.getAllStaff();
					this.fetched = staffs;
					this.staffs = staffs.data;
					this.load = false;
				} catch (error) {
					this.error = error;
					this.load = false;
					alert(error);
				}
			},
		},
	};
</script>

<style scoped>
	.staffContainer h1 {
		font-size: 50px;
		padding: 0px 10px;
		border-radius: 5px;
		background-color: white;
		display: inline-block;
		box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
			0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
		color: #1e1e1e;
	}

	/* btnAction Container - start */

	.btnActions {
		display: flex;
		width: 90%;
		margin: auto;
		padding: 20px;
	}

	.v-btn {
		margin: 0px 5px;
	}

	/* btnAction Container - end */

	/* Main Content - Start */
	.mainContent {
		width: 90%;
		margin: auto;
		padding: 20px;
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
