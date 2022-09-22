const express = require("express");
const router = express.Router();
const { createbranch,
    getAllBranches,
    getBranch,
    updateBranch,
    deleteBranch,
    totalbranch } = require("../controllers/branchController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/create").post(isAuthenticatedUser, createbranch);
router.route("/getall").get(isAuthenticatedUser, getAllBranches);
router.route("/get/:id").get(isAuthenticatedUser, getBranch);
router.route("/update/:id").put(isAuthenticatedUser, updateBranch);
router.route("/delete/:id").delete(isAuthenticatedUser, deleteBranch);
router.route("/totalbranchess").get(isAuthenticatedUser, totalbranch);


module.exports = router