const Transaction = require("../models/Transaction");

// Helper functions for grouping
function getMonthYear(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${d.getMonth() + 1}`; // e.g., "2024-6"
}
function getYear(date) {
  return new Date(date).getFullYear().toString();
}
function getWeekYear(date) {
  const d = new Date(date);
  const onejan = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil((((d - onejan) / 86400000) + onejan.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${week}`; // e.g., "2024-W23"
}

exports.getAggregatedTransactions = async (req, res) => {
  try {
    const period = req.query.period || "Monthly";
    const transactions = await Transaction.find();

    // Group and aggregate
    const groups = {};
    for (const t of transactions) {
      let key;
      if (period === "Yearly") key = getYear(t.date);
      else if (period === "Weekly") key = getWeekYear(t.date);
      else key = getMonthYear(t.date);

      if (!groups[key]) groups[key] = { revenue: 0, expense: 0 };
      groups[key].revenue += t.revenue || (t.category === "Revenue" ? t.amount : 0);
      groups[key].expense += t.expense || (t.category === "Expense" ? t.amount : 0);
    }

    // Format for chart
    const data = Object.entries(groups)
      .map(([period, vals]) => ({
        month: period, // or week/year label
        revenue: vals.revenue,
        expense: vals.expense,
      }))
      .sort((a, b) => a.month.localeCompare(b.month));

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.status(200).json({ success: true, transactions });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const newTransaction = await Transaction.create(req.body);
    res.status(201).json({ success: true, transaction: newTransaction });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};