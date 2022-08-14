const express = require("express");
const router = express.Router();
const {createCustomer, getCustomer, updateCustomer, deleteCustomer, getAllCustomer, totalCustomer, totalOrderValue} = require("../controllers/customerController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/create").post(createCustomer);
router.route("/getall").get(getAllCustomer);
router.route("/get/:id").get(getCustomer);
router.route("/update/:id").put(updateCustomer);
router.route("/delete/:id").delete(deleteCustomer);
router.route("/totalcustomers").get(totalCustomer);
router.route("/totalorder").get(totalOrderValue);

module.exports = router