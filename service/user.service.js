const express = require("express");
const User = require("../models/user");

let user;

//Validating user by id and password
exports.validateUser = async (req, res) => {
  try {
    const id = req.body._id;
    const result = await User.findById(id);
    if (result) {
      if (result.pin === req.body.pin) {
        user = result;
        return res.status(200).json({ Message: "Validation successfull" });
      } else {
        return res.status(401).json({ Message: "Unauthorized Access" });
      }
    } else {
      return res.status(404).json({ Message: "User doesnot exists" });
    }
  } catch (error) {
    return res.status(400).json({ Message: error });
  }
};

//deposit money in the user's account
exports.deposit = async (req, res) => {
  if (user) {
    let {depositAmount} = req.body;
    try {
      if (depositAmount % 100 === 0) {
        user.amount = user.amount + depositAmount;
        user.save();
        res.status(200).json({
          message: `Deposit of amount ${depositAmount} is successful`,
        });
        user = null;
        return;
      } else {
        return res
          .status(400)
          .json({ message: "could not complete this request" });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ Message: error });
    }
  } else {
    return res.status(400).json({ Message: "Authorization failed" });
  }
};

//withdraw money from the user's account
exports.withdraw = async (req, res) => {
  if (user) {
    let withdrawAmount = req.body.withdrawAmount;
    try {
      if (withdrawAmount > user.amount) {
        return res
          .status(400)
          .json({ message: "could not complete this request" });
      }
      if (withdrawAmount % 100 === 0) {
        user.amount = user.amount - withdrawAmount;
        user.save();
        res.status(200).json({
          message: `Withdrew of amount ${withdrawAmount} is successful`,
        });
        user = null;
        return;
      } else {
        return res
          .status(400)
          .json({ message: "could not complete this request" });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ Message: error });
    }
  } else {
    return res.status(400).json({ Message: "Authorization failed" });
  }
};

// Returns Available amount in user's account
exports.checkBalance = async (req, res) => {
  try {
    if (user) {
      res
        .status(400)
        .json({ Message: `Your account balance is ${user.amount}` });
      user = null;
      return;
    } else {
      return res.status(400).json({ Message: "Authorization failed" });
    }
  } catch (error) {
    return res.status(400).json({ Message: error });
  }
};

//Updating phone number in the user's account
exports.phoneNumberUpdate = async (req, res) => {
  try {
    if (user) {
      user.phoneNumber = req.body.newPhoneNumber;
      user.save();
      user = null;
      res.status(200).json({
        message: "Phone number updated successfully",
      });
    } else {
      return res.status(400).json({ Message: "Authorization failed" });
    }
  } catch (error) {
    return res.status(400).json({ Message: error });
  }
};

// Return users from database
exports.getAllValues = async (req, res) => {
  try {
    const result = await User.find();
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(400).json({ Message: error });
  }
};

//Insert new user into database
exports.insertUser = async (req, res) => {
  try {
    const { name, pin, amount, phoneNumber, email } = req.body;
    const result = await User.findOne({ email });
    if (result) {
      return res.status(403).json({ Message: "User already exists" });
    } else {
      const newUser = User({ name, email, amount, phoneNumber, pin });
      newUser.save();
      return res
        .status(200)
        .json({ message: "User data inserted sucessfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ Message: "internal server error" });
  }
};
