const express = require("express");
const router = express.Router();
const { createbranch,
    getAllBranches,
    getBranch,
    updateBranch,
    deleteBranch,
    totalbranch, 
    getCustomerofBranch,
    getArchitectsofBranch,
    getPMCofBranch,
    getMistryofBranch,
    getDealersofBranch} = require("../controllers/branchController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/create").post(isAuthenticatedUser, createbranch);
router.route("/getall").get(isAuthenticatedUser, getAllBranches);
router.route("/get/:id").get(isAuthenticatedUser, getBranch);
router.route("/update/:id").put(isAuthenticatedUser, updateBranch);
router.route("/delete/:id").delete(isAuthenticatedUser, deleteBranch);
router.route("/totalbranchess").get(isAuthenticatedUser, totalbranch);

router.route("/customers").post(isAuthenticatedUser,getCustomerofBranch);
router.route("/architects").post(isAuthenticatedUser,getArchitectsofBranch);
router.route("/dealer").post(isAuthenticatedUser,getDealersofBranch);
router.route("/mistry").post(isAuthenticatedUser,getMistryofBranch);
router.route("/pmc").post(isAuthenticatedUser,getPMCofBranch);

module.exports = router