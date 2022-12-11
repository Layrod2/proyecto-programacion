// Require
const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const remote = 'mongodb+srv://demon258:j28*Sojo@cluster0.haig3y0.mongodb.net/node-mongodb-apirest?retryWrites=true&w=majority'
const local = 'mongodb://localhost/animales';

// const cors = require('cors');
const GenerateConnection = require('./bin/db.js');
const path = require('path');

// Inicialization
const app = express();
require('./bin/db.js');
require('./bin/passport.js') // passport

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./bin/handlebars.js')
}));
app.set('view engine', '.hbs');


// Middeware
// app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'ModeDeb',
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl:local })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Globar Variable
app.use((req,res,next)=>{
  res.locals.user = req.user || null;
	res.locals.succ = req.flash('succ');
	res.locals.err = req.flash('err');
  res.locals.error = req.flash('error');
	next();
})



// Routes
app.use(require('./router/default.js'));
app.use(require('./router/user.js'));
app.use(require('./router/note.js'));
app.use(require('./router/category.js'));
app.use(require('./router/animales.js'));

// Static files
app.use(express.static(path.join(__dirname, 'static')));

// Listen
app.listen(app.get('port'), () => {
  console.log('Server on port ', app.get('port'));
});

module.exports = app;
