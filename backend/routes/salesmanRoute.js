const express = require("express");
const router = express.Router();
const { createSalesman,
    getSalesman,
    updateSalesman,
    deleteSalesman,
    getAllSalesman,
    getArchitectsofSalesman,
    getCustomerofSalesman,
    getDealersofSalesman,
    getInquiriesofSalesman,
    getMistryofSalesman,
    getPMCofSalesman
     } = require("../controllers/salesmanController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/create").post(isAuthenticatedUser, createSalesman);
router.route("/getall").get(isAuthenticatedUser, getAllSalesman);
router.route("/get/:id").get(isAuthenticatedUser, getSalesman);
router.route("/update/:id").put(isAuthenticatedUser, updateSalesman);
router.route("/delete/:id").delete(isAuthenticatedUser, deleteSalesman);


router.route("/customers").post(isAuthenticatedUser,getCustomerofSalesman);
router.route("/architects").post(isAuthenticatedUser,getArchitectsofSalesman);
router.route("/inquiry").post(isAuthenticatedUser,getInquiriesofSalesman);
router.route("/dealer").post(isAuthenticatedUser,getDealersofSalesman);
router.route("/mistry").post(isAuthenticatedUser,getMistryofSalesman);
router.route("/pmc").post(isAuthenticatedUser,getPMCofSalesman);


module.exports = router