const express = require('express');
const router = express.Router();
const Results = require('../models/results');



router.get('/results', (req, res) => {
  Results.findById('5e1f1a6b0170a12fac7eced5')
   .then(userResult => {
    let scores = userResult.score;
    let questions = userResult.numberOfCases;
    let ergebnis = (scores / questions) * 100
    console.log("Dein Ergebnis : "+ ergebnis + " Prozent");
    res.render('results', {userResult, ergebnis:ergebnis});
   })
   .catch(err => {
     next(err);
   })
  });
  

module.exports = router;