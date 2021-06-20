const { DataTypes } = require("sequelize");
const db = require("../utils/db");

const Admin = db.define(
	"admin",
	{
		admin_username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		admin_password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ tableName: "admin" }
);

const Record = db.define(
	"record",
	{
		record_time: DataTypes.STRING,
		record_status: DataTypes.STRING,
		borrower_division: DataTypes.STRING,
		borrower_office: DataTypes.STRING,
		borrower_teacher: DataTypes.STRING,
		borrower_student: DataTypes.STRING,
		borrowed_equipments: DataTypes.ARRAY(DataTypes.STRING),
	},
	{ tableName: "record" }
);

const Staff = db.define(
	"staff",
	{
		fullname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		releasedCode: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ tableName: "staff" }
);

const History = db.define(
	"history",
	{
		date: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		records: {
			type: DataTypes.ARRAY(DataTypes.STRING(1000)),
		},
	},
	{ tableName: "history" }
);

Admin.hasMany(Staff, { onDelete: "CASCADE" });
Staff.belongsTo(Admin);

Staff.hasMany(Record);
Record.belongsTo(Staff);

Admin.hasMany(Record, { onDelete: "CASCADE" });
Record.belongsTo(Admin);

module.exports = { Admin, Staff, Record, History };
