const express = require("express");
const router = express.Router();
const {test} = require("../controllers/testController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/test").get(isAuthenticatedUser, authorizeRoles("admin") ,test)
router.route("/test/user").get(isAuthenticatedUser,authorizeRoles("user","client", "admin"), test);
router.route("/test/client").get(isAuthenticatedUser,authorizeRoles("client", "admin"),test);
router.route("/test/admin").get(isAuthenticatedUser,authorizeRoles("admin"),test)

module.exports = router