'use strict';

const express = require('express');
const passport = require('passport');
const handleCallbackError = require('./handleCallbackError')();

const router = express.Router();

const env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL
};

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { env });
});

router.get('/custom/:mode', (req, res) => {
  res.render('custom-'+req.params.mode, { env });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/callback', 
  handleCallbackError,
  passport.authenticate('auth0'),
  (req, res) => {
    res.redirect(req.session.returnTo || '/user');
  });

module.exports = router;
