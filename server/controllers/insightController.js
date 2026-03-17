// controllers/insightController.js
const Expense = require("../models/Expense");
const { generateInsights } = require("../services/aiService");

exports.getInsights = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user });
    const insights = generateInsights(expenses);
    res.json(insights);
  } catch {
    res.status(500).json("Error generating insights");
  }
};