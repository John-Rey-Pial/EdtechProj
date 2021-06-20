const express = require("express");
const auth = require("../controller/auth");
const recordController = require("../controller/recordController");
const router = express.Router();

router.get("/all", auth.authenticate, recordController.getAllRecords);

router.get("/:recordId", recordController.getSpecificRecord);

router.post("/create", auth.authenticate, recordController.createRecord);

router.patch("/:recordId", recordController.updateRecord);

router.delete("/:recordId", recordController.deleteRecord);

module.exports = router;
