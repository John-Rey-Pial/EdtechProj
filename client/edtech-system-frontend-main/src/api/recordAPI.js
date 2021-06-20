import axios from "axios";
const url = "https://edtech-system-backend.herokuapp.com/api/record";
axios.defaults.headers.common["auth-token"] =
	"Bearer " + localStorage.getItem("token");

export default class API {
	async getAllRecords() {
		axios.defaults.headers.common["auth-token"] =
			"Bearer " + localStorage.getItem("token");
		const records = await axios.get(url + "/all");
		return records;
	}

	async getRecord(recordId) {
		const record = await axios.get(url + "/" + recordId);
		return record;
	}

	async updateRecord(recordId, updatedRecord) {
		const record = await axios.patch(url + "/" + recordId, updatedRecord);
		return record;
	}

	async createRecord(newRecord) {
		const record = await axios.post(url + "/create", newRecord);
		return record;
	}

	async deleteRecord(recordId) {
		const record = await axios.delete(url + "/" + recordId);
		return record;
	}
}
