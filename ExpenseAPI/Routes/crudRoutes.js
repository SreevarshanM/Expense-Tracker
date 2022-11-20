const express = require("express");
const crudController = require("../Controllers/crudController");

const router = express.Router();

router.route("/createExpense").post(crudController.createExpense);
router.route("/getExpenses").get(crudController.getExpenses);
router.route("/deleteExpense").delete(crudController.deleteExpense);
router.route("/updateExpense").patch(crudController.updateExpense);

module.exports = router;
