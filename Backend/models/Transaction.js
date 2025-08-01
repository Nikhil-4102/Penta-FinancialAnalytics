const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["Revenue", "Expense"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Paid", "Pending"],
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  user_profile: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("transaction", TransactionSchema);
