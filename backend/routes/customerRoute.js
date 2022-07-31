const express = require("express");
const router = express.Router();
const {createCustomer, getCustomer, updateCustomer, deleteCustomer, getAllCustomer} = require("../controllers/customerController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/create").post(createCustomer);
router.route("/getall").get(getAllCustomer);
router.route("/get/:id").get(getCustomer);
router.route("/update/:id").put(updateCustomer);
router.route("/delete/:id").delete(deleteCustomer);

module.exports = router