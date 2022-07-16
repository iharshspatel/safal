const express = require("express");
const router = express.Router();
const {createDealer, getDealer, updateDealer, deleteDealer} = require("../controllers/dealerController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/create").post(createDealer);
router.route("/get/:id").get(getDealer);
router.route("/update/:id").put(updateDealer);
router.route("/delete/:id").delete(deleteDealer);

module.exports = router