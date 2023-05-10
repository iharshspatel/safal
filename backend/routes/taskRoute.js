const express = require("express");
const router = express.Router();
const { createTask, getTask, updateTask, deleteTask, totalTask } = require("../controllers/taskController");
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/create").post(isAuthenticatedUser, createTask);
router.route("/get/:id").get(isAuthenticatedUser, getTask);
router.route("/update/:id").put(isAuthenticatedUser, updateTask);
router.route("/delete/:id").delete(isAuthenticatedUser, deleteTask);
router.route("/totaltasks").get(isAuthenticatedUser, totalTask);

module.exports = router