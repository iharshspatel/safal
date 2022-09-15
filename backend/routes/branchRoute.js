const express = require("express");
const router = express.Router();
const { createbranch } = require("../controllers/branchController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/create").post(isAuthenticatedUser, createbranch);

module.exports = router