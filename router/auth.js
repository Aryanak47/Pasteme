const passport = require('passport');
const express = require("express")
const router = express.Router()
router.get('/google',
  passport.authenticate('google', { scope: ['email','profile'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

module.exports = router;