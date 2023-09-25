const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/../views/login.html');
});

router.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/',
  })
);

module.exports = router;
