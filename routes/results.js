const express = require('express');
const router = express.Router();
const Results = require('../models/results');



router.get('/results', (req, res) => {
  Results.findById('5e1f1a6b0170a12fac7eced5')
   .then(result => {
    console.log(result.userName);
    let scores = result.score;
    let questions = result.numberOfCases;
    console.log("scores are : " + scores + "and Number of Cases are " + questions);
    let ergebnis = (scores / questions) * 100
    console.log("Dein Ergebnis : "+ ergebnis + " Prozent");
     res.render('results', {result});
     
   })
   .catch(err => {
     next(err);
   })
  });
  


/*
router.get('/new', (req, res) => {
    Celebrity.find().then(celebrities => {
        res.render('movies/new', { celebrities });
    })
        .catch(err => {
            next(err);
        });
});
*/
module.exports = router;