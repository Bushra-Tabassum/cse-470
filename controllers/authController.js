const User = require('./../models/userModel');
const catchAsync = require("./../utils/catchAsync");

exports.signup = catchAsync(async (req, res, next) => {
    await User.create({...req.body});
    res.redirect('/login');
});

exports.logIn = catchAsync(async (req, res, next) => {
    const user = await User.findOne({...req.body});
    if (user) {
        req.session.regenerate(function () {
            req.session.user = user._id;
            res.redirect('/');
        });
    } else {
        res.redirect('/login');
    }
});