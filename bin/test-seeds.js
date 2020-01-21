const mongoose = require('mongoose');
const Test = require('../models/tests');

const dbName = 'diagram-logic';
mongoose.connect(`mongodb://localhost/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const tests = [
  {
    testName: "1",
    cases: ["5e25cfe19e928d4458260087", "5e25cfea7b02133b88901466"],    //array of testCaseId
    complexity: "low"
  }
];



Test.create(tests, (err) => {
  if (err) { throw (err) }
  console.log(`Created ${tests.length} tests`)
  mongoose.connection.close();
});
