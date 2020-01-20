const express = require('express');
const router  = express.Router();

router.get('/privat', (req, res, next) => {
  res.render('privatpage');
});

module.exports = router;