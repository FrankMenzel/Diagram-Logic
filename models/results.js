const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = new Schema ({
  userName: String,
  testId: String,
  elapsedTime: Number,
  numberOfCases: Number,
  score: Number
},
{
  timestamps: true
});




const Result = mongoose.model("Result", resultSchema);

module.exports = Result;