const express = require("express");
const router = express.Router();
const { createCustomer, getCustomer, updateCustomer, deleteCustomer, getAllCustomer, totalCustomer, totalOrderValue } = require("../controllers/customerController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/create").post(isAuthenticatedUser, createCustomer);
router.route("/getall").get(isAuthenticatedUser, getAllCustomer);
router.route("/get/:id").get(isAuthenticatedUser, getCustomer);
router.route("/update/:id").put(isAuthenticatedUser, updateCustomer);
router.route("/delete/:id").delete(isAuthenticatedUser, deleteCustomer);
router.route("/totalcustomers").get(isAuthenticatedUser, totalCustomer);
router.route("/totalorder").get(isAuthenticatedUser, totalOrderValue);

module.exports = router