const express = require("express");
const router = express.Router();
const { createSalesman,
    getSalesman,
    updateSalesman,
    deleteSalesman,
    getAllSalesman,
     } = require("../controllers/SalesmanController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/create").post(isAuthenticatedUser, createSalesman);
router.route("/getall").get(isAuthenticatedUser, getAllSalesman);
router.route("/get/:id").get(isAuthenticatedUser, getSalesman);
router.route("/update/:id").put(isAuthenticatedUser, updateSalesman);
router.route("/delete/:id").delete(isAuthenticatedUser, deleteSalesman);
// router.route("/totalsalesmans").get(isAuthenticatedUser, totalSalesman);
// router.route("/totalorder").get(isAuthenticatedUser, totalOrderValue);

module.exports = router