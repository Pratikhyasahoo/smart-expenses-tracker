// controllers/expenseController.js
const Expense = require("../models/Expense");
const mongoose = require("mongoose");
exports.addExpense = async (req, res) => {
    try{
  const expense = await Expense.create({
    ...req.body,
    user: req.user
  });

  res.json(expense);
}catch{
    res.status(500).json("Error adding expense");
}
};

exports.getExpenses = async (req, res) => {
    try{
  const { category, min, max } = req.query;

  let query = { user: req.user };

  if (category) query.category = category;
  if (min && max) query.amount = { $gte: min, $lte: max };

  const expenses = await Expense.find(query);
    
  res.json(expenses);
    }catch{
         res.status(500).json("Error geting expense");
    }
};
// controllers/expenseController.js
exports.updateExpense = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid expense ID"
      });
    }
    const updated = await Expense.findOneAndUpdate(
  { _id: req.params.id, user: req.user },
  req.body,
  { new: true }
);
    res.json(updated);
  } catch {
    res.status(500).json("Error updating expense");
  }
};
exports.deleteExpense = async (req, res) => {
  try {
     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid expense ID"
      });
    }
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found or unauthorized"
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
};