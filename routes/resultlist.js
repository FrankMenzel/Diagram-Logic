const express = require('express');
const router = express.Router();
const Results = require('../models/results');
const User = require("../models/users");

router.get('/resultlist', (req, res, next) => {
    const sessUserID = req.session.user._id;
    const sessUserName = req.session.user.userName;
    console.log("This is the session User ID : " + sessUserID);
    console.log("The Name of the session User is : "+ sessUserName);
    Results.find({"userName": sessUserName})
    .then(resultList => {
    let scores = 0;
    let questions = 0;
    //let ergebnis = 0
      for (let i = 0; i < resultList.length; i++){
        scores = resultList[i].score
        questions = resultList[i].numberOfCases
        console.log(scores / questions * 100)
      }
    
    let ergebnis = (scores / questions * 100);
    console.log("Dein Ergebnis : "+ ergebnis + " Prozent");
    console.log(typeof ergebnis);
      res.render('resultlist', {resultList, ergebnis:ergebnis} );
    })
   
  });
  
  module.exports = router;