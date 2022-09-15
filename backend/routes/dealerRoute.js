const express = require("express");
const router = express.Router();
const { createDealer, getDealer, updateDealer, deleteDealer, getAllDealer, totalDealer } = require("../controllers/dealerController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/create").post(isAuthenticatedUser, createDealer);
router.route("/getall").get(isAuthenticatedUser, getAllDealer);
router.route("/get/:id").get(isAuthenticatedUser, getDealer);
router.route("/update/:id").put(isAuthenticatedUser, updateDealer);
router.route("/delete/:id").delete(isAuthenticatedUser, deleteDealer);
router.route("/totalDealer").get(isAuthenticatedUser, totalDealer);

module.exports = router