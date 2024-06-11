const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isAdmin: {type: Boolean, required: true, default:false},
    password: { type: String, required: true },
    numOfGames: { type: Number, default:0},
    maxScore: { type: Number, default:0 }
});

module.exports = mongoose.model('User', userSchema);
