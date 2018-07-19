const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/', 
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('../');
    })

module.exports = router;