const express = require('express');
const router  = express.Router();

router.get('/privat', (req, res, next) => {
  if (!req.session.user){
    res.redirect('/login');
    return;
  }
  res.render('privatpage');
});

module.exports = router;