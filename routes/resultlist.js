const express = require('express');
const router = express.Router();
const Results = require('../models/results');
const User = require("../models/users");

router.get('/resultlist', (req, res, next) => {
    if (!req.session.user){
      res.redirect('/login');
      return;
    }   
    
    const sessUserID = req.session.user._id;
    const sessUserName = req.session.user.userName;
    console.log("This is the session User ID : " + sessUserID);
    console.log("The Name of the session User is : "+ sessUserName);
    Results.find({"userName": sessUserName})
      .then(resultList => {              
        for (let i = 0; i < resultList.length; i++){          
          resultList[i].resultInPercentage = Math.round(resultList[i].score / resultList[i].numberOfCases * 100)
        }
        console.log(resultList);        
        res.render('resultlist', {resultList, sessUserName} )
      })
      .catch(err => {
        next(err);
      })   
  });
  
  module.exports = router;