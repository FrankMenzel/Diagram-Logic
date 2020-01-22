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

  Test.find()
  .then (docs => {
    let testData = {};
    //testData = one doc selected randomly
    n = Math.floor(Math.random() * docs.length);
    testData = docs[n];
    testData.numOfCases = testData.cases.length;
    console.log("Selected test: " + testData._id);
    res.render("testCase", testData);
        
  });  
});

router.get("/test/new/:testId", (req, res, next) => {
  Test.findById(req.params.testId) 
  .then(testData => {
    testData.numOfCases = testData.cases.length;
    res.render("testCase", testData);
  })  
});

router.get("/testcase/new/:testCaseId", (req, res, next) => {

  TestCase.findById(req.params.testCaseId)
  .then(caseData => res.send(caseData))  //.json(caseData);
});

router.get("/testcase/score/:testCaseId/:answer", (req, res, next) => {
  console.log ("#### Case: " + req.params.testCaseId + " Answer received:" + req.params.answer);
  TestCase.findById(req.params.testCaseId)
  .then(caseData => {
    console.log ("#### Case: " + caseData._id + " Answer stored:" + caseData.line3.result);
    let score = (parseInt(req.params.answer,16) === parseInt(caseData.line3.result,16)); 
    console.log ("#### Score: " + score);
    // calculate all possible answers 
    //let score = evaluateAnswer(req.params.answer, caseData);

      res.send(score);
  });
});

router.post("/test/storeResult", (req, res, next) => {
  const testResult = req.body;
  testResult.userName = req.session.user.userName;
  console.log ("Result to be stored: " + JSON.stringify(testResult));
  //res.render("index");
  Result.create(testResult)
  .then();

});

function evaluateAnswer(answer, caseStored) {

  let result1 = ["AND","NAND","OR","NOR","XOR"].map(e => {
    return bitwise(e, parseInt(caseStored.line1.arg1,16), parseInt(caseStored.line1.arg2,16));
  });
  let result2 = ["AND","NAND","OR","NOR","XOR"].map(e => {
    return bitwise(e, parseInt(caseStored.line2.arg1,16), parseInt(caseStored.line2.arg2,16));
  });
  let result3 = ["AND","NAND","OR","NOR","XOR"].map(e => {
    return bitwise(e, parseInt(caseStored.line3.arg1,16), parseInt(caseStored.line3.arg2,16));
  });

  console.log("calculated result1: " + result1);
  console.log("calculated result2: " + result2);
  console.log("calculated result3: " + result3);
  console.log("stored result1: " + parseInt(caseStored.line1.result,16));
  console.log("stored result2: " + parseInt(caseStored.line2.result,16));
  console.log("stored result3: " + parseInt(caseStored.line3.result,16));
  console.log("given answer: " + parseInt(answer,16));

  for (let i = 0; i < 5; i++) {
    if (result1[i] === parseInt(caseStored.line1.result,16)
     && result2[i] === parseInt(caseStored.line2.result,16)
     && result3[i] === parseInt(answer,16))
        return true;
  }
  return false;
}

function bitwise(op, arg1, arg2) {
  switch (op) {
    case "AND": return arg1 & arg2;
    case "NAND": return (~(arg1 & arg2)) & 15;
    case "OR": return arg1 | arg2;
    case "NOR": return (~(arg1 | arg2)) & 15;
    case "XOR": return arg1 ^ arg2;
    default: return 0;
  }
}


module.exports = router;



