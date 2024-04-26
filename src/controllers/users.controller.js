const usersCtrl = {};
const User = require('../models/User');
const passport = require('passport');

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

usersCtrl.signup = async (req, res) => {
    const errors = [];
    const { name, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
        errors.push({ text: 'passwords do not match' });
    };
    if (password.length < 4) {
        errors.push({ text: 'passwords must be at least 4 characters.' });
    };
    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, password });
    } else {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash('error_msg', 'email already exists');
            res.redirect('/users/signup');
        } else {
            const user = new User({ name, email, password });
            user.password = await user.encryptPassword(password);
            await user.save();
            req.flash('success_msg', 'You are registered');
            res.redirect('/users/signin');
        };
    };
};
usersCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin');
};

usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/notes',
    failureFlash: true
});

usersCtrl.logout = (req, res) => {
    req.logout(function(err) {
        if (err) {
            // Manejar el error si ocurriera
            console.log(err);
            return res.status(500).send('Error logging out');
        }
        req.flash('success_msg', 'You are logged out');
        res.redirect('/users/signin');
    });
};

module.exports = usersCtrl;