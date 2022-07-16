const express = require("express");
const router = express.Router();
const {createArchitect, getArchitect, updateArchitect, deleteArchitect} = require("../controllers/architectController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/create").post(createArchitect);
router.route("/get/:id").get(getArchitect);
router.route("/update/:id").put(updateArchitect);
router.route("/delete/:id").delete(deleteArchitect);

module.exports = router