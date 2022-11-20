const mongoose = require("mongoose");

/////////Expense Schema///////

const schemaExpense = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Expense Name Must Be Defined!!!"],
    maxlength: [30, "Expense Name must have less or equal than 30 characters"],
    mimlength: [5, "Expense name must have more or equal than 5 characters"],
  },
  amount: {
    type: Number,
    required: [true, "Amount Must Be Defined!!!"],
  },
  date: {
    type: Date,
    required: [true, "Date Must Be Defined!!!"],
  },
});

exports.expenses = mongoose.model("expenses", schemaExpense);
