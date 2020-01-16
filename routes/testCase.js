const express = require("express");
const router = express.Router();

router.get("/testcase", (req, res, next) => {
  res.render("testCase");
});

router.get("/testcase/new", (req, res, next) => {

  let caseData = {
     line1: {arg1: "100000", arg2: "200000", result: "300000"},  //hexadecimal strings of length 6
     line2: {arg1: "400000", arg2: "800000", result: "C00000"},
     line3: {arg1: "010000", arg2: "020000", result: "030000"},
  };

  res.send(caseData);
  //.json(caseData);
});

//Components bin:

//cat A  OR 1000   0100  1100
//cat A  OR 0010   0001  0011
//cat A     -      -     -

//cat B     -      -     -
//cat B     -      -     -
//cat B  OR 1000   0100  1100

//Components hex:

//cat A  OR 8     4     C
//cat A  OR 2     1     3
//cat A     -     -     -

//cat B     -     -    -
//cat B     -     -    -
//cat B  OR 8     4     C

//Case:
//  800000   400000   C00000
//  200000   100000   300000
//  080000   040000   0C0000

//catOps: [{catName: "A", opName: "OR"}, {catName: "B", opName: "OR"}],
//complexity: "XS",
//line1: {arg1: "100000", arg2: "200000", result: "300000"},  //hexadecimal strings of length 6
//line2: {arg1: "400000", arg2: "800000", result: "C00000"},
//line3: {arg1: "010000", arg2: "020000", result: "030000"}

module.exports = router;

