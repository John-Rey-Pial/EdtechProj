const models = require("../models");

const getAllRecords = async (req, res, next) => {
	try {
		const record = await models.Record.findAll({
			where: { adminId: req.user },
			include: models.Staff,
		});
		res.status(200).json(record);
	} catch (error) {
		next(error);
	}
};

const getSpecificRecord = async (req, res, next) => {
	try {
		const record = await models.Record.findByPk(req.params.recordId, {
			include: models.Staff,
		});

		if (!record) {
			const error = new Error("Not Found");
			error.status = 404;
			next(error);
		} else {
			res.status(200).json(record);
		}
	} catch (error) {
		next(error);
	}
};

const createRecord = async (req, res, next) => {
	try {
		const staff = await models.Staff.findOne({
			where: {
				fullname: req.body.releaser_name,
				releasedCode: req.body.releaser_code,
			},
		});

		if (!staff) {
			const error = new Error("Staff not found");
			error.status = 404;
			next(error);
		}

		const data = {
			record_time: req.body.record_time,
			record_status: req.body.record_status,
			borrower_division: req.body.borrower_division,
			borrower_office: req.body.borrower_office,
			borrower_teacher: req.body.borrower_teacher,
			borrower_student: req.body.borrower_student,
			borrowed_equipments: req.body.borrowed_equipments,
			adminId: req.user,
			staffId: staff.id,
		};

		const record = await models.Record.create(data);

		res.status(200).json(record);
	} catch (error) {
		next(error);
	}
};

const updateRecord = async (req, res, next) => {
	try {
		const staff = await models.Staff.findOne({
			where: {
				fullname: req.body.releaser_name,
				releasedCode: req.body.releaser_code,
			},
		});

		if (!staff) {
			const error = new Error("Staff not found");
			error.status = 404;
			next(error);
		}

		const data = {
			record_time: req.body.record_time,
			record_status: req.body.record_status,
			borrower_division: req.body.borrower_division,
			borrower_office: req.body.borrower_office,
			borrower_teacher: req.body.borrower_teacher,
			borrower_student: req.body.borrower_student,
			borrowed_equipments: req.body.borrowed_equipments,
			adminId: req.user,
			staffId: staff.id,
		};

		const update = await models.Record.update(data, {
			where: {
				id: req.params.recordId,
			},
		});

		if (!update) {
			const error = new Error("Not found");
			error.status = 404;
			next(error);
		} else {
			res.status(200).json({ message: "Successfully updated record." });
		}
	} catch (error) {
		next(error);
	}
};

const deleteRecord = async (req, res, next) => {
	try {
		if (!staff) {
			const error = new Error("Staff not found");
			error.status = 404;
			next(error);
		}
		const deleted = await models.Record.destroy({
			where: {
				id: req.params.recordId,
			},
		});

		if (!deleted) {
			const error = new Error("Not found");
			error.status = 404;
			next(error);
		} else {
			res.status(200).json({ message: "Successfully deleted record." });
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllRecords,
	getSpecificRecord,
	createRecord,
	updateRecord,
	deleteRecord,
};
