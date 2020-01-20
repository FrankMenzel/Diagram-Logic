const express = require('express');
const router = express.Router();
const Results = require('../models/results');
const User = require("../models/users");

router.get('/resultlist', (req, res, next) => {
    if (!req.session.user){
      res.redirect('/login');
      return;
    }   
    //const sessUserID = req.session.user._id;
    const sessUserName = req.session.user.userName;
    Results.find({"userName": sessUserName}).sort({field: 'asc', _id: -1})
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