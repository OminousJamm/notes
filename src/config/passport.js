const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {

    //Macth email in database
    const user = await User.findOne({ email });
    if (!user) {
        return done(null, false, { message: 'User not found' });
    } else {
        //Match password user
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'password mismatch' });
        }
    };
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {done(null,user)}).catch(err => {done(err,null)});
});