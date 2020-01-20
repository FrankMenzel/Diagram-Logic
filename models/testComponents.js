const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testComponentSchema = new Schema({
  catName: String,
  opName: String,
  line1: {arg1: String, arg2: String, result: String},  //hexadecimal digit
  line2: {arg1: String, arg2: String, result: String},
  line3: {arg1: String, arg2: String, result: String},
}, {
  timestamps: true
});

const TestComponent = mongoose.model("TestComponent", testComponentSchema);
module.exports = TestComponent;

