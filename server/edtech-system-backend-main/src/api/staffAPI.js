const express = require("express");
const staffController = require("../controller/staffController");
const auth = require("../controller/auth");
const router = express.Router();

router.get("/all", auth.authenticate, staffController.getAllStaff);
router.get("/:staffId", auth.authenticate, staffController.getSpecificStaff);
router.post("/create", auth.authenticate, staffController.createStaff);

router.patch("/:staffId", auth.authenticate, staffController.updateStaff);
router.delete("/:staffId", auth.authenticate, staffController.deleteStaff);

module.exports = router;
