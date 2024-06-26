const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');
const _handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//Initializations.
const app = express();
require('./config/passport');

//Settings.
app.set('port', process.env.PORT || 4000);
app.set('views',path.join( __dirname,'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(_handlebars)
}));
app.set('view engine','.hbs')

//midlewares.
app.use(morgan(process.env.MORGAN_MODE));
app.use(express.urlencoded({extended:false}));  //Cada vez que llega una peticion la trata de convertir en un objeto de json.
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//Global variables.
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//routes.
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));

//Static files.
app.use(express.static(path.join( __dirname,'public')));


module.exports =  app;