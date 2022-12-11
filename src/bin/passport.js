const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../schemas/user.js');

passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email,password,done) => {
  console.log(email, password);
  const user = await User.findOne({email:email});
  if(!user){
    return done(null, false, {message: 'correo/contraseña no son válidos.'});
  } else{
    // const match = await user.matchPassword(password);
    if(password == user.password) {
      return done(null, user);
      return done(null, false, {message: 'Bienvenido ' + user.name});
    }
    return done(null, false, {message: 'correo/contraseña no son válidos.'});
  }
}));

passport.serializeUser((user,done) => {
  done(null, user.id);
});

passport.deserializeUser((id,done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  }).lean();
});
