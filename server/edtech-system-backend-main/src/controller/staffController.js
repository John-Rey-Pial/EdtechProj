const models = require("../models");

const getSpecificStaff = async (req, res, next) => {
	try {
		const staff = await models.Staff.findByPk(req.params.staffId);
		if (!staff) {
			const error = new Error("Not Found");
			error.status = 404;
			next(error);
		}
		res.status(200).json(staff);
	} catch (error) {
		next(error);
	}
};

const createStaff = async (req, res, next) => {
	try {
		const adminExist = await models.Admin.findByPk(req.user);
		if (!adminExist) {
			const error = new Error("Admin not found");
			error.status = 404;
			next(error);
		}

		const exist = await models.Staff.findOne({
			where: { fullname: req.body.fullname },
		});

		if (exist) {
			const error = new Error("Staff already exists");
			error.status = 401;
			next(error);
		} else {
			const staff = await models.Staff.create({
				fullname: req.body.fullname,
				password: req.body.password,
				releasedCode: req.body.releasedCode,
				adminId: req.user,
			});

			res.status(200).json({
				success_message: "Successfully created!",
				staff,
			});
		}
	} catch (error) {
		next(error);
	}
};

const getAllStaff = async (req, res, next) => {
	try {
		const users = await models.Staff.findAll({ where: { adminId: req.user } });
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

const updateStaff = async (req, res, next) => {
	try {
		const data = {
			fullname: req.body.fullname,
			password: req.body.password,
			releasedCode: req.body.releasedCode,
		};

		const update = await models.Staff.update(data, {
			where: {
				id: req.params.staffId,
				adminId: req.user,
			},
		});

		if (!update) {
			const error = new Error("Not found");
			error.status = 404;
			next(error);
		} else {
			res.status(200).json({ message: "Successfully updated staff." });
		}
	} catch (error) {
		next(error);
	}
};

const deleteStaff = async (req, res, next) => {
	try {
		const deleted = await models.Staff.destroy({
			where: {
				id: req.params.staffId,
				adminId: req.user,
			},
		});

		if (!deleted) {
			const error = new Error("Not found");
			error.status = 404;
			next(error);
		} else {
			res.status(200).json({ message: "Successfully deleted user." });
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getSpecificStaff,
	createStaff,
	getAllStaff,
	updateStaff,
	deleteStaff,
};
