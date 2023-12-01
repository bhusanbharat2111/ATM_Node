const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/db")
const userRouter = require("./routes/user.routes");

const app = express();

db()

app.use(express.json());

app.use("/api", userRouter);

app.listen(9000, () => console.log("Server running at 9000"));
