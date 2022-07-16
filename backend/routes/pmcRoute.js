const express = require("express");
const router = express.Router();
const {createPMC, getPMC, updatePMC, deletePMC} = require("../controllers/pmcController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/create").post(createPMC);
router.route("/get/:id").get(getPMC);
router.route("/update/:id").put(updatePMC);
router.route("/delete/:id").delete(deletePMC);

module.exports = router