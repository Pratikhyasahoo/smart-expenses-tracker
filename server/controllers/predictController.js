// controllers/predictController.js
const Expense = require("../models/Expense");

exports.predictSpending = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user });

    let total = expenses.reduce((sum, e) => sum + e.amount, 0);
    let avg = total / (expenses.length || 1);

    res.json({
      message: "Predicted average spending",
      predicted: avg.toFixed(2)
    });
  } catch {
    res.status(500).json("Prediction error");
  }
};