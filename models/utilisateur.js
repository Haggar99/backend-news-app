const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
    },
    createdAt: {
        type: Schema.Types.Date,
        default: new Date,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);