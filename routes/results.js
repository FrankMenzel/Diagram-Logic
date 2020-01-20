const express = require('express');
const router = express.Router();
const Results = require('../models/results');
const User = require("../models/users");



router.get('/results', (req, res) => {
  const sessUs = req.session.user.userName;
  Results.findOne({"userName" : sessUs}).sort({field: 'asc', _id: -1}).limit(1)
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