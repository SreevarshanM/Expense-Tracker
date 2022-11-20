const express = require("express");
const { expenses } = require("../models");

exports.createExpense = async (req, res) => {
  try {
    console.log(req.body);
    const expense = await expenses.create(req.body);
    if (!expense) {
      throw new Error("Expense not created!");
    }
    res.status(200).json({
      message: "Sucessfully Created",
      status: true,
    });
  } catch (error) {
    res.status(444).json({
      message: `${error}`,
      status: false,
    });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    let query = req.query;
    if (!query) {
      query = "";
    }
    const data = await expenses.find(query);
    if (!data) throw new Error("Something Went Wrong");
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({
      message: `${error}`,
      status: false,
    });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const expense = await expenses.findByIdAndUpdate(req.body._id, req.body, {
      runValidators: true,
      new: true,
    });
    console.log(expense);
    if (!expense) throw new Error("Not Updated");
    res.status(200).json({
      message: "sucessfully Updated",
      status: true,
    });
  } catch (error) {
    res.status(409).json({
      message: `${error}`,
      status: false,
    });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await expenses.findByIdAndDelete(req.body._id);
    if (!expense) throw new Error("Not Deleted");
    res.status(204).json({
      message: "sucessfully Deleted",
      status: true,
    });
  } catch (error) {
    res.status(404).json({
      message: `${error}`,
      status: false,
    });
  }
};
