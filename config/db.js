require("dotenv").config();
const mongoose = require("mongoose");
//const connectionString = process.env.MONGODB_CONNECT;

let db = async () => {
  try {
    if (process.env.NODE_ENV === "DEVELOPMENT") {
      const connectionString = process.env.MONGODB_CONNECT_DEV;
      mongoose.set('strictQuery', true);
      mongoose.connect(connectionString, { useNewUrlParser: true });
      console.log("Database connected successfully to development");
    // } else if (process.env.NODE_ENV === "PRODUCTION") {
    //   const connectionString = process.env.MONGODB_CONNECT_PROD;
    //   mongoose.set('strictQuery', true);
    //   mongoose.connect(connectionString, { useNewUrlParser: true });
    //   console.log("Database connected successfully to production");
    } else {
      console.log("Database INVAILD");
    }
  } catch (err) {
    console.log("Failed to connect to db", err);
  }
};

module.exports = db;