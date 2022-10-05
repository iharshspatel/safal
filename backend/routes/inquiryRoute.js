const express = require("express");
const router = express.Router();
const { createInquiry, getInquiry, updateInquiry, deleteInquiry, getAllInquiry, totalInquiry ,getFilteredInquiry} = require("../controllers/inquiryController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/create").post(isAuthenticatedUser, createInquiry);
router.route("/getall").get(isAuthenticatedUser, getAllInquiry);
router.route("/get/:id").get(isAuthenticatedUser, getInquiry);
router.route("/update/:id").put(isAuthenticatedUser, updateInquiry);
router.route("/delete/:id").delete(isAuthenticatedUser, deleteInquiry);
router.route("/get/:salesman/:branch/:startdate/:enddate").get(isAuthenticatedUser,getFilteredInquiry);
// router.route("/totalinquiry").get(isAuthenticatedUser, totalInquiry);

module.exports = router