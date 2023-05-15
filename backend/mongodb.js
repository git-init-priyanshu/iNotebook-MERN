const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/iNotebook";

const connectToMongoDB = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to MongoDB Sucessfully");
  });
};

module.exports = connectToMongoDB;
