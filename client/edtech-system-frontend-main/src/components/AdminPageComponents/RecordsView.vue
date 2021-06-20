<template>
	<div class="recordContainer">
		<h1>Records</h1>
		<div class="btnActions">
			<v-btn
				@click="select('monitoring')"
				:color="monitoring ? 'black white--text' : ''"
				>Borrowed</v-btn
			>
			<v-btn
				@click="select('returned')"
				:color="returned ? 'black white--text' : ''"
				>Returned</v-btn
			>
			<v-btn @click="select('add')" :color="add ? 'black white--text' : ''"
				>Add Record</v-btn
			>
		</div>

		<div class="mainContent">
			<monitoring v-if="monitoring"></monitoring>
			<returned v-if="returned"></returned>
			<add-record v-if="add"></add-record>
		</div>
	</div>
</template>

<script>
	import AddRecord from "./RecordComponents/AddRecord.vue";
	import Monitoring from "./RecordComponents/Monitoring.vue";
	import Returned from "./RecordComponents/Returned.vue";

	export default {
		components: {
			AddRecord,
			Returned,
			Monitoring,
		},

		data() {
			return {
				selected: true,
				monitoring: true,
				returned: false,
				add: false,
			};
		},

		methods: {
			select(selected) {
				switch (selected) {
					case "monitoring":
						this.monitoring = true;
						this.returned = false;
						this.add = false;

						break;
					case "returned":
						this.monitoring = false;
						this.returned = true;
						this.add = false;

						break;

					case "add":
						this.monitoring = false;
						this.returned = false;
						this.add = true;

						break;
				}
			},
		},
	};
</script>

<style>
	.recordContainer h1 {
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
		width: 95%;
		margin: auto;
		padding: 20px;
	}
</style>
