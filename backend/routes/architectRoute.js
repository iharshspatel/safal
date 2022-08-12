const express = require("express");
const router = express.Router();
const {createArchitect, getArchitect, updateArchitect, deleteArchitect, getAllArchitect, totalarchitect} = require("../controllers/architectController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/create").post(createArchitect);
router.route("/getall").get(getAllArchitect);
router.route("/get/:id").get(getArchitect);
router.route("/update/:id").put(updateArchitect);
router.route("/delete/:id").delete(deleteArchitect);
router.route("/totalarchitects").get(totalarchitect);

module.exports = router