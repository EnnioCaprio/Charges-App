const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failWithError: `${process.env.API_URL}` }),
    (req, res) => {
        res.redirect(`${process.env.API_URL}/homepage`);
    }
)

module.exports = router;