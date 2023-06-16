const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: String,
    user: {
        type: String,
        unique: true,
    },
    room: String,
},
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema)