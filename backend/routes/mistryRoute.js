const express = require("express");
const router = express.Router();
const {createMistry, getMistry, updateMistry, deleteMistry} = require("../controllers/mistryController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/create").post(createMistry);
router.route("/get/:id").get(getMistry);
router.route("/update/:id").put(updateMistry);
router.route("/delete/:id").delete(deleteMistry);
module.exports = router