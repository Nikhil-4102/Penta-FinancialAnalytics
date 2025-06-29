const express = require("express");
const app = express();
const transactionRoutes = require("./routes/transaction");
const cookieParser = require("cookie-parser");
require("./config/database").connect();
const user = require("./routes/user");
require('dotenv').config();

const PORT = process.env.PORT || 4000;

const cors = require("cors");
app.use(cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1", user);
app.use("/api/v1/transaction", transactionRoutes);

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
});