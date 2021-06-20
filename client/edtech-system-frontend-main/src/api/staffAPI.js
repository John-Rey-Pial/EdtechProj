import axios from "axios";
const url = "https://edtech-system-backend.herokuapp.com/api/staff";
axios.defaults.headers.common["auth-token"] =
	"Bearer " + localStorage.getItem("token");

export default class API {
	async getAllStaff() {
		axios.defaults.headers.common["auth-token"] =
			"Bearer " + localStorage.getItem("token");
		const staffs = await axios.get(url + "/all");
		return staffs;
	}

	async getSpecificStaff(staffId) {
		axios.defaults.headers.common["auth-token"] =
			"Bearer " + localStorage.getItem("token");
		const staff = await axios.get(url + "/" + staffId);
		return staff;
	}

	async createStaff(newStaff) {
		const staff = await axios.post(url + "/create", newStaff);
		return staff;
	}

	async updateStaff(staffId, updatedStaff) {
		const staff = await axios.patch(url + "/" + staffId, updatedStaff);
		return staff;
	}

	async deleteStaff(staffId) {
		const staff = await axios.delete(url + "/" + staffId);
		return staff;
	}
}
