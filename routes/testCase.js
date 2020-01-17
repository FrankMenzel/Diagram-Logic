const express = require("express");
const router = express.Router();
const TestCase = require("../models/testCases");
const Test = require("../models/tests");


router.get("/test/new", (req, res, next) => {
  Test.findOne()
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
    let score = (req.params.answer.toUpperCase() === caseData.line3.result.toUpperCase()); 
    res.send(score)})
});

module.exports = router;

//Case1:
//catOps: [{catName: "A", opName: "OR"}, {catName: "B", opName: "OR"}],
//complexity: "XS",
//  800000   400000   C00000
//  200000   100000   300000
//  080000   040000   0C0000

//Case2:
//catOps: [{catName: "A", opName: "NAND"}, {catName: "C", opName: "XOR"}, {catName: "D", opName: "NOR"}],
//complexity: "S",

//00D800     20C000     201000
//203000     201000     002800
//20F000     00B800     204000


