const mongoose = require('mongoose');
const userScema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
});
const User = mongoose.model('User', userScema);
module.exports = User;