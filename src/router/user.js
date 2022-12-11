const express = require('express');
const router = express.Router();
const {OnSession,OffSession} = require('../bin/auth.js');
const passport = require('passport');
const User = require('../schemas/user.js');

router.get('/login', OffSession, (req, res) => {
  res.render('login');
});

router.get('/register', OffSession, (req, res) => {
  res.render('register');
});

router.post('/login',OffSession, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.post('/register', OffSession, async (req, res) => {
  const {password, repeat_password, name, email} = req.body;
  const query = await User.findOne({email:email});

  if (!query) {
    if (password == repeat_password) {
      const NewUser = new User({password, name, email});
      // password pass 1
      // password pass 2
      await NewUser.save()
      req.flash('succ', 'Registro exitoso, inicia sesión.')
      res.redirect('/login');
      return;
    }
    req.flash('err', 'Las contraseñas no coinciden');
    res.redirect('/register');
    return;
  }
  req.flash('err', 'El correo electronico ya existe');
  res.redirect('/register');
  return;
});

module.exports = router;
