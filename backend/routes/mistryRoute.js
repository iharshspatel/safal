const express = require("express");
const router = express.Router();
const { createMistry, getMistry, updateMistry, deleteMistry, getAllMistry, totalMistry } = require("../controllers/mistryController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/create").post(isAuthenticatedUser, createMistry);
router.route("/getall").get(isAuthenticatedUser, getAllMistry);
router.route("/get/:id").get(isAuthenticatedUser, getMistry);
router.route("/update/:id").put(isAuthenticatedUser, updateMistry);
router.route("/delete/:id").delete(isAuthenticatedUser, deleteMistry);
router.route("/totalMistry").get(isAuthenticatedUser, totalMistry);
module.exports = router