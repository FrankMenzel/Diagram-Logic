const mongoose = require('mongoose');
const Testcase = require('../models/testCases');

const dbName = 'diagram-logic';
mongoose.connect(`mongodb://localhost/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const testcases = [
  {
    catOps: [{catName: "A", opName: "OR"}, {catName: "B", opName: "OR"}],
    complexity: "XS",
    line1: {arg1: "800000", arg2: "400000", result: "C00000"},
    line2: {arg1: "200000", arg2: "100000", result: "300000"},
    line3: {arg1: "080000", arg2: "040000", result: "0C0000"}
  }  
];

Testcase.create(testcases, (err) => {
  if (err) { throw (err) }
  console.log(`Created ${testcases.length} testcases`)
  mongoose.connection.close();
});
