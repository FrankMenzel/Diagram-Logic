const express = require('express');
const router = express.Router();
const Results = require('../models/results');

router.get('/resultlist', (req, res) => {
    if (!req.session.user){
      res.redirect('/login');
      return;
    }   
    //const sessUserID = req.session.user._id;
    const sessUserName = req.session.user.userName;
    Results.find({"userName": sessUserName}).sort({createdAt: 'desc'})
      .then(resultList => {              
        for (let i = 0; i < resultList.length; i++){          
          resultList[i].resultInPercentage = Math.round(resultList[i].score / resultList[i].numberOfCases * 100)
        }       
        res.render('resultlist', {resultList, sessUserName} )
      })
  });
  
  module.exports = router;