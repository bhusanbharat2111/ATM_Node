const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pin: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: false,
    default: 0,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    validate: {
      validator: (value) => {
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return value.match(re);
      },
      message: "Please enter a vaild email address",
    },
  },
});

module.exports = mongoose.model("User", userSchema);
