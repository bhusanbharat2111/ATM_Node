const express = require("express");
const userRouter = express.Router();
const {
  getAllValues,
  insertUser,
  validateUser,
  deposit,
  withdraw,
  phoneNumberUpdate,
  checkBalance
} = require("../service/user.service");

//Validate user
userRouter.post("/validate-user", validateUser);

//deposit
userRouter.patch("/deposit", deposit);

//withdraw
userRouter.patch("/withdraw", withdraw);

//check balance
userRouter.get("/check-balance", checkBalance);

//phoneNumberUpdate
userRouter.patch("/phoneNumberUpdate", phoneNumberUpdate);

// Return users from database
userRouter.get("/get-all-users", getAllValues);

//Insert new user into database
userRouter.post("/insert-user", insertUser);

module.exports = userRouter;
