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
    cases: ["5e2065baa9d4ce2414f77f8c"],    //array of testCaseId
    complexity: "XS"
  }
];

Test.create(tests, (err) => {
  if (err) { throw (err) }
  console.log(`Created ${tests.length} tests`)
  mongoose.connection.close();
});
