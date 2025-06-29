const express = require("express");
const router = express.Router();
const { getAllTransactions, addTransaction, getAggregatedTransactions } = require("../controllers/transaction");

router.get("/", getAllTransactions);
router.post("/", addTransaction);
router.get("/aggregate", getAggregatedTransactions);

module.exports = router;