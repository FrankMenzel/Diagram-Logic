const express = require("express");
const router = express.Router();
const TestCase = require("../models/testCases");
const Test = require("../models/tests");
const Result = require("../models/results");
const User = require("../models/users");

router.get("/test/new", (req, res, next) => {
  if (!req.session.user){
    res.redirect('/login');
    return;
  }

  //A test must be selected randomly  !!!!

  //Get all test cases from DB

  /*
  TestCase.find()
  .then (docs => {

    //Generate one test 

    createTest(docs);

    //Write it to the DB
    Test.create(test)
    .then(() => {
      mongoose.connection.close();
    });  
  });

*/



  
  Test.findById("5e26e4112b79643cb80e4133")
  .then(testData => {
    testData.numOfCases = testData.cases.length;
    res.render("testCase", testData);
  })   
});

router.get("/test/new/:testId", (req, res, next) => {
  Test.findById(req.params.testId) 
  .then(testData => res.render("testCase", testData))
});

router.get("/testcase/new/:testCaseId", (req, res, next) => {

  TestCase.findById(req.params.testCaseId)
  .then(caseData => res.send(caseData))  //.json(caseData);
});

router.get("/testcase/score/:testCaseId/:answer", (req, res, next) => {

  TestCase.findById(req.params.testCaseId)
  .then(caseData => {
    let score = (parseInt(req.params.answer,16) === parseInt(caseData.line3.result,16)); 
    res.send(score)})
});

router.post("/test/storeResult", (req, res, next) => {
  const testResult = req.body;
  testResult.userName = req.session.user.userName;
  console.log ("Result to be stored: " + JSON.stringify(testResult));
  //res.render("index");
  Result.create(testResult)
  .then();
  
  //.then(() => {res.redirect("/results")});
  //res.render("results");
});

module.exports = router;



