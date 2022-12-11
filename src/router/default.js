const express = require('express');
const router = express.Router();
const path = require('path');
const {OnSession,OffSession} = require('../bin/auth.js');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/porfolio', (req,res) => {
  res.sendFile(path.join(__dirname + '/../portafolio.html'));
})

router.get('/logout', OnSession, (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
