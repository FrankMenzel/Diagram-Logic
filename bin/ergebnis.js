const mongoose = require('mongoose');
const Results = require('../models/results');


mongoose.connect('mongodb://localhost/diagram-logic', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const results = [
  {
    userName: "Frank Menzel",
  testId: "XYB45678IN",
  elapsedTime: 4500,
  numberOfCases: 5,
  score: 4
  },
  {
    userName: "Karin Bialas",
    testId: "IUH532523523",
    elapsedTime: 2300,
    numberOfCases: 5,
    score: 7
  }
];
Results.insertMany(results)
  .then(result => {
    console.log('Result daten sind korrekt in der DB');
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(`An error occured: ${err}`);
  });