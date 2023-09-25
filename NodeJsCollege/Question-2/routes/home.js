const express = require('express');
const router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

router.get('/', isAuthenticated, (req, res) => {
  res.sendFile(__dirname + '/../views/home.html');
});

module.exports = router;
